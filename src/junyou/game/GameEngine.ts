module junyou.game {

    const layerConfigs = {};

	/**
	 * 用于做斜45°视角2d游戏的引擎<br/>
	 * @author 3tion
     * 2016-02-17 目标：1 完成地图的平铺显示
     *                  2 完成人物播放
	 *
	 */
    export class GameEngine extends egret.EventDispatcher {

        static instance: GameEngine;

        static init(stage: egret.Stage) {
            var engine = new GameEngine(stage);
            GameEngine.instance = engine;
        }

        initConfigs() {
            new LayerConfig(GameLayerID.Tip);
            new LayerConfig(GameLayerID.UI_4);
            new LayerConfig(GameLayerID.UI_3);
            new LayerConfig(GameLayerID.UI_2);
            new LayerConfig(GameLayerID.UI_1);
            new LayerConfig(GameLayerID.UI_0);
            new LayerConfig(GameLayerID.Game);
            new LayerConfig(GameLayerID.Mask, GameLayerID.Game);
            new LayerConfig(GameLayerID.TopEffect, GameLayerID.Game);
            new LayerConfig(GameLayerID.GameScene, GameLayerID.Game);
            new LayerConfig(GameLayerID.CeilEffect, GameLayerID.GameScene);
            new LayerConfig(GameLayerID.SortedUI, GameLayerID.GameScene, SortedLayer);
            new LayerConfig(GameLayerID.GameEffect, GameLayerID.GameScene);
            new LayerConfig(GameLayerID.Sorted, GameLayerID.GameScene, SortedLayer);
            new LayerConfig(GameLayerID.Bottom, GameLayerID.GameScene);
            new LayerConfig(GameLayerID.BottomEffect, GameLayerID.GameScene);
            new LayerConfig(GameLayerID.Background, GameLayerID.GameScene, TileMapLayer);
            new LayerConfig(GameLayerID.Mini, GameLayerID.GameScene);
        }


        /**
         * 摄像机，用于处理镜头坐标相关
         */
        public camera: Camera;

        protected _viewRect: egret.Rectangle;

        /**
         * 单位的排序是否发生改变
         */
        protected static _sortDirty: Boolean;

        /**
         * 单位坐标发生变化时调用
         */
        public static invalidateSort() {
            GameEngine._sortDirty = true;
        }

        public get viewRect(): egret.Rectangle {
            return this._viewRect;
        }

        protected _stage: egret.Stage;

        protected _layers: GameLayer[] = [];

        /**
         * 排序层
         */
        protected _sortedLayers: SortedLayer[] = [];

        /**
         * 游戏主场景容器
         */
        protected _gameScene: GameLayer;

        /**
         * 地图渲染层
         */
        protected _background: TileMapLayer;

        /**
         * 当前地图
         */
        protected _currentMap: MapInfo;

        /**
         * 获取或创建容器
         */
        public getLayer(id: GameLayerID): GameLayer {
            let layers = this._layers;
            let layer = layers[id];
            if (!layer) {
                let cfg: LayerConfig = layerConfigs[id];
                if (!cfg) {
                    return;
                }
                let ref = cfg.ref;
                layer = new ref(id);
                if (cfg && cfg.parentid) {
                    var parent = this.getLayer(cfg.parentid);
                    this.addLayerToContainer(layer, parent);
                } else {
                    this.addLayerToContainer(layer, this._stage);
                }
                layers[id] = layer;
                if (layer instanceof SortedLayer) {
                    this._sortedLayers.push(layer);
                }
            }
            return layer;
        }


        private addLayerToContainer(layer: GameLayer, container: egret.DisplayObjectContainer): void {
            let children = container.$children;
            let id = layer.id;
            let i = 0;
            for (let len = children.length; i < len; i++) {
                let child = children[i];
                if (child instanceof GameLayer) {
                    let childLayer = <GameLayer>child;
                    if (childLayer.id > id) {
                        break;
                    }
                }
            }
            container.addChildAt(layer, i);
        }

        constructor(stage: egret.Stage) {
            super();
            this.initConfigs();
            this._stage = stage;
            this.initLayers();
            stage.addEventListener(egret.Event.ENTER_FRAME, this.render, this);
        }

        /**
         * 初始化默认添加的层
         */
        protected initLayers() {
            this.getLayer(GameLayerID.Tip);
            this.getLayer(GameLayerID.UI_4);
            this.getLayer(GameLayerID.UI_3);
            this.getLayer(GameLayerID.UI_2);
            this.getLayer(GameLayerID.UI_1);
            this.getLayer(GameLayerID.UI_0);
            this.getLayer(GameLayerID.Game);
            this._gameScene = this.getLayer(GameLayerID.GameScene);
            this.getLayer(GameLayerID.CeilEffect);
            this.getLayer(GameLayerID.SortedUI);
            this.getLayer(GameLayerID.GameEffect);
            this.getLayer(GameLayerID.Sorted);
            this.getLayer(GameLayerID.Bottom);
            this.getLayer(GameLayerID.BottomEffect);
            this._background = <TileMapLayer>this.getLayer(GameLayerID.Background);
            this.getLayer(GameLayerID.Mini);
        }

        /**
         * 进入新地图
         */
        public enterMap(map: MapInfo) {
            //先清理场景中的元素
            this.clearMap();
            this._currentMap = map;
            this._background.currentMap = map;
            this.initMap();
        }

        /**
         * 清理地图
         */
        public clearMap() {
            // 清理底图
            this._background.removeChildren();
        }

        /**
         * 初始化地图
         */
        public initMap() {
            //TODO 加载小地图，渲染到Background层
            this.render();
        }

        /**
         * 渲染
         */
        public render() {
            if (GameEngine._sortDirty) {
                for (let sortedLayer of this._sortedLayers) {
                    sortedLayer.sort();
                }
                GameEngine._sortDirty = false;
            }
            let camera = this.camera;
            if (camera.changed) {
                let rect = camera.rect;
                this._gameScene.scrollRect = rect;
                //渲染地图底图
                this._background.setRect(rect);
                this._viewRect = rect;
                camera.change();
            }
        }


        /**
         * 启动时调用
         */
        public awake(): void {

        }

        /**
         * 
         */
        public sleep(): void {

        }

    }


    /**
     * 游戏中层级标识
     */
    export enum GameLayerID {
        /**
         * Tip层
         * 用于放alert等最高层级
         * 不进行滚轴
         */
        Tip = 9000,

        /**
         * ui层 最上面
         * 盖住minirole和sider
         */
        UI_4 = 8040,
        /**
         * UI层
         * sider
         */
        UI_3 = 8030,
        /**
         * UI层
         * 在minirole下面，在sider上面
         */
        UI_2 = 8020,

        /**
         * UI层
         * MiniRole
         */
        UI_1 = 8010,
        /**
         * UI层
         * 用于放各种UI
         * 不进行滚轴
         * 在菜单和头像下面，属最底层
         */
        UI_0 = 8000,

        /**
         * 游戏层
         * 人物死亡如果进行颜色变灰，则基于此容器变灰
         */
        Game = 1000,
        /**
         * 游戏蒙版层   
         * 用于放流血效果，迷雾效果之类的容器
         * 无鼠标事件
         * 不进行滚轴
         **/
        Mask = 1900,
        /**
         * 相机特效层   
         * 用于处理飘雪，飘雨类似效果 
         * 无鼠标事件
         * 不进行滚轴
         **/
        TopEffect = 1800,
        /**
         * 游戏滚轴层
         * 下级容器参与滚轴
         */
        GameScene = 1700,
        /**
         * 顶部场景特效
         * 用于放云朵等特效
         * 无鼠标事件
         * 不排序
         */
        CeilEffect = 1790,
        /**
         * 用于放置跟随单位一起的UI，角色血条，角色名字，头衔等
         */
        SortedUI = 1780,
        /**
         * 游戏特效层，
         * 一般盖在人身上的特效放于此层
         * 无鼠标事件
         * 不排序
         */
        GameEffect = 1770,

        /**
         * 参与排序的单位的容器
         * 放人，怪物，会进行排序
         */
        Sorted = 1760,
        /**
         * 底层
         * 放置尸体，光环
         * 会排序
         */
        Bottom = 1750,
        /**
         * 底部场景特效层
         */
        BottomEffect = 1740,

        /**
         * 地图渲染层
         */
        Background = 1730,

        /**
         * 地图预览图
         */
        Mini = 1710
    }

    /**
     * 层级配置
     */
    class LayerConfig {
        public id: number;

        public parentid: number;

        public ref: new (id: number) => GameLayer;

        constructor(id: number, parentid: number = 0, ref?: new (id: number) => GameLayer) {
            this.id = id;
            this.parentid = parentid;
            this.ref = ref || GameLayer;
            layerConfigs[id] = this;
        }
    }
}