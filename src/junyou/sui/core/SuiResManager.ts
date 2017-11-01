module junyou.sui {
    import Texture = egret.Texture;

    const DATA_FILE = "s.json";

	/**
	 * 用于管理位图和数据
	 * @author 3tion
	 *
	 */
    export class SuiResManager {

        private static _instance: SuiResManager;

        public static getInstance(): SuiResManager {
            var instance = this._instance;
            if (!instance) {
                instance = new SuiResManager();
                this._instance = instance;
            }
            return instance;
        }


    	/**
    	 * Key      {string}    fla的文件名
    	 * Value    {SuiData}   数据
    	 */
        protected _suiDatas: { [index: string]: SuiData };


    	/**
    	 * Key      {string}    主配置文件的加载地址
    	 * Value    {SuiData}   数据
    	 */
        protected _urlKey: { [index: string]: SuiData };

    	/**
    	 * 创建器
    	 */
        protected _creators: { [index: string]: { new (): BaseCreator<egret.DisplayObject> } };


    	/**
    	 * 共享的文本创建器
    	 */
        protected _sharedTFCreator: TextFieldCreator;

        public constructor() {
            this._suiDatas = {};
            this._urlKey = {};
            this.initInlineCreators();
        }

        protected initInlineCreators() {
            let creators: { [index: string]: { new (): BaseCreator<egret.DisplayObject> } } = {};
            this._creators = creators;
            this._sharedTFCreator = new TextFieldCreator();
            creators[ExportType.Button] = ButtonCreator;
            creators[ExportType.ShapeNumber] = ArtTextCreator;
            creators[ExportType.ScaleBitmap] = ScaleBitmapCreator;
            creators[ExportType.NumericStepper] = NumericStepperCreator;
            creators[ExportType.Slider] = SliderCreator;
            creators[ExportType.ScrollBar] = ScrollBarCreator;
            creators[ExportType.ProgressBar] = ProgressBarCreator;
            creators[ExportType.SlotBg] = ScaleBitmapCreator;
            creators[ExportType.ShareBmp] = ShareBitmapCreator;
            creators[ExportType.Slot] = SlotCreator;
        }

        public getData(key: string) {
            return this._suiDatas[key];
        }

		/**
		 * 加载数据
		 */
        public loadData(key: string, callback: ISuiDataCallback) {
            var suiData = this._suiDatas[key];
            if (!suiData) {
                suiData = new SuiData();
                suiData.key = key;
                this._suiDatas[key] = suiData;
            }
            var state = suiData.state;
            if (state == RequestState.FAILED) {
                callback.suiDataFailed(suiData);
            } else if (state == RequestState.COMPLETE) {
                callback.suiDataComplete(suiData);
            } else {
                var callbacks = suiData.callbacks;
                if (state == RequestState.UNREQUEST) {
                    suiData.state = RequestState.REQUESTING;
                    suiData.callbacks = callbacks = [];
                    //先加载配置
                    var url = ConfigUtils.getSkinFile(key, DATA_FILE);
                    suiData.url = url;
                    this._urlKey[url] = suiData;
                    RES.getResByUrl(url, this.checkData, this);
                }
                callbacks.pushOnce(callback);
            }
        }

        /**
         * 
         * 直接将已经加载好的内置数据，和key进行绑定
         * @param {string} key
         * @param {*} data
         */
        public setInlineData(key: string, data: any) {
            var url = ConfigUtils.getSkinFile(key, DATA_FILE);
            var suiData = this._urlKey[url];
            if (!suiData) {
                suiData = new SuiData();
                suiData.key = key;
                suiData.url = url;
                this._suiDatas[key] = suiData;
            }
            this._initSuiData(data, suiData);
        }

        /**
         * 
         * 初始化数据
         * @private
         * @param {*} data
         * @param {SuiData} suiData
         */
        private _initSuiData(data: any, suiData: SuiData) {
            //  data的数据结构：
            //  lib[
            //     [ //图片
            // 		[128,32,12,33],//图片1   索引0
            //        [224,210,33,66],//图片2  索引1
            //         ......
            //        [48,62,133,400],//图片21 索引20
            //      ],{
            //        "btn":[ //按钮类型/页签/单选框/多选框 3帧或者4帧  0弹起 1选中 2禁用(未选中的样子) 3禁用(选中)
            //             //存放导出名字,
            //           ["ui.btn.Button1", //索引0
            //             "ui.tab.Tab1"],   //索引1
            // 			//存放数据
            //             [{...},
            //             {...}]
            //        ],
            //        "scroll":[//滚动条 track bar
            // 		],
            //        "progress":[//进度条
            //        ]
            //        },{
            //          "panel":[
            //    
            //          ]
            //        }
            //     ]

            //解析img节点
            this.parseTexureData(data[0], suiData);

            suiData.sourceComponentData = data[1];
            //处理控件
            this.parseComponentData(data[1], suiData);
            //数据已经完成，未加载位图
            suiData.state = RequestState.COMPLETE;
            if (suiData.callbacks) {
                for (var callback of suiData.callbacks) {
                    callback.suiDataComplete(suiData);
                }
                suiData.callbacks = undefined;
            }
        }


		/**
		 * 数据加载完成
		 */
        protected checkData(data: any, key: string) {
            var suiData = this._urlKey[key];
            if (!data) {//加载失败
                suiData.state = RequestState.FAILED;
                for (var callback of suiData.callbacks) {
                    callback.suiDataFailed(suiData);
                }
                suiData.callbacks = undefined;
                return;
            }
            this._initSuiData(data, suiData);
        }

        /**
         * 处理控件数据
         */
        protected parseComponentData(allComData: any[], suiData: SuiData) {
            for (let type in allComData) {
                let comsData = allComData[type];
                let nameData: string[] = comsData[0];//["ui.btn.Button1", "ui.tab.Tab1"] 
                let comData = comsData[1];//[{...},{...}]//组件的数据
                let sizeData = comsData[2];
                let ref = this._creators[type];
                if (ref) {
                    for (let i = 0, len = nameData.length; i < len; i++) {
                        let name = nameData[i];
                        let creator = new ref;
                        creator.parseData(null, suiData);
                        let dat = comData[i];
                        if (dat) {
                            creator.parseSelfData(comData[i]);
                            creator.parseSize(sizeData[i]);
                        }
                        suiData.lib[name] = creator;
                    }
                }
            }
        }


        /**
         * 解析图片数据
         *  0 图片宽  1图片高度   2偏移X   3偏移Y
         */
        protected parseTexureData(data: number[][], suiData: SuiData) {
            if (data) {
                var imgs = [];
                var bcs = [];
                suiData.imgs = imgs;
                suiData.bitmaplibs = bcs;
                for (let i = 0, len = data.length; i < len; i++) {
                    let imgData: number[] = data[i];
                    let tex: Texture = new Texture();
                    let width = imgData[0];
                    let height = imgData[1];
                    let sx = imgData[2];
                    let sy = imgData[3];
                    tex.$initData(sx, sy, width, height, 0, 0, width, height, width, height);
                    imgs[i] = tex;
                    var bc = new BitmapCreator(suiData);
                    bc.parseSelfData(i);
                    bcs[i] = bc;
                }
            }
        }

        /**
         * 创建可视控件
         * @param uri           皮肤标识
         * @param className     类名字
         * @param baseData      基础数据
         */
        public createDisplayObject(uri: string, className: string, baseData?: any): egret.DisplayObject {
            var suiData = this._suiDatas[uri];
            if (suiData) {
                var creator = suiData.lib[className];
                creator.setBaseData(baseData);
                return creator.getInstance();
            }
            //[3,["btn2",14.5,139,79,28,0],0,0]
            return;
        }


        /**
         * 创建位图对象
         * @param uri       皮肤标识
         * @param index     位图索引 data[2]
         * @param baseData  基础数据 data[1]
         */
        public createBitmap(uri: string, index: number, baseData: any): egret.Bitmap {
            var suiData = this._suiDatas[uri];
            if (suiData) {
                var bc = suiData.bitmaplibs[index];
                if (bc) {
                    bc.setBaseData(baseData);
                    return bc.getInstance();
                }
            }
            return;
        }




        /**
         *  创建位图对象
         * @param uri       皮肤标识
         * @param data      JSON的数据
         */
        public createBitmapByData(uri: string, data: any): egret.Bitmap {
            return this.createBitmap(uri, data[2], data[1]);
        }


        /**
         * 创建文本框
         * @param uri       皮肤标识
         * @param data      私有数据 data[2]
         * @param baseData  基础数据 data[1]
         */
        public createTextField(uri: string, data: any, baseData: any): egret.TextField {
            let tfCreator = this._sharedTFCreator;
            tfCreator.parseSelfData(data);
            tfCreator.setBaseData(baseData);
            return tfCreator.getInstance();
        }

        /**
        *  创建文本框
        * @param uri       皮肤标识
        * @param data      JSON的数据
        */
        public createTextFieldByData(uri: string, data: any) {
            return this.createTextField(uri, data[2], data[1]);
        }

        public static initBaseData(dis: egret.DisplayObject, data: any) {
            if (data[0]) {
                dis.name = data[0];
            }
            dis.x = +data[1];
            dis.y = +data[2];
            dis.width = +data[3];
            dis.height = +data[4];
            dis.rotation = data[5] || 0;
        }
    }
}
