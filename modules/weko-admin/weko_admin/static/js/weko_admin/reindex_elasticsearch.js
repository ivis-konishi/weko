//poファイル定義の文言をhiddenから取得
const reindex_item_index = document.getElementById("reindex_item_index").value;
const reindex_item = document.getElementById("reindex_item").value;
const execute = document.getElementById("execute").value;
const waiting = document.getElementById("waiting").value;
const haserror = document.getElementById("haserror").value;
const executing = document.getElementById("executing").value;
const run_label = document.getElementById("run").value;
const cancel_label = document.getElementById("cancel").value;

const validationMsg1 = document.getElementById("validationMsg1").value;
const confirmMessage = document.getElementById("confirmMessage").value;
const completed = document.getElementById("completed").value;

/** close ErrorMessage area */
function closeError() {
    $('#errors').empty();
}

/** show ErrorMessage */
function showErrorMsg(msg , success=false) {
    $('#errors').append(
        '<div class="alert ' + (success? "alert-success":"alert-danger") + ' alert-dismissable">' +
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">' +
        '&times;</button>' + msg + '</div>');
}
let timerId = "";
class MainLayout extends React.Component {
    constructor() {
        super();
        const err = JSON.parse(document.getElementById("isError").value.toLowerCase())
        const exe = JSON.parse(document.getElementById("isExecuting").value.toLowerCase())
        const disabled_Btn = JSON.parse(document.getElementById("disabled_Btn").value.toLowerCase())
        this.state = {
            isError: err
            ,isExecuting: exe
            ,disabled_Btn: disabled_Btn
            ,showModal:false
            ,riiChecked : false
            ,riChecked : false
        }
        this.handleClickExecute = this.handleClickExecute.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
        this.handleCheckReindexIsRunning = this.handleCheckReindexIsRunning.bind(this);

    }

    componentDidMount() {
        /** set errorMessage Area */
        const header = document.getElementsByClassName('content-header')[0];
        if (header) {
            const errorElement = document.createElement('div');
            errorElement.setAttribute('id', 'errors');
            header.insertBefore(errorElement, header.firstChild);
        }

        timerId = setInterval(this.handleCheckReindexIsRunning,5000);//5 seconds roop
    }

    componentWillUnmount(){
        clearInterval(timerId);
    }

    componentDidCatch(error, info){
        console.log(info.componentStack);
        showErrorMsg(JSON.stringify(error));
    }


    /** 画面実行ボタン押下 */
    handleClickExecute(event){
        const riiChecked = document.getElementById("reindex_item_index").checked;
        const riChecked  = document.getElementById("reindex_item").checked;
        //validation
        if(!(riiChecked || riChecked)){
            return showErrorMsg(validationMsg1);
        }

        this.setState({
            showModal: true
        });
    }

    /** チェックボックス変更 */
    handleCheckedChange(event){
        if (event.target.id === 'reindex_item_index'){
            this.setState({
                riiChecked: event.target.checked
            });
        }

        if (event.target.id === "reindex_item"){
            this.setState({
                riChecked: event.target.checked
            });
        }
    }

    /** Modal閉じる */
    handleClose() {
        this.setState({
            showModal: false
        });
    }

    /** モーダル実行ボタン押下 */
    handleExecute(){

        //Clear error message
        closeError();
        const riiChecked = document.getElementById("reindex_item_index").checked;
        const riChecked  = document.getElementById("reindex_item").checked;
        this.setState({
            disabled_Btn: true
            ,isExecuting: true
            ,showModal: false
        });
        return fetch(
            new URL('reindex' , window.location.href) + "?es_to_es="+ riiChecked + "&db_to_es=" + riChecked
            ,{method: 'POST'}
        )
        .then((res) => {return  res.ok ? Promise.resolve(res) : Promise.reject(res)})
        .then((res) => {
            console.log(res);
            showErrorMsg(completed , true);
        })
        .catch((e) => {
            console.log(e);
            showErrorMsg(JSON.stringify(e));
            this.setState({
                disabled_Btn: true
                ,isError: true
            });
        });

    }

    handleCheckReindexIsRunning(event){
        return fetch(
            new URL('is_reindex_running' , window.location.href)
        ).then((res) => {
            return res.text()
        }).then((txt) => {
            this.setState(JSON.parse(txt));
        });
    }

    render() {
        const html = (
            <div>
                <div class="panel">
                    <div class="panel-body">
                        <div>
                            <input type="checkbox" id="reindex_item_index" checked={this.state.riiChecked} onChange={this.handleCheckedChange} />
                            <label for="reindex_item_index">
                                {reindex_item_index}
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" id="reindex_item" checked={this.state.riChecked} onChange={this.handleCheckedChange}/>
                            <label for="reindex_item">
                                {reindex_item}
                            </label>
                        </div>
                        <div class="row">
                            <div class="form-actions">
                                <button type="submit" id="execute" name="execute" value="save_ranking_settings" class="btn btn-primary" 
                                onClick={this.handleClickExecute} disabled={this.state.disabled_Btn}>{execute}
                                </button>
                                <span>
                                    {this.state.isError? haserror :this.state.isExecuting? executing : waiting}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="export_component">
                    <ReactBootstrap.Modal show={this.state.showModal} onHide={this.handleClose} dialogClassName="w-725">
                        <ReactBootstrap.Modal.Header closeButton></ReactBootstrap.Modal.Header>
                        <ReactBootstrap.Modal.Body>
                            <div className="col-12">
                                <div className="row text-center">
                                    {confirmMessage}
                                </div>
                            </div>
                        </ReactBootstrap.Modal.Body>
                        <ReactBootstrap.Modal.Footer>
                            <div className="col-12">
                                <div className="row text-center">
                                    <button variant="primary" type="button" className="btn btn-default" onClick={this.handleExecute}>{run_label}</button>
                                    <button variant="secondary" type="button" className="btn btn-default cancel" onClick={this.handleClose}>{cancel_label}</button>
                                </div>
                            </div>
                        </ReactBootstrap.Modal.Footer>
                    </ReactBootstrap.Modal>
                </div>
            </div>
        );
        
        return html;
    }

}

$(function () {
    ReactDOM.render(
        <MainLayout />,
        document.getElementById('root')
    )
});
