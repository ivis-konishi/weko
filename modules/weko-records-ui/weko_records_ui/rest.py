# -*- coding: utf-8 -*-
#
# This file is part of WEKO3.
# Copyright (C) 2017 National Institute of Informatics.
#
# WEKO3 is free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# WEKO3 is distributed in the hope that it will be
# useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with WEKO3; if not, write to the
# Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
# MA 02111-1307, USA.

"""Blueprint for schema rest."""

from flask import Flask, Blueprint, current_app, jsonify, make_response, request, abort, url_for
from flask_babelex import get_locale
from flask_babelex import gettext as _
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_login import current_user
from urllib import parse
from invenio_db import db
from invenio_deposit.scopes import actions_scope
from invenio_oauth2server import require_api_auth, require_oauth_scopes
from invenio_pidstore.errors import PIDInvalidAction, PIDDoesNotExistError
from invenio_pidstore.models import PersistentIdentifier
from invenio_records_rest.links import default_links_factory
from invenio_records_rest.utils import obj_or_import_string
from invenio_records_rest.views import \
    create_error_handlers as records_rest_error_handlers
from invenio_rest import ContentNegotiatedMethodView
from invenio_rest.views import create_api_errorhandler
from sqlalchemy.exc import SQLAlchemyError
from weko_deposit.api import WekoRecord
from weko_records.api import ItemTypes
from weko_records.serializers import citeproc_v1
from weko_workflow.api import WorkActivity, WorkFlow
from weko_workflow.models import GuestActivity
from weko_workflow.schema.marshmallow import ActivitySchema
from weko_workflow.utils import check_etag, check_pretty, init_activity_for_guest_user, is_terms_of_use_only
from werkzeug.http import generate_etag

from .errors import ContentsNotFoundError, InvalidEmailError, InvalidTokenError, InvalidWorkflowError, VersionNotFoundRESTError
from .views import escape_str, get_usage_workflow


def create_error_handlers(blueprint):
    """Create error handlers on blueprint."""
    blueprint.errorhandler(PIDInvalidAction)(create_api_errorhandler(
        status=403, message='Invalid action'
    ))
    records_rest_error_handlers(blueprint)


def create_blueprint(endpoints):
    """
    Create Weko-Records-ui-REST blueprint.
    See: :data:`weko_records_ui.config.WEKO_RECORDS_UI_REST_ENDPOINTS`.

    :param endpoints: List of endpoints configuration.
    :returns: The configured blueprint.
    """
    blueprint = Blueprint(
        'weko_records_ui_rest',
        __name__,
        url_prefix='',
    )

    @blueprint.teardown_request
    def dbsession_clean(exception):
        current_app.logger.debug("weko_records_ui dbsession_clean: {}".format(exception))
        if exception is None:
            try:
                db.session.commit()
            except:
                db.session.rollback()
        db.session.remove()

    for endpoint, options in (endpoints or {}).items():
        if endpoint == 'need_restricted_access':
            view_func = NeedRestrictedAccess.as_view(
                NeedRestrictedAccess.view_name.format(endpoint),
                default_media_type=options.get('default_media_type'),
            )
            blueprint.add_url_rule(
                options.get('route'),
                view_func=view_func,
                methods=['GET'],
            )
        if endpoint == 'get_file_terms':
            view_func = GetFileTerms.as_view(
                GetFileTerms.view_name.format(endpoint),
                default_media_type=options.get('default_media_type'),
            )
            blueprint.add_url_rule(
                options.get('route'),
                view_func=view_func,
                methods=['GET'],
            )
        if endpoint == 'file_application':
            view_func = FileApplication.as_view(
                FileApplication.view_name.format(endpoint),
                default_media_type=options.get('default_media_type'),
            )
            blueprint.add_url_rule(
                options.get('route'),
                view_func=view_func,
                methods=['POST'],
            )

    return blueprint


