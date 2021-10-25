#!/bin/bash


docker-compose down -v
docker volume rm $(docker volume ls -f name=weko -q)
docker-compose build --no-cache
docker-compose up -d
docker-compose exec web ./scripts/populate-instance.sh
docker cp scripts/demo/item_type2.sql $(docker-compose ps -q postgresql):/tmp/item_type.sql
docker-compose exec postgresql psql -U invenio -d invenio -f /tmp/item_type.sql
docker-compose exec web invenio workflow init action_status,Action
docker cp scripts/demo/resticted_access.sql $(docker-compose ps -q postgresql):/tmp/resticted_access.sql
docker-compose exec postgresql psql -U invenio -d invenio -f /tmp/resticted_access.sql

