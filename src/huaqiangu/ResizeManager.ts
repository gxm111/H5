module junyou.hqg {
    export class ResizeManager {
        private static _instance: ResizeManager;

        private _stage: egret.Stage;

        private _dislist: any[];

        private _layList: any[];

        private _hoffArr: any[];

        private _voffArr: any[];

        public static getInstance(): ResizeManager {
            if (!this._instance) {
                this._instance = new ResizeManager();
            }
            return this._instance;
        }

        public init(stage: egret.Stage) {
            this._stage = stage;
            this._dislist = [];
            this._layList = [];
            this._hoffArr = [];
            this._voffArr = [];
            this._stage.addEventListener(egret.Event.RESIZE, this.onstageResize, this);
        }

        /**
         *添加一个元件，相对于舞台的布局
         * 
         * @ param {egret.DisplayObject} dis (description)
         * @ param {number} layout (sui.Layout)
         * @ param {number} hoffset 在大布局的基础上，水平方向上的再偏移量（右移传正，左移传负）
         * @ param {number} voffset 在大布局的基础上，垂直方向上的再偏移量（下移传正，上移传负）
         */
        public add(dis: egret.DisplayObject, layout: number, hoffset: number = 0, voffset: number = 0) {
            this._dislist.push(dis);
            this._layList.push(layout);
            this._hoffArr.push(hoffset);
            this._voffArr.push(voffset);
            if (!dis.stage) {
                dis.addEventListener(egret.Event.ADDED_TO_STAGE, this.onDisAdded, this);
            }
        }

        /**
         * 移除元件
         * 
         * @param {egret.DisplayObject} dis (description)
         * @returns (description)
         */
        public remove(dis: egret.DisplayObject) {
            let index = this._dislist.indexOf(dis);
            if (index < 0) return;
            dis.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onDisAdded, this);
            this._dislist.splice(index, 1);
            this._layList.splice(index, 1);
            this._hoffArr.splice(index, 1);
            this._voffArr.splice(index, 1);
        }

        private onDisAdded(e: egret.Event) {
            let dis = e.target;
            let index = this._dislist.indexOf(dis);
            if (index < 0) return;
            sui.Layout.layout(dis, this._layList[index], this._hoffArr[index], this._voffArr[index], true, true, this._stage);
        }

        private onstageResize(e: egret.Event) {
            let len = this._dislist.length;
            let dis: egret.DisplayObject;
            for (let i = 0; i < len; i++) {
                dis = this._dislist[i];
                sui.Layout.layout(dis, this._layList[i], this._hoffArr[i], this._voffArr[i], true, true, this._stage);
            }
        }
    }
}