def create_blueprint_cites(endpoints):
    """Create Weko-Records-UI-Cites-REST blueprint.

    See: :data:`invenio_deposit.config.DEPOSIT_REST_ENDPOINTS`.

    :param endpoints: List of endpoints configuration.
    :returns: The configured blueprint.
    """
    blueprint = Blueprint(
        'weko_records_ui_cites_rest',
        __name__,
        url_prefix='',
    )

    @blueprint.teardown_request
    def dbsession_clean(exception):
        current_app.logger.debug("weko_records_ui dbsession_clean: {}".format(exception))
        if exception is None:
            try:
                db.session.commit()
            except:
                db.session.rollback()
        db.session.remove()

    create_error_handlers(blueprint)

    for endpoint, options in (endpoints or {}).items():

        if 'record_serializers' in options:
            serializers = options.get('record_serializers')
            serializers = {mime: obj_or_import_string(func)
                           for mime, func in serializers.items()}
        else:
            serializers = {}

        record_class = obj_or_import_string(options['record_class'])

        ctx = dict(
            read_permission_factory=obj_or_import_string(
                options.get('read_permission_factory_imp')
            ),
            record_class=record_class,
            links_factory=obj_or_import_string(
                options.get('links_factory_imp'),
                default=default_links_factory
            ),
            # pid_type=options.get('pid_type'),
            # pid_minter=options.get('pid_minter'),
            # pid_fetcher=options.get('pid_fetcher'),
            loaders={
                options.get('default_media_type'): lambda: request.get_json()},
            default_media_type=options.get('default_media_type'),
        )

        cites = WekoRecordsCitesResource.as_view(
            WekoRecordsCitesResource.view_name.format(endpoint),
            serializers=serializers,
            # pid_type=options['pid_type'],
            ctx=ctx,
            default_media_type=options.get('default_media_type'),
        )
        blueprint.add_url_rule(
            options.get('cites_route'),
            view_func=cites,
            methods=['GET'],
        )

    return blueprint


class NeedRestrictedAccess(ContentNegotiatedMethodView):
    view_name = 'records_ui_{0}'

    def __init__(self, *args, **kwargs):
        """Constructor."""
        super(NeedRestrictedAccess, self).__init__(*args, **kwargs)

    @require_api_auth(True)
    @require_oauth_scopes(actions_scope.id)
    def get(self, **kwargs):
        """
        Check if need restricted access.

        Returns:
            Result for each file.
        """
        from .config import WEKO_NEED_RESTRICTED_ACCESS_API_VERSION
        version = kwargs.get('version')
        func = WEKO_NEED_RESTRICTED_ACCESS_API_VERSION.get(f'get-{version}')

        if func:
            return func(self, **kwargs)
        else:
            raise VersionNotFoundRESTError()

    def get_v1(self, **kwargs):
        # Get record
        pid_value = kwargs.get('pid_value')
        try:
            pid = PersistentIdentifier.get('depid', pid_value)
        except PIDDoesNotExistError:
            abort(404)
        record = WekoRecord.get_record(pid.object_uuid)
        if not record:
            abort(404)

        # Get files
        from .utils import get_file_info_list
        _, files = get_file_info_list(record)

        res_json = []
        for file in files:
            # Check if file is restricted access.
            from .permissions import check_file_download_permission, check_content_clickable
            access_permission = check_file_download_permission(record, file)
            applicable = check_content_clickable(record, file)
            need_restricted_access = not access_permission and applicable

            # Create response
            res_json.append({
                'need_restricted_access': need_restricted_access,
                'filename': file.get('filename')
            })

        response = make_response(jsonify(res_json), 200)
        return response

