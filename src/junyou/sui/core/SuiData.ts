module junyou.sui {

    const PNG_FILE = "d" + Extension.PNG;


    export interface ISuiDataCallback {
        suiDataComplete(suiData: SuiData): void;
        suiDataFailed(suiData: SuiData): void;
    }

	/**
	 * 用于加载和存储fla导出的ui数据和位图
	 * @author 3tion
	 *
	 */
    export class SuiData extends egret.EventDispatcher {

    	/**
    	 * fla的名字
    	 */
        public key: string;

        /**
         * 加载地址
         */
        public url: string;

    	/**
    	 * 位图数据
    	 */
        public bmd: egret.BitmapData;

    	/**
    	 * 回调函数
    	 */
        public callbacks: ISuiDataCallback[];

    	/**
    	 * 数据加载状态
    	 * 0 未加载
    	 * 1 加载中
    	 * 2 数据加载完成
    	 */
        public state: RequestState = RequestState.UNREQUEST;

    	/**
    	 * 位图状态
    	 */
        public bmdState: RequestState = RequestState.UNREQUEST;

    	/**
    	 * 库数据
         * key      fla中设置的导出名<br/>
         * value    皮肤数据<br/>
    	 */
        public lib: { [index: string]: BaseCreator<egret.DisplayObject> } = {};

        /**
         * 纹理数据
         * key      图片索引<br/>
         * value    纹理
         */
        public imgs: egret.Texture[] = [];

        /**
         * 位图创建器
         */
        public bitmaplibs: { [index: number]: BitmapCreator };


        /**
         * 正在使用的计数
         */
        public using = 0;


        /**
         * 未加载的时候，请求的位图
         */
        public loading: egret.Bitmap[] = [];

        /**
         * 最后使用的时间戳
         */
        public lastUseTime: number = 0;

        /***
         * 未经过解析的源组件数据
         */
        public sourceComponentData: Object;

        /**
         * 位图加载完成
         * 
         * @static
         * @type {string}
         */
        public static FLA_COMPLETE: string = "FLA_COMPLETE";

        public constructor() {
            super();
        }
        /**
         * 加载图片
         */
        public loadBitmap() {
            if (this.bmdState == RequestState.UNREQUEST) {
                var url = ConfigUtils.getSkinFile(this.key, PNG_FILE);
                this.bmdState = RequestState.REQUESTING;
                RES.getResByUrl(url, this.checkBitmap, this, RES.ResourceItem.TYPE_IMAGE);
            }
        }

        /**
         * 检查位图数据
         */
        protected checkBitmap(tex: egret.Texture, key: string) {
            let bmd = tex.bitmapData;
            this.bmd = bmd;
            this.bmdState = RequestState.COMPLETE;
            for (let tex of this.imgs) {
                tex._bitmapData = bmd;
            }
            //将绑定的位图，全部重新设置一次
            for (let bmp of this.loading) {
                // let tex = bmp.texture;
                // bmp.texture = null;
                // bmp.texture = bmp;
                bmp.refreshBMD();
            }
            this.loading = undefined;
            this.dispatchEventWith(SuiData.FLA_COMPLETE, false, this.key);
        }

    }
}
