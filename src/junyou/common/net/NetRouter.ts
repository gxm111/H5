module junyou {
	/**
	 *
	 * @author 3tion
	 *
	 */
    export class NetRouter {

    	/**
    	 * key      协议号<br/>
    	 * value    处理函数<br/>
    	 */
        private _funcMaps: { [inedx: number]: INetHandler };

        /**
         * key      协议号<br/>
         * value    NetBin的数组
         */
        private _listenerMaps: { [index: number]: NetBin[] };

        public constructor() {
            this._funcMaps = {};
            this._listenerMaps = {};
        }

		/**
		 * 注册一cmd侦听; 
		 * @param cmd      协议号
		 * @param handler   处理器   
		 * @param priority  越大越优先
		 * @param once      是否只执行一次
		 * @return boolean true 做为新的兼听添加进去，false 原来就有处理器
		 * 
		 */
        public register(cmd: number, handler: INetHandler, priority = 0, once = false): boolean {
            var funcMaps = this._funcMaps;
            if (once) {//单次永远执行dispatch
                if (!funcMaps[cmd]) {
                    funcMaps[cmd] = dispatch;
                }
            }

            var old = funcMaps[cmd];
            if (old == handler) {
                return false;
            }
            var listenerMaps = this._listenerMaps;
            var list = listenerMaps[cmd];
            if (!list) {
                list = [];
                listenerMaps[cmd] = list;
            }

            var netBin = { handler, priority, once };
            if (!old) {
                funcMaps[cmd] = handler;
                //以前单条是没有存储优先级信息的，会导致，如果先加入的大的，后加入小的，可能会出现问题
                list.push(netBin);
                return true;
            }

            var dispatch: INetHandler = this.dispatch;
            if (old != dispatch) {
                funcMaps[cmd] = dispatch;
            }
            var i;
            var len = list.length;

            //=====同样的CODE 同样的Function 不会被注册多次=====
            for (i = 0; i < len; i++) {
                let temp = list[i];
                if (temp.handler == handler) {
                    if (temp.priority == priority) {
                        return false;
                    }
                    //新的同指令，同处理器的函数会被新的once,priority属性覆盖
                    list.splice(i, 1);
                    len--;
                    break;
                }
            }


            for (i = 0; i < len; i++) {
                if (priority > list[i].priority) {
                    list.splice(i, 0, netBin);
                    return true;
                }
            }

            list[len] = netBin;
            return true;
        }

		/**
		 * 删除兼听处理器
		 * @param cmd      协议号
		 * @param handler   处理器
		 * @return boolean true 删除成功  <br/>
		 *                 false 没有这个兼听
		 */
        public remove(cmd: number, handler: INetHandler) {
            var funcMaps = this._funcMaps;
            var old: INetHandler = funcMaps[cmd];
            if (!old) {
                return false;
            }
            if (old != this.dispatch) {
                if (old != handler) {
                    return false;
                }
                delete funcMaps[cmd];
                return true;
            }

            var listenerMaps = this._listenerMaps;
            var list = listenerMaps[cmd];
            if (!list) {
                return false;
            }

            var len = list.length;
            for (let i = 0; i < len; i++) {
                if (list[i].handler == handler) {
                    list.splice(i, 1);

                    //如果没有项了就清理;
                    if (len == 1) {
                        delete listenerMaps[cmd];
                        delete funcMaps[cmd];
                    }
                    return true;
                }
            }
            return false;
        }

        private dispatchList: NetBin[] = [];

        /**
        * 调用列表
        */
        public dispatch(data: NetData) {
            var cmd = data.cmd;
            var list = this._listenerMaps[cmd];
            if (!list) {
                return;
            }
            var idx = 0;
            var dispatchList = this.dispatchList;
            var bin: NetBin;
            for (bin of list) {
                dispatchList[idx++] = bin;
            }
            for (let i = 0; i < idx; i++) {
                bin = dispatchList[i];
                bin.handler(data);
                if (bin.once) {//如果只执行一次的，就移除
                    this.remove(cmd, bin.handler);
                }
                if (data.stopPropagation) {
                    break;
                }
            }

        }
    }

	/**
	 * 协议处理函数
	 */
    export interface INetHandler { (data: NetData): void };

    interface NetBin {

        /**
         * 协议处理函数
         */
        handler: INetHandler;

        /**
         * 优先级
         */
        priority: number;

        /**
         * 是否只执行一次
         */
        once: boolean;
    }
}
