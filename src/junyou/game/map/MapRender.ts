module junyou.game {
    /**
    * MapRender
    * 用于处理地图平铺的渲染
    */
    export class TileMapLayer extends GameLayer {

        /**
         * @private
         */
        currentMap: MapInfo;

        /**
         * 
         * 显示中的地图
         * @private
         * @type {TileMap[]}
         */
        private _showing: TileMap[] = [];


        public setRect(rect: egret.Rectangle) {
            var cM = this.currentMap;
            if (!cM) {
                return;
            }
            //检查地图，进行加载区块
            var x = rect.x;
            var y = rect.y;
            var w = rect.width;
            var h = rect.height;

            var pW = cM.pWidth;
            var pH = cM.pHeight;
            var sc = x / pW >> 0;
            var sr = y / pH >> 0;
            var ec = (x + w) / pW >> 0;
            var er = (y + h) / pH >> 0;
            ec = Math.min(ec, cM.maxPicX);
            er = Math.min(er, cM.maxPicY);
            // 先将正在显示的全部标记为未使用
            // 换地图也使用此方法处理
            let showing = this._showing;
            for (let m of showing) {
                m.isStatic = false;
                m.lastUseTime = Global.now;
            }
            let i = 0;
            for (let r = sr; r <= er; r++) {
                for (let c = sc; c <= ec; c++) {
                    let uri = cM.getMapUri(c, r);
                    let tm = <TileMap>ResourceManager.getResource(uri);
                    if (!tm) {
                        tm = new TileMap();
                        tm.reset(c, r, uri);
                        tm.x = c * pW;
                        tm.y = r * pH;
                        if (!ResourceManager.regResource(uri, tm)) {
                            throw Error("资源注册失败");
                        }
                        tm.load();
                        this.addChild(tm);
                    }
                    // 舞台上的标记为静态
                    tm.isStatic = true;
                    showing[i++] = tm;
                }
            }
            showing.length = i;
        }

        constructor(id: number) {
            super(id)
        }
    }

    /**
    * TileMap
    */
    export class TileMap extends egret.Bitmap implements IResource {
        /**
         * 地图块的列
         */
        private col: number;
        /**
         * 地图块的行
         */
        private row: number;

        /**
         * 资源唯一标识
         */
        private uri: string;

        /**
         * 
         * 是否为静态资源
         * @type {boolean}
         */
        public isStatic: boolean;

        public lastUseTime: number;

        /**
         * 
         * 资源路径
         * @type {string}
         */
        public url: string;

        get resID() {
            return this.uri;
        }


        constructor() {
            super();
        }

        reset(col: number, row: number, uri: string) {
            this.col = col;
            this.row = row;
            this.uri = uri;
            this.url = ConfigUtils.getResUrl(uri);
        }

        load() {
            RES.getResByUrl(this.url, this.loadComplete, this, RES.ResourceItem.TYPE_IMAGE);
        }

        /**
         * 资源加载完成
         */
        loadComplete(res: egret.Texture, key: string) {
            if (key == this.url) {
                this.texture = res;
            }
        }

        dispose() {
            if (this.texture) {
                this.texture.dispose();
            }
        }
    }
}