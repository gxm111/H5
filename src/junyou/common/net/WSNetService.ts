module junyou {
    /**
     * WebSocket版本的NetService
     * @author 3tion
     */
    export class WSNetService extends NetService {

        private _ws: WebSocket;
        private _actionUrl: string;
        /**
         * 
         * 接收到的数据缓存
         * @private
         * @type {Uint8Array}
         */
        private _recievedBuffer: Uint8Array;

        /**
         * 
         * 数据缓存的读取索引
         * @private
         * @type {number}
         */
        private _readPosition: number = 0;

        constructor() {
            super();
            //覆盖instance
            NetService._instance = this;
        }

        /**
         * 
         * 设置websocket地址
         * @param {string} actionUrl
         */
        public setUrl(actionUrl: string) {
            if (this._actionUrl != actionUrl) {
                this._actionUrl = actionUrl;
                let ws = this._ws;
                if (ws && ws.readyState <= WebSocket.OPEN) { //已经有连接，重置连接
                    this.connect();
                }
            }
        }

        /**
         * 打开新的连接
         */
        public connect() {
            let ws = this._ws;
            if (ws) {
                ws.removeEventListener("close", this.onClose);
                ws.removeEventListener("error", this.onError);
                ws.removeEventListener("message", this.onData);
            }
            this._ws = ws = new WebSocket(this._actionUrl);
            ws.binaryType = "arraybuffer";
            ws.addEventListener("close", this.onClose);
            ws.addEventListener("error", this.onError);
            ws.addEventListener("message", this.onData);
        }

        /**
         * 
         * 发生错误
         * @private
         */
        private onError = (ev: ErrorEvent) => {

        }

        /**
         * 
         * 断开连接
         * @private
         */
        private onClose = (ev: CloseEvent) => {

        }

        /**
         * 
         * 收到消息
         * @private
         */
        private onData = (ev: MessageEvent) => {
            let ab = new Uint8Array(<ArrayBuffer>ev.data);
            let rb = this._recievedBuffer;
            let rbLen = rb.length;
            let abLen = ab.length;
            let newRecieved = new Uint8Array(rbLen + abLen);
            let i = 0, m: number;
            for (m = 0; m < rbLen; m++) {
                newRecieved[i++] = rb[m];
            }
            for (m = 0; m < abLen; m++) {
                newRecieved[i++] = ab[m];
            }
            let readBuffer = this._readBuffer;
            readBuffer.buffer = newRecieved.buffer;
            readBuffer.position = 0;
            this.decodeBytes(readBuffer);
            this._recievedBuffer = new Uint8Array(readBuffer.buffer.slice(readBuffer.position));
        }

        protected _send(cmd: number, data: any, msgType: string) {
            //没有同协议的指令，新增数据
            var pdata = this._sendDataPool.getInstance();
            pdata.cmd = cmd;
            pdata.data = data;
            pdata.msgType = msgType;
            var sendBuffer = this._sendBuffer;
            sendBuffer.clear();
            let sendPool = this._sendDataPool;
            this.writeToBuffer(sendBuffer, pdata);
            sendPool.recycle(pdata);
            var pcmdList = this._pcmdList;
            for (let pdata of pcmdList) {
                this.writeToBuffer(sendBuffer, pdata);
                sendPool.recycle(pdata);
            }
            //清空被动数据
            pcmdList.length = 0;
            this._ws.send(sendBuffer.buffer);
        }
    }
}