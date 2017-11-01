module junyou.game {
    import Event = egret.Event;
    export enum AniPlayState {
        Standby = 0,
        Playing = 1,
        Recycled = 2
    }
	/**
	 * 由于目前特效和渲染器是完全一一对应关系，所以直接做成AniBitmap
	 * @author 3tion
	 *
	 */
    export class AniRender extends BaseRender implements IRecyclable {

        /**
         * 0 初始化，未运行
         * 1 正在运行
         * 2 已回收
         */
        public state: AniPlayState = AniPlayState.Standby;

        protected _guid: number;

        /**
         * 特效标识
         */
        public get guid(): number {
            return this._guid;
        }

        /**
         * 显示对象
         */
        public display: ResourceBitmap;

        protected _aniInfo: AniInfo;

        public constructor() {
            super();
            // ani动画的动作固定值0
            this.a = 0;
        }

        protected render(e: Event) {
            var actionInfo = this._aniInfo.actionInfo;
            if (actionInfo) {
                let now = Global.now;
                this.onData(actionInfo, now);
                this.doRender(now);
            }
        }
        /**
         * 处理数据
         * 
         * @param {number} now 时间戳
         */
        public doData(now: number) {
            if (this._aniInfo) {
                var actionInfo = this._aniInfo.actionInfo;
                if (actionInfo) {
                    this.onData(actionInfo, now);
                }
            }
        }

        renderFrame(frame: FrameInfo, now: number) {
            if (!frame) {
                return;
            }
            this.f = frame.f;
            this.display.draw(this, now);
        }

        doComplete(now: number) {
            AniRender.recycle(this.guid);
        }

        public callback() {
            if (this._aniInfo) {
                let display = this.display;
                display.res = this._aniInfo.getResource();
                if (this.state == AniPlayState.Playing) {
                    display.addEventListener(Event.ENTER_FRAME, this.render, this);
                }
            }
        }

        /**
         * 播放
         */
        public play(now?: number) {
            now = now === void 0 ? Global.now : now;
            this.renderedTime = now;
            this.nextRenderTime = now;
            this.state = AniPlayState.Playing;
            if (this.display.res) {
                this.display.addEventListener(Event.ENTER_FRAME, this.render, this);
            }
        }

        public onRecycle() {
            this.state = AniPlayState.Recycled;
            let display = this.display;
            if (display) {
                this.display = undefined;
                display.removeEventListener(Event.ENTER_FRAME, this.render, this);
                display.recycle();
            }
            if (this._aniInfo) {
                this._aniInfo.loose(this);
                this._aniInfo = undefined;
            }
            this._guid = NaN;
        }

        public onSpawn() {
            this.f = 0;
            this.state = 0;
            this._playSpeed = 1;
        }


        /***********************************静态方法****************************************/
        private static _renderByGuid: { [index: number]: AniRender } = {};

        private static guid = 1;

        private static _pool: RecyclablePool<AniRender> = new RecyclablePool(AniRender);

        /**
         * 获取ANI动画
         * 
         * @static
         * @param {string} uri    动画地址
         * @param {number} [guid] 外部设置动画的guid
         * @returns (description)
         */
        public static getAni(uri: string, guid?: number) {
            let aniDict: any = DataLocator.getData(ConfigKey.ANI);
            let aniInfo: AniInfo = aniDict[uri];
            if (!aniInfo) {
                aniInfo = new AniInfo();
                aniInfo.key = uri;
                aniDict[uri] = aniInfo;
            }
            let display = ResourceBitmap.getInstance();
            let ani = this._pool.getInstance();
            ani._aniInfo = aniInfo;
            ani.display = display;
            if (aniInfo.state == RequestState.COMPLETE) {
                display.res = aniInfo.getResource();
            } else {
                aniInfo.bind(ani);
            }
            ani._guid = guid === void 0 ? this.guid++ : guid;
            this._renderByGuid[ani._guid] = ani;
            return ani;
        }


        /**
         * 获取正在运行的AniRender
         * @param guid  唯一标识
         */
        public static getRunningAni(guid: number) {
            return this._renderByGuid[guid];
        }

        /**
         * 回收某个特效
         * @param {number} guid AniRender的唯一标识
         */
        public static recycle(guid: number) {
            let ani: AniRender = this._renderByGuid[guid];
            if (ani) {
                delete this._renderByGuid[guid];
                this._pool.recycle(ani);
            }
        }
    }
}
