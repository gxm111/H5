module junyou.sui {
	/**
	 * 基础创建器
	 * @author 3tion
	 *
	 */
    export class BaseCreator<T extends egret.DisplayObject> {



        protected _suiData: SuiData;

        protected _baseData: any[];

        protected _createT: () => T;

        protected _parsed: boolean;

        public size: egret.Rectangle;

        public constructor() {
        }

        public bindSuiData(suiData: SuiData) {
            this._suiData = suiData;
        }


        public parseData(data: any[], suiData: SuiData) {
            if (!this._parsed) {
                this._parsed = true;
                this.bindSuiData(suiData);
                if (data) {
                    this.setBaseData(data[1]);
                    this.parseSelfData(data[2]);
                }
            }
        }

        public parseSize(data: number[]) {
            if (data) {
                this.size = new egret.Rectangle(data[0], data[1], data[2], data[3]);
            }
        }

        public setBaseData(data: any[]) {
            this._baseData = data;
        }

        public parseSelfData(data: any) {

        }


        /**
         * 获取实例
         */
        public getInstance(): T {
            var t = this._createT();
            if (is(t, Component)) {
                (<any>t).init(this);
            }
            if (this._baseData) {
                SuiResManager.initBaseData(t, this._baseData);
            }
            return t;
        }

    }
}