class GetFileTerms(ContentNegotiatedMethodView):
    view_name = 'records_ui_{0}'
    limiter = Limiter(app=Flask(__name__), key_func=get_remote_address, default_limits=["1 per minute"])

    def __init__(self, *args, **kwargs):
        """Constructor."""
        super(GetFileTerms, self).__init__(*args, **kwargs)

    @require_api_auth(True)
    @require_oauth_scopes(actions_scope.id)
    @limiter.limit("2 per minute")
    def get(self, **kwargs):
        """
        Get files tarms.

        Returns:
            tarms text and etag.
        """
        from .config import WEKO_GET_FILE_TERMS_API_VERSION
        version = kwargs.get('version')
        func = WEKO_GET_FILE_TERMS_API_VERSION.get(f'get-{version}')

        if func:
            return func(self, **kwargs)
        else:
            raise VersionNotFoundRESTError() # 404 Error

    def get_v1(self, **kwargs):
        # Get parameter
        param_pretty = str(request.values.get('pretty', 'false'))
        language = str(request.headers.get('Accept-Language', 'en'))
        
        # Check pretty
        check_pretty(param_pretty)

        # Setting language
        if language == 'en' or language == 'ja':
            get_locale().language = language

        # Get record
        pid_value = kwargs.get('pid_value')
        try:
            pid = PersistentIdentifier.get('depid', pid_value)
        except PIDDoesNotExistError:
            raise ContentsNotFoundError() # 404 Error
        record = WekoRecord.get_record(pid.object_uuid)
        if not record:
            raise ContentsNotFoundError() # 404 Error

        # Get files
        from .utils import get_file_info_list
        __, files = get_file_info_list(record)

        filename = ''
        terms_content = ''
        for file in files:
            if kwargs.get('file_name') == file.get('filename', ''):
                filename = file.get('filename', '')
                terms_content = file.get('terms_content', '')
                break
        if filename == '':
            raise ContentsNotFoundError() # 404 Error

        # Check ETag
        etag = _generate_terms_token(filename, terms_content)
        if check_etag(etag):
            return make_response('304 Not Modified', 304)

        # Create response
        res_json = {
            'text': terms_content,
            'Etag': etag
        }

        response = make_response(jsonify(res_json), 200)
        response.headers["Etag"] = etag
        return response

def _generate_terms_token(filename, terms_content):
    return generate_etag('{}_{}'.format(filename, terms_content).encode("utf-8"))

