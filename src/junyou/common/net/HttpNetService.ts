module junyou {
	/**
	 * 使用http进行通信的网络服务
	 * @author 3tion
	 *
	 */
    export class HttpNetService extends NetService {

    	/**
    	 * 请求地址
    	 */
        private _actionUrl: string;

    	/**
    	 * 登录获取票据地址
    	 */
        private _loginUrl: string;

    	/**
    	 * 下次自动拉取请求的时间戳
    	 */
        private _nextAutoTime: number = 0;

    	/**
    	 * 下次自动请求的最短
    	 */
        private _autoTimeDelay: number;

        private _loader: XMLHttpRequest;

        private _state: RequestState = RequestState.UNREQUEST;

        /**
         * 未发送的请求
         */
        private _unsendRequest: NetSendData[];

        /**
         * 最后一条消息编号
         */
        private _lastMid: number = 0;

        /**
         * 正在发送的数据
         */
        private _sendingList: NetSendData[];

        /**
         * 请求发送成功的次数
         */
        private _success: number = 0;

        /**
         * 请求连续发送失败的次数
         */
        private _cerror: number = 0;

        /**
         * 请求失败次数
         */
        private _error: number = 0;

        /**
         * 登录状态
         */
        private _loginState: RequestState = RequestState.UNREQUEST;

        /**
         * 登录失败次数
         */
        private _loginErrorCount: number = 0;

        public constructor() {
            super();
            //覆盖instance
            NetService._instance = this;
            this._unsendRequest = [];
            this._sendingList = [];
            this._loader = this.getXHR();
        }


        /**
         * 重置
         * @param actionUrl             请求地址
         * @param loginUrl              登录获取票据地址
         * @param autoTimeDelay         自动发送的最短延迟时间
         */
        public reset(actionUrl: string, loginUrl: string, autoTimeDelay: number = 5000) {
            this._actionUrl = actionUrl;
            if (loginUrl.charAt(loginUrl.length - 1) != "?") {
                loginUrl += "?";
            }
            this._loginUrl = loginUrl;
            if (autoTimeDelay != this._autoTimeDelay) {
                this._autoTimeDelay = autoTimeDelay;
            }
            // 200毫秒检查一次，是否可以自动拉数据了
            TimerUtil.addCallback(200, this.checkSend, this);
            var loader = this._loader;
            loader.onreadystatechange = this.onReadyStateChange.bind(this);
            loader.ontimeout = this.errorHandler.bind(this);
        }

        private checkSend(self: HttpNetService) {
            self.checkUnsend();
        }

        /**
        * @private
        */
        private onReadyStateChange(): void {
            var xhr = this._loader;
            if (xhr.readyState == 4) {// 4 = "loaded"
                var ioError = (xhr.status >= 400 || xhr.status == 0);
                var url = this._actionUrl;
                var self = this;
                setTimeout(function (): void {
                    if (ioError) {//请求错误
                        self.errorHandler();
                    }
                    else {
                        self.complete();
                    }
                }, 0)
            }
        }

        /**
         * 发生错误
         */
        private errorHandler() {
            if (this._loginState == RequestState.REQUESTING) {
                if (this._loginErrorCount < 3) {//做3次重新登录尝试
                    this.login();
                } else {
                    dispatch(NetEvent.LOGIN_FAILED);
                }
                this._loginErrorCount++;
                return;
            }

            this._error++;
            this._cerror++;
            this._state = RequestState.FAILED;

            if (this._cerror > 10) {
                //连续失败10次以上，不在重试，提示连接服务器失败，请检查连接
                this.disconnect();
                return;
            }
            //曾经成功过
            //数据未发送成功
            var sending = this._sendingList;
            var idx = sending.length;
            var unrequest = this._unsendRequest;
            for (let pdata of unrequest) {
                sending[idx++] = pdata;
            }
            //交互未发送的请求和发送中的请求列表
            unrequest.length = 0;
            this._unsendRequest = sending;
            this._sendingList = unrequest;
            //尝试重新发送请求
            this.checkUnsend();
        }

        private complete() {
            //如果当前正在登录
            if (this._loginState == RequestState.REQUESTING) {
                let result = JSON.parse(this._loader.responseText);
                let code = result.code;
                if (code == 1) {
                    // TODO 进入登录页面
                } else if (code == 2) {
                    // TODO 提示服务器忙
                } else if (code == 0) {
                    let adata = this._authData;
                    adata.sessionID = result.sid;
                    adata.sign = result.sign;
                    adata.roles = result.roles;
                    this._loginState = RequestState.COMPLETE;
                    this._loginErrorCount = 0;
                    dispatch(NetEvent.LOGIN_COMPLETE);
                }
                return;
            }
            //处理Response
            //回来的数据结构为
            //mid(最后一条广播消息的消息码),[IMessage,IMessage,IMessage,IMessage]
            //暂时先使用明文JSON处理，后续考虑使用ProtoBuf处理
            var readBuffer = this._readBuffer;
            readBuffer.dataView = new DataView(<ArrayBuffer>this._loader.response);
            readBuffer.position = 0;
            var auth = readBuffer.readByte();
            if (auth == AuthState.AUTH_FAILED) {//认证失败，重新登录
                this._loginState = RequestState.FAILED;
                this.login();
                return;
            }
            //成功一次清零连续失败次数
            this._cerror = 0;
            this._success++;
            this._state = RequestState.COMPLETE;
            //清理正在发送的数据
            //调试时,显示发送的数据
            if (DEBUG) {//发送成功，才做输出
                var now = Global.now;
                if (this._isLogSend) {
                    for (let pdata of this._sendingList) {
                        Log("send:\t" + now + "\t" + pdata.cmd + "\t" + JSON.stringify(pdata.data));
                    }
                }
            }
            let sendPool = this._sendDataPool;
            for (let pdata of this._sendingList) {
                sendPool.recycle(pdata);
            }
            //数据发送成功
            this._sendingList.length = 0;

            //读取消息编号
            this._lastMid = readBuffer.readDouble();
            this.decodeBytes(readBuffer);
            this.checkUnsend();
        }

        public login() {
            if (this._loginState < RequestState.REQUESTING) {//登录失败或者未登录
                this._loginState = RequestState.REQUESTING;
                if (this._authData) {
                    var loader = this._loader;
                    loader.open("GET", this._loginUrl + this._authData.toURLString(), true);
                    loader.responseType = "";
                    loader.send();
                } else {
                    ThrowError("没有登录数据");
                }
            }
        }

        /**
         * 检查在发送过程中的请求
         */
        private checkUnsend() {
            //有在发送过程中，主动发送的数据
            if (this._unsendRequest.length || Global.now > this._nextAutoTime) {
                this.trySend();
            }
        }

        private getXHR(): XMLHttpRequest {
            if (window["XMLHttpRequest"]) {
                return new window["XMLHttpRequest"]();
            } else {
                return new ActiveXObject("MSXML2.XMLHTTP");
            }
        }

        protected _send(cmd: number, data: any, msgType: string) {
            //没有同协议的指令，新增数据
            var pdata = this._sendDataPool.getInstance();
            pdata.cmd = cmd;
            pdata.data = data;
            pdata.msgType = msgType;
            this._unsendRequest.push(pdata);
            this.trySend();
        }

        /**
         * 尝试发送
         */
        private trySend() {
            if (this._loginState != RequestState.COMPLETE || this._state == RequestState.REQUESTING) {
                return;
            }
            this._state = RequestState.REQUESTING;
            var loader = this._loader;
            loader.open("POST", this._actionUrl, true);
            loader.responseType = "arraybuffer";
            loader.setRequestHeader("s", this._authData.sessionID);
            loader.setRequestHeader("m", "" + this._lastMid);
            //loader.setRequestHeader("Content-Type","application/octet-stream");
            //发送的结构，mid(最后一条广播消息的消息码),[IMessage,IMessage,IMessage...]
            //将被动发送的指令并入到未发送的指令
            var sendBuffer = this._sendBuffer;
            sendBuffer.clear();
            var sendPool = this._sendDataPool;
            var unsend = this._unsendRequest;
            var sending = this._sendingList;
            // sendBuffer.writeUTFBytes(this._authData.sessionID);
            // sendBuffer.writeDouble(this._lastMid);
            for (var i = 0, len = unsend.length; i < len; i++) {
                let pdata = unsend[i];
                this.writeToBuffer(sendBuffer, pdata);
                sending[i] = pdata;
            }
            var pcmdList = this._pcmdList;
            for (let pdata of pcmdList) {
                this.writeToBuffer(sendBuffer, pdata);
                sending[i++] = pdata;
            }
            //清空被动数据
            pcmdList.length = 0;
            //清空未发送的数据
            unsend.length = 0;
            loader.send(sendBuffer.buffer);
            //重置自动发送的时间
            this._nextAutoTime = Global.now + this._autoTimeDelay;
        }

    }
}