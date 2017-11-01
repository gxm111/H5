module junyou {

    const LITTLE_ENDIAN = egret.Endian.LITTLE_ENDIAN;
    const TYPE_DOUBLE: number = 1;
    const TYPE_FLOAT: number = 2;
    const TYPE_INT64: number = 3;
    const TYPE_UINT64: number = 4;
    const TYPE_INT32: number = 5;
    const TYPE_FIXED64: number = 6;
    const TYPE_FIXED32: number = 7;
    const TYPE_BOOL: number = 8;
    const TYPE_STRING: number = 9;
    const TYPE_GROUP: number = 10;
    const TYPE_MESSAGE: number = 11;
    const TYPE_BYTES: number = 12;
    const TYPE_UINT32: number = 13;
    const TYPE_ENUM: number = 14;
    const TYPE_SFIXED32: number = 15;
    const TYPE_SFIXED64: number = 16;
    const TYPE_SINT32: number = 17;
    const TYPE_SINT64: number = 18;
    /**
    0 必有 属性名字
    1 必有 required optional repeated
    2 必有 数据类型
    3 可选 消息类型名称
    4 可选 默认值
    */
    declare type MessageStruct =
        [/**0 */string, /**1 */number,/**2 */number] |
        [/**属性名字 */string, /**选项 */number,/**数据类型 */number,/**如果是子消息，消息名称 */string] |
        [/**属性名字 */string, /**选项 */number,/**数据类型 */number,/**如果是子消息，消息名称 */string, /**默认值 */any]
	/**
	 *
	 * @author 3tion
	 * javascript 只会使用到 varint32->number string boolean
	 *
	 */
    export class PBMessageUtils {

        /**
     * 
     * 根据message名字得到的结构数据
     * @static
     * @type 
     */
        public static structByName: { /**消息名称*/[index: string]:
            {
                /**索引 */
                [index: number]:

                MessageStruct
            }
        } = {};

        /**
         * 
         * 根据message名字绑定的类名，用于读取消息时创建的对象
         * 如果没有注册，则直接使用{}创建对象
         * @static
         * @type {{ [index: string]: { new () } }}
         */
        public static ctorByName: { [index: string]: { new () } } = {};

        public static readFrom(msgType: string, bytes: ByteArray, len?: number): Object {
            let ctor = PBMessageUtils.ctorByName[msgType];
            let msg = ctor ? new ctor : {};
            if (len === undefined) len = -1;
            let afterLen = 0;
            if (len > -1) {
                afterLen = bytes.bytesAvailable - len;
            }
            let encode = PBMessageUtils.structByName[msgType];
            if (!encode) {
                ThrowError(`非法的通信类型[${msgType}]，堆栈信息:${new Error()}`);
                return;
            }
            //检查处理默认值
            for (let idx in encode) {
                let body = encode[idx];
                //0 key
                //1 required optional repeated
                //2 数据类型
                //3 Message
                //4 默认值
                if (4 in body) {//有默认值
                    let key = body[0];
                    //消息中没有对应key的数据，先赋值成默认值，等待后续处理
                    if (!(key in msg)) {
                        msg[key] = body[4];
                    }
                }
            }
            while (bytes.bytesAvailable > afterLen) {
                let tag = bytes.readVarint();
                if (tag == 0)
                    continue;
                let idx = tag >>> 3;
                let body = encode[idx];
                if (!body) {
                    ThrowError(`读取消息类型为：${msgType}，索引${idx}时数据出现错误，找不到对应的数据结构配置`);
                    return;
                }
                let name = body[0];
                let label = body[1];
                let type = body[2];
                let subMsgType = body[3];
                let value: Object;
                if (label != 3 || (tag & 0b111) != 7) {//自定义  tag & 0b111 == 7 为 数组中 undefined的情况
                    switch (type) {
                        case TYPE_DOUBLE:
                            value = bytes.readDouble();
                            break;
                        case TYPE_FLOAT:
                            value = bytes.readFloat();
                            break;
                        case TYPE_INT64:
                        case TYPE_UINT64:
                        case TYPE_SINT64:
                            value = bytes.readVarint64();//理论上项目不使用
                            break;
                        case TYPE_INT32:
                        case TYPE_SINT32:
                            value = PBMessageUtils.decodeZigzag32(bytes.readVarint());
                            break;
                        case TYPE_UINT32:
                        case TYPE_ENUM:
                            value = bytes.readVarint();
                            break;
                        case TYPE_FIXED64:
                        case TYPE_SFIXED64:
                            value = PBMessageUtils.readFix64(bytes);//理论上项目不使用
                            break;
                        case TYPE_FIXED32:
                            value = bytes.readUnsignedInt();
                            break;
                        case TYPE_BOOL:
                            value = PBMessageUtils.readBoolean(bytes);
                            break;
                        case TYPE_STRING:
                            value = PBMessageUtils.readString(bytes);
                            break;
                        case TYPE_GROUP://(protobuf 已弃用)
                            value = undefined;
                            ThrowError(`读取消息类型为：${msgType}，索引${idx}时数据出现已弃用的GROUP分组类型(${TYPE_GROUP})`);
                            break;
                        case TYPE_MESSAGE://消息
                            value = PBMessageUtils.readMessage(bytes, subMsgType);
                            break;
                        case TYPE_BYTES:
                            value = PBMessageUtils.readBytes(bytes);
                            break;
                        case TYPE_SFIXED32:
                            value = bytes.readInt();
                            break;
                        default:
                            value = PBMessageUtils.readValue(tag, bytes);
                    }
                }
                if (label == 3) {//repeated
                    let arr = msg[name];
                    if (!arr) msg[name] = arr = [];
                    arr.push(value);
                }
                else {
                    msg[name] = value;
                }
            }
            return msg;
        }

        private static readValue(tag: number, bytes: ByteArray): any {
            let wireType: number = tag & 7;
            let value: any;
            switch (wireType) {
                case 0: //Varint	int32, int64, uint32, uint64, sint32, sint64, bool, enum
                    value = bytes.readVarint();
                    break;
                case 2: //Length-delimi	string, bytes, embedded messages, packed repeated fields
                    value = PBMessageUtils.readString(bytes);
                    break;
                case 5: //32-bit	fixed32, sfixed32, float
                    value = bytes.readInt();
                    break;
                case 1: //64-bit	fixed64, sfixed64, double
                    value = bytes.readDouble();
                    break;
                //case 3://Start group	Groups (deprecated)
                //break;
                //case 4://End group	Groups (deprecated)
                //break;
                default:
                    ThrowError("protobuf的wireType未知");
            }
            return value;
        }


        private static readFix64(bytes: ByteArray): Object {
            let v: Int64 = new Int64;
            v.low = bytes.readUnsignedInt();
            v.high = bytes.readUnsignedInt();
            return v;
        }


        private static readBoolean(bytes: ByteArray): Object {
            return bytes.readVarint() > 0;
        }

        private static readString(bytes: ByteArray): Object {
            let blen: number = bytes.readVarint();
            if (blen > 0) {
                return bytes.readUTFBytes(blen);
            }
            return "";
        }


        /**
         * 
         * 读取消息
         * @private
         * @static
         * @param {number} tag          标签
         * @param {ByteArray} bytes     被处理的字节数组
         * @param {string} subMsgType   类型标识
         * @returns {Object}
         */
        private static readMessage(bytes: ByteArray, msgType: string): Object {
            let blen: number = bytes.readVarint();
            return PBMessageUtils.readFrom(msgType, bytes, blen);
        }

        private static readBytes(bytes: ByteArray): Object {
            let blen: number = bytes.readVarint();
            return bytes.readByteArray(blen);
        }

        public static writeTo(msg: Object, msgType: string, bytes?: ByteArray): ByteArray {
            if (msg == undefined) {
                return;
            }
            let messageEncode = PBMessageUtils.structByName[msgType];// msg.mMessageEncode;
            if (!messageEncode) {
                ThrowError(`非法的通信类型[${msgType}]，堆栈信息:${new Error()}`);
                return;
            }
            if (!bytes) {
                bytes = new ByteArray;
            }
            // bytes.endian = LITTLE_ENDIAN;
            for (let numberStr in messageEncode) {
                let num = +numberStr;
                let body = messageEncode[num];
                let label = body[1];
                let name = body[0];
                if (label == 1 && !(name in msg)) {
                    continue;
                }
                let value: Object = msg[name];
                if (value == undefined || value === body[4]/* 默认值 */) {
                    continue;
                }
                let type = body[2];
                let subMsgType = body[3];
                let wireType = PBMessageUtils.type2WireType(type);
                let tag = (num << 3) | wireType;
                if (label == 3) {
                    for (let key in value) {
                        let element = value[key];
                        // 针对repeated中无法处理空的占位数组做处理，Protobuf 2 中不支持undefined进行占位  由于 wireType 只使用 0 1 2 3 4 5
                        // 现在使用 7 作为  undefined 占位使用
                        PBMessageUtils.writeElementTo(element, type, element == undefined ? ((num << 3) | 7) : tag, bytes, subMsgType);
                    }
                }
                else {
                    PBMessageUtils.writeElementTo(value, type, tag, bytes, subMsgType);
                }
            }
            return bytes;
        }

        public static writeElementTo(value: any, type: number, tag: number, bytes: ByteArray, subMsgType?: string): void {
            bytes.writeVarint(tag);
            switch (type) {
                case TYPE_FIXED32:
                    bytes.writeUnsignedInt(value as number);
                    break;
                case TYPE_SFIXED32:
                    bytes.writeInt(value as number);
                    break;
                case TYPE_FLOAT:
                    bytes.writeFloat(value as number);
                    break;
                case TYPE_DOUBLE:
                case TYPE_FIXED64:
                case TYPE_SFIXED64:
                    bytes.writeDouble(value as number);
                    break;
                case TYPE_INT32://int32处理负数，没有按规定的 10字节数据进行处理，直接使用SINT32处理
                //  Signed Integers
                // As you saw in the previous section, all the protocol buffer types associated with wire type 0 are encoded as varints. However, there is an important difference between the signed int types (sint32 and sint64) and the "standard" int types (int32 and int64) when it comes to encoding negative numbers. If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes long – it is, effectively, treated like a very large unsigned integer. If you use one of the signed types, the resulting varint uses ZigZag encoding, which is much more efficient.
                case TYPE_SINT32:
                    bytes.writeVarint(PBMessageUtils.zigzag32(value as number));
                    break;
                case TYPE_ENUM:
                case TYPE_UINT32:
                    bytes.writeVarint(value as number);
                    break;
                case TYPE_INT64:
                case TYPE_SINT64:
                case TYPE_UINT64:
                    bytes.writeVarint64(value as Int64);
                    break;
                case TYPE_BOOL:
                    bytes.writeVarint(value ? 1 : 0);
                    break;
                case TYPE_STRING:
                case TYPE_BYTES:
                case TYPE_MESSAGE:
                    if (type == TYPE_MESSAGE) {
                        var temp: ByteArray = PBMessageUtils.writeTo(value, subMsgType);
                    }
                    else if (type == TYPE_BYTES) {
                        temp = value as ByteArray;
                    }
                    else {
                        temp = new ByteArray;
                        temp.writeUTFBytes(value as string);
                    }
                    length = temp ? temp.length : 0;
                    bytes.writeVarint(length);
                    if (length > 0) {
                        bytes.writeBytes(temp, 0, length);
                    }
                    break;
            }
        }


        public static type2WireType(type: number): number {
            switch (type) {
                case TYPE_FIXED32:
                case TYPE_SFIXED32:
                case TYPE_FLOAT:
                    return 5;
                case TYPE_DOUBLE:
                case TYPE_FIXED64:
                case TYPE_SFIXED64:
                    return 1;
                case TYPE_INT32:
                case TYPE_SINT32:
                case TYPE_ENUM:
                case TYPE_UINT32:
                case TYPE_INT64:
                case TYPE_SINT64:
                case TYPE_UINT64:
                case TYPE_BOOL:
                    return 0;
                case TYPE_STRING:
                case TYPE_MESSAGE:
                case TYPE_BYTES:
                    return 2;
            }
            return -1;
        }


        public static zigzag32(n: number) {
            return (n << 1) ^ (n >> 31);
        }

        public static decodeZigzag32(n: number) {
            return n >> 1 ^ (((n & 1) << 31) >> 31);
        }

    }
}