class FileApplication(ContentNegotiatedMethodView):
    view_name = 'records_ui_{0}'

    def __init__(self, *args, **kwargs):
        """Constructor."""
        super(FileApplication, self).__init__(*args, **kwargs)

    @require_api_auth(True)
    @require_oauth_scopes(actions_scope.id)
    def post(self, **kwargs):
        """
        Post file application.

        Returns:
            Result json.
        """
        from .config import WEKO_FILE_APPLICATION_API_VERSION
        version = kwargs.get('version')
        func = WEKO_FILE_APPLICATION_API_VERSION.get(f'post-{version}')

        if func:
            return func(self, **kwargs)
        else:
            raise VersionNotFoundRESTError() # 404 Error

    def post_v1(self, **kwargs):
        # Get parameter
        language = str(request.headers.get('Accept-Language', 'en'))
        param_pretty = str(request.values.get('pretty', 'false'))
        request_terms_token = request.values.get('terms_token', None)
        mail = request.values.get('mail', None)

        # In case guest user
        is_guest = False
        if not current_user.is_authenticated:
            try :
                from email_validator import validate_email
                validate_email(mail, check_deliverability=False)
                is_guest = True
            except Exception:
                # invalid email
                raise InvalidEmailError() # 400 Error

        # Check pretty
        check_pretty(param_pretty)

        # Setting language
        if language == 'en' or language == 'ja':
            get_locale().language = language

        # Get record
        pid_value = kwargs.get('pid_value')
        try:
            pid = PersistentIdentifier.get('depid', pid_value)
        except PIDDoesNotExistError:
            raise ContentsNotFoundError() # 404 Error
        record = WekoRecord.get_record(pid.object_uuid)
        if not record:
            raise ContentsNotFoundError() # 404 Error

        # Get files info
        from .utils import get_file_info_list
        __, files = get_file_info_list(record)

        # Get target file info
        filename = ''
        terms_content = ''
        workflow_id = None
        for file in files:
            if kwargs.get('file_name') == file.get('filename', ''):
                filename = file.get('filename', '')
                terms_content = file.get('terms_content', '')
                workflow_id = int(get_usage_workflow(file) or 0)
                break
        if filename == '':
            raise ContentsNotFoundError() # 404 Error

        # Get workflow
        if not workflow_id:
            # Available workflow not found
            raise InvalidWorkflowError() # 403 Error
        workflow =  WorkFlow().get_workflow_by_id(workflow_id)
        if not workflow:
            # Workflow not found
            raise ContentsNotFoundError() # 404 Error

        # Check terms
        if not terms_content:
            if request_terms_token != _generate_terms_token(filename, terms_content):
                raise InvalidTokenError()

        # Create workflow activity
        activity_id = ''
        activity_url = ''
        token = ''
        try:
            if is_guest:
                # Prepare activity data.
                data = {
                    'itemtype_id': workflow.itemtype_id,
                    'workflow_id': workflow_id,
                    'flow_id': workflow.flow_id,
                    'activity_confirm_term_of_use': True,
                    'extra_info': {
                        "guest_mail": mail,
                        "record_id": record.get('recid'),
                        "related_title": record.get('title'),
                        "file_name": filename,
                        "is_restricted_access": True,
                    }
                }
                activity, activity_url = init_activity_for_guest_user(data)
                if not activity:
                    guest_activity = GuestActivity.find(**data['extra_info'])
                    if guest_activity:
                        activity_id = guest_activity[0].activity_id
                if activity_url:
                    query_str = parse.urlparse(activity_url).query
                    query_dic = parse.parse_qs(query_str)
                    if query_dic and query_dic['token'] and len(query_dic['token']) > 0:
                        token = query_dic['token'][0]
            else:
                data = {
                    'itemtype_id': workflow.itemtype_id,
                    'workflow_id': workflow_id,
                    'flow_id': workflow.flow_id,
                    'activity_confirm_term_of_use': True,
                    'extra_info': {
                        "guest_mail": mail,
                        "record_id": record.get('recid'),
                        "related_title": record.get('title'),
                        "file_name": filename,
                        "is_restricted_access": True,
                    }
                }
                activity = WorkActivity()
                rtn = activity.init_activity(data)
                if rtn is None:
                    raise Exception()
                activity_id = rtn.activity_id
                activity_url = url_for('weko_workflow.display_activity', activity_id=activity_id, _external=True, _method='https')

            db.session.commit()
        except SQLAlchemyError as ex:
            current_app.logger.error("sqlalchemy error: {}".format(ex))
            db.session.rollback()
            raise
        except BaseException as ex:
            current_app.logger.error('Unexpected error: {}'.format(ex))
            db.session.rollback()
            raise

        # Get item_type schema
        item_type = ItemTypes.get_by_id(workflow.itemtype_id)
        
        # Create response
        res_json = {
            "activity_id": activity_id,
            "activity_url": activity_url,
            "item_type_schema": item_type.schema
        }
        if token:
            res_json['token'] = token

        response = make_response(jsonify(res_json), 200)
        return response


class WekoRecordsCitesResource(ContentNegotiatedMethodView):
    """Schema files resource."""

    view_name = '{0}_cites'

    def __init__(self, serializers, ctx, *args, **kwargs):
        """Constructor."""
        super(WekoRecordsCitesResource, self).__init__(
            serializers,
            *args,
            **kwargs
        )
        for key, value in ctx.items():
            setattr(self, key, value)

    # @pass_record
    # @need_record_permission('read_permission_factory')
    def get(self, pid_value, **kwargs):
        """Render citation for record according to style and language."""
        style = request.values.get('style', 1)  # style or 'science'
        locale = request.values.get('locale', 2)
        try:
            pid = PersistentIdentifier.get('depid', pid_value)
            record = WekoRecord.get_record(pid.object_uuid)
            result = citeproc_v1.serialize(pid, record, style=style,
                                           locale=locale)
            result = escape_str(result)
            return make_response(jsonify(result), 200)
        except Exception:
            current_app.logger.exception(
                'Citation formatting for record {0} failed.'.format(
                    str(record.id)))
            return make_response(jsonify("Not found"), 404)
