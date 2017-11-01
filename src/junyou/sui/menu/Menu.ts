module junyou.sui{
    
    /**
     * @author gushuai
     * (description)
     * 
     * @export
     * @class Menu
     * @extends {egret.Sprite}
     */
    export class Menu extends egret.Sprite{

        private static dic:Map<egret.DisplayObject,Menu>;

        /**
         * 回调参数，第1位是绑定的target
         * 第2位是Menu
         * 
         * @static
         * @type {Function}
         */
        public menuinitFunc:Function;

        private style:MenuStyle<MenuBaseRender<MenuBaseVO>>;

        private uiManager:sui.SuiResManager;

        private maxRenderCount:number;

        private renders:sui.MenuBaseRender<MenuBaseVO>[];


        /**
         * (description)
         * 
         * @static
         * @ param {egret.DisplayObject} target (Menu所在的父容器)
         * @ param {Menu} menu (menu实例)
         * @ param {Function} callBack (menu的displayMenuDatas具体实现函数（回调参数，第1位是绑定的target 第2位是Menu）)
         */
        public static bind(target:egret.DisplayObject,menu:Menu,menuinit:Function){
            if(!Menu.dic){
                Menu.dic = new Map<egret.DisplayObject,Menu>();
            }
            if(!Menu.dic.has(target)){
                Menu.dic.set(target,menu);
            }
            menu.menuinitFunc = menuinit;
            target.addEventListener(EventConst.CHOOSE_STATE_CHANGE,Menu.onShowOrHideMenu,this);
        }

        public static unBind(target:egret.DisplayObject){
            if(!Menu.dic)return;
            if(Menu.dic.has(target)){
                let dis:Menu = Menu.dic.get(target);
                dis.menuinitFunc = undefined;
                removeDisplay(dis);
                Menu.dic.delete(target);
            }
            target.removeEventListener(EventConst.CHOOSE_STATE_CHANGE,Menu.onShowOrHideMenu,this);
        }

        private static onShowOrHideMenu(e:Event){
            if("getChooseState" in e.target){
                let b = (<any>e.target).getChooseState();
                let dis = <Menu>Menu.dic.get(<any>e.target);
                if(b){
                    if("addChild" in e.target){
                        <any>e.target["addChild"](dis);
                        dis.menuinitFunc.apply(this,[e.target,dis]);
                    }
                }else{
                    removeDisplay(dis);
                }
                if(e.target instanceof egret.DisplayObject){
                    e.target["dispatchEventWith"](egret.Event.RESIZE);
                }
            }
        }

        public constructor(style:MenuStyle<MenuBaseRender<MenuBaseVO>>,maxRendercount:number){
            super();
            this.style = style;
            this.uiManager = sui.SuiResManager.getInstance();
            this.maxRenderCount = maxRendercount;
            this.initUI();
        }

        protected initUI(){
            let manager =this.uiManager;
            let uri:string = this.style.uikey;
            let rec:egret.Rectangle = this.style.possize;
            let rendercls = this.style.renderClass;
            let bguri:string = this.style.scalebg;
            let bg:sui.ScaleBitmap = <sui.ScaleBitmap>manager.createDisplayObject(uri,bguri);
            this.addChild(bg);
            bg.width = rec.width;
            bg.height = rec.height;
            this.renders = [];
            for(let i=0;i<this.maxRenderCount;i++){
                let render = new rendercls();
                this.renders[i] = render;
                this.addChild(render);
            }
        }

        /**
         * 显示菜单操作项
         */
        public displayMenuDatas(vos:any[]){
            let len = vos.length;
            let blen = this.renders.length;
            let tmp:sui.MenuBaseRender<MenuBaseVO>[] = []
            for(let i=0;i<len;i++){
                let render = this.renders[i];
                render.setData(vos[i]);
                this.addChild(render);
                tmp[i]=render;
            }
            if(len<blen){
                for(let i=len;i<blen;i++){
                    removeDisplay(this.renders[i]);
                }
            }
            let rec:egret.Rectangle = this.style.possize;
            let gap:number;
            if(this.style.align == 0){
                gap = (rec.width - rec.x*2-len*tmp[0].width)/(len-1);
                for(let i=0;i<len;i++){
                    tmp[i].x = rec.x + (gap+tmp[i].width)*i;
                    tmp[i].y = rec.y;
                }
            }
            else
            {
                gap = (rec.height - rec.y*2-len*tmp[0].height)/(len-1);
                for(let i=0;i<len;i++){
                    tmp[i].x = rec.x;
                    tmp[i].y = rec.y+(gap+tmp[i].height)*i;
                }
            }
        }

    }
}