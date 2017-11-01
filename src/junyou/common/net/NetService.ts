module junyou {
    const NS_Null = 0;
    const NS_Boolean = 1;
    const NS_String = 2;
    const NS_Bytes = 4;
    const NS_Double = 5;
    const NS_Int32 = 6;
    const NS_Uint32 = 7;
    const BytesLengthForType = {};
    BytesLengthForType[NS_Null] = 0;
    BytesLengthForType[NS_Boolean] = 1;
    BytesLengthForType[NS_Double] = 8;
    BytesLengthForType[NS_Int32] = 4;
    BytesLengthForType[NS_Uint32] = 4;
	/**
	 * 通信服务
	 * 收发的协议结构：
	 * 2字节协议号 2字节包长度(n) n字节包
	 * @author 3tion
	 *
	 */
    export abstract class NetService {

        protected static _instance: NetService;

        public static getInstance(): NetService {
            return this._instance;
        }

        protected _router: NetRouter;
        protected _limiter: RequestLimit;

    	/**
    	 * 被动指令池
    	 */
        protected _sendDataPool: RecyclablePool<NetSendData>;

    	/**
    	 * 待发送的的被动指令列表
    	 */
        protected _pcmdList: NetSendData[];


        /**
         * 接收数据的临时数组
         */
        protected _tmpList: NetData[];
        /**
         * 接收数据的处理回收池
         */
        protected _netDataPool: RecyclablePool<NetData>;

    	/**
    	 * 读取的字节缓存
    	 */
        protected _readBuffer: ByteArray;

        /**
         * 发送的字节缓存
         */
        protected _sendBuffer: ByteArray;


        protected _tempBytes: ByteArray;

        /**
         * 接收消息的创建器
         * 
         */
        protected _recieveMSG: { [index: number]: string | number };

        /**
         * 是否对接收的数据打印日志
         */
        protected _isLogRecieve: boolean = false;

        /**
         * 是否对发送的数据打印日志
         */
        protected _isLogSend: boolean = false;

        /**
         * 认证信息
         */
        protected _authData: AuthData;

        constructor() {
            this._router = new NetRouter();
            this._limiter = new RequestLimit();
            this._sendDataPool = new RecyclablePool(NetSendData);
            this._netDataPool = new RecyclablePool(NetData);
            this._pcmdList = [];
            this._tmpList = [];
            this._readBuffer = new ByteArray();
            this._sendBuffer = new ByteArray();
            this._tempBytes = new ByteArray();
            this._recieveMSG = {};
        }

    	/**
    	 * 设置认证信息
    	 */
        public setAuthData(data: AuthData) {
            this._authData = data;
        }

        /**
         * 
         * 获取认证数据
         * @readonly
         */
        public get authData() {
            return this._authData;
        }

    	/**
    	 * 基础类型消息
    	 */
        public regRecieveMSGRef(cmd: number, ref: string | number) {
            this._recieveMSG[cmd] = ref;
        }

    	/**
    	 * 注册处理器
    	 * @param {number} cmd 协议号
    	 * @param {INetHandler} handler 处理网络数据的处理器
    	 * @param {number} priority 处理优先级
    	 */
        public register(cmd: number, handler: INetHandler, priotity: number = 0): boolean {
            return this._register(cmd, handler, priotity, false);
        }

    	/**
    	 * 注册单次执行的处理器
    	 * @param {number} cmd 协议号
    	 * @param {INetHandler} handler 处理网络数据的处理器
    	 * @param {number} priority 处理优先级
    	 */
        public regOnce(cmd: number, handler: INetHandler, priotity: number = 0): boolean {
            return this._register(cmd, handler, priotity, true);
        }

        /**
         * 移除协议号和处理器的监听
         * 
         * @param {number} cmd 协议号
         * @param {INetHandler} handler 处理网络数据的处理器
         */
        public remove(cmd: number, handler: INetHandler) {
            this._router.remove(cmd, handler);
        }

        protected _register(cmd: number, handler: INetHandler, priotity: number, once: boolean): boolean {
            if (cmd > 32767 || cmd < -32768) {
                ThrowError("协议号的范围必须是-32768~32767之间", 0, 1);
                return false;
            }
            this._router.register(cmd, handler, priotity, once);
            return true;
        }

    	/**
    	 * 即时发送指令<br/>
    	 * 用于处理角色主动操作的请求，如点击合成道具，使用物品等
    	 * @param {number} cmd 协议号
         * @param {any} [data] 数据，简单数据(number,boolean,string)复合数据
         * @param {string} [msgType] 如果是复合数据，必须有此值
    	 * @param {number} limit 客户端发送时间限制
    	 */
        public send(cmd: number, data?: any, msgType?: string | number, limit?: number) {
            if (this._limiter.check(cmd, limit)) {
                this._send(cmd, data, msgType);
            }
        }

        /**
         * 即时发送指令
         */
        protected abstract _send(cmd: number, data: any, msgType: string | number);

        /**
         * 断开连接
         */
        public disconnect() {
            // TODO
        }

        /**
         * 消极发送指令<br/>
         * 如果使用通协议的指令，有堆积的指令，先合并，新的替换旧的<br/>
         * <font color='#FF0000'>请勿将一些用户操作使用此指令发送</font>
         * 处理一些实时性要求不高的指令，这些指令先缓存堆积，等到用户主动发指令的时候，一起发送<br/>
         * @param {number} cmd 协议号
         * @param {any} [data] 数据，简单数据(number,boolean,string)复合数据
         * @param {string} [msgType] 如果是复合数据，必须有此值
         */
        public sendPassive(cmd: number, data?: any, msgType?: string | number) {
            //合并同协议的指令
            var pcmdList = this._pcmdList;
            var len = pcmdList.length;
            for (let temp of pcmdList) {
                if (temp.cmd == cmd) {
                    temp.data = data;
                    return;
                }
            }
            //没有同协议的指令，新增数据
            var pdata = this._sendDataPool.getInstance();
            pdata.cmd = cmd;
            pdata.data = data;
            pdata.msgType = msgType;
            //将数据缓存在pcmdList中，等到下次send的时候发送
            this._pcmdList[len] = pdata;
        }

        /**
         * 向缓冲数组中写入数据
         */
        protected writeToBuffer(bytes: ByteArray, data: NetSendData) {
            let cmd = data.cmd;
            let dat = data.data;
            let type = data.msgType;
            bytes.writeShort(cmd);
            if (dat == undefined) {
                bytes.writeUnsignedShort(0);
            }
            else {
                if (type in BytesLengthForType) {
                    bytes.writeUnsignedShort(BytesLengthForType[type]);
                }
                switch (type) {
                    case NS_Null:
                        break;
                    case NS_Boolean:
                        bytes.writeBoolean(dat);
                        break;
                    case NS_Double:
                        bytes.writeDouble(dat);
                        break;
                    case NS_Int32:
                        bytes.writeInt(dat);
                        break;
                    case NS_Uint32:
                        bytes.writeUnsignedInt(dat);
                        break;
                    case NS_String:
                        bytes.writeUTF(dat);
                        break;
                    case NS_Bytes:
                        let b = <ByteArray>dat;
                        bytes.writeUnsignedShort(b.length)
                        bytes.writeBytes(b);
                        break;
                    default:
                        var tempBytes = this._tempBytes;
                        tempBytes.clear();
                        PBMessageUtils.writeTo(dat, <string>data.msgType, tempBytes);
                        bytes.writeUnsignedShort(tempBytes.length);
                        bytes.writeBytes(tempBytes);
                        break;
                }
            }
        }

        /**
         * @private 
         * @param bytes
         * @param out
         */
        protected decodeBytes(bytes: ByteArray) {
            let recieveMSG = this._recieveMSG;
            let recievePool = this._netDataPool;
            let tmpList = this._tmpList;
            let idx = 0;
            while (true) {
                if (bytes.bytesAvailable < 4) {
                    break;
                }
                //先读取2字节协议号
                let cmd = bytes.readShort();
                //增加2字节的数据长度读取(这2字节是用于增加容错的，方便即便没有读到type，也能跳过指定长度的数据，让下一个指令能正常处理)
                let len = bytes.readUnsignedShort();
                if (bytes.bytesAvailable < len) {
                    // 回滚
                    bytes.position -= 4;
                    break;
                }
                //尝试读取结束后，应该在的索引
                let endPos = bytes.position + len;
                let type = recieveMSG[cmd];
                if (type !== undefined) {
                    let flag = true;
                    let data = undefined;
                    if (len == 0) {
                        data = null;
                    } else {
                        if (type in BytesLengthForType) {
                            let blen = BytesLengthForType[type];
                            if (blen != len) {
                                ThrowError(`解析指令时，类型[${type}]的指令长度[${len}]和预设的长度[${blen}]不匹配`);
                            }
                            if (len < blen) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            if (type == NS_Null) {
                                data = undefined;
                            }
                            else if (type == NS_Boolean) {
                                data = bytes.readBoolean();
                            } else if (type == NS_Double) {
                                data = bytes.readDouble();
                            } else if (type == NS_Int32) {
                                data = bytes.readInt();
                            } else if (type == NS_Uint32) {
                                data = bytes.readUnsignedInt();
                            } else {
                                if (type == NS_String) {
                                    data = bytes.readUTFBytes(len);
                                } else if (type == NS_Bytes) {
                                    bytes.readByteArray(len);
                                } else {
                                    let sp = bytes.position;
                                    data = PBMessageUtils.readFrom(<string>type, bytes, len);
                                    //防止ProtoBuf结构和字典中定义的结构不匹配时，还能处理后续的数据
                                    bytes.position = sp + len;
                                }
                            }
                        }
                    }
                    if (flag) {
                        //容错用，不管数据解析成功或者失败，将索引移至结束索引
                        let nData = recievePool.getInstance();
                        nData.cmd = cmd;
                        nData.data = data;
                        tmpList[idx++] = nData;
                    }
                } else {
                    ThrowError(`通信消息解析时cmd[${cmd}]，出现未注册的类型`);
                }
                bytes.position = endPos;
            }

            //调试时,显示接收的数据
            if (DEBUG) {
                var now = Global.now;
                if (this._isLogRecieve) {
                    for (let nData of tmpList) {
                        Log("recieve:\t" + now + "\t" + nData.cmd + "\t" + JSON.stringify(nData.data));
                    }
                }
            }

            var router = this._router;
            //分发数据
            for (let nData of tmpList) {
                router.dispatch(nData);
                //回收nData
                recievePool.recycle(nData);
            }
            tmpList.length = 0;
        }

        /**
         * 
         * 模拟服务端
         * @param {number} cmd
         * @param {*} [data]
         */
        public route(cmd: number, data?: any) {
            let nData = this._netDataPool.getInstance();
            nData.cmd = cmd;
            nData.data = data;
            this._router.dispatch(nData);
            this._netDataPool.recycle(nData);
        }
    }

}
