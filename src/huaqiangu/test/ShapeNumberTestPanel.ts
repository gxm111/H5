module junyou.sui {
    export class ShapeNumberTestPanel extends egret.Sprite implements ISuiDataCallback {

        public _className: string;

        private _shape: ArtNumber;

        private frameTime;

        private lastTickTime;

        private msgManager: junyou.hqg.MessageManager;

        public constructor() {
            super();
            this.initTween();
            this.loadSkin();
        }

        private initTween() {
            this.frameTime = 10;
        }

        private loadSkin() {
            this.touchChildren = this.touchEnabled = true;
            this.graphics.beginFill(0xffff00);
            this.graphics.drawRect(0, 0, 800, 200);
            this.graphics.endFill();
            let suiManager: SuiResManager = SuiResManager.getInstance();
            suiManager.loadData("lib", this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.added, this);

        }

        private added(e: egret.Event) {
            // this.graphics.clear();
            // this.graphics.beginFill(0x00ff00);
            // this.graphics.drawRect(0, 0, 200, 200);
            // this.graphics.endFill();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
            this.lastTickTime = Global.now;

        }

        private onClick(e: egret.TouchEvent) {
            let shape = <ArtNumber>this._shape;
            if (shape != null) {
                shape.setTweenValue(<number>shape.value + 100, 1000);
            }
        }

        public suiDataComplete(suiData: SuiData): void {
            console.log("shaperNumber皮肤加载成功!");
            suiData.addEventListener(SuiData.FLA_COMPLETE, this.onUicomplete, this);
            suiData.loadBitmap();

        }

        private onUicomplete(e: egret.Event) {
            this.createNumericStepper();
            this.addProgressBar();
        }

        private addProgressBar() {
            /*let btn:Button = <Button>SuiResManager.getInstance().createDisplayObject("lib","ui.btn.Btn1",null);
            btn.x = 150;
            btn.y = 150;
            this.addChild(btn);*/

            // let progressBar: ProgressBar = <ProgressBar>SuiResManager.getInstance().createDisplayObject("lib", "ui.progress.Bar1", null);
            // this.addChild(progressBar);
            // progressBar.x=300;
            // progressBar.y=300;
            // progressBar.labelFunction=this.progressBarLabelFunc;
            // progressBar.progress(20, 100);
        }

        private progressBarLabelFunc(value: number, maxValue: number): string {
            return value + "-=-=-=-" + maxValue;
        }

        public suiDataFailed(suiData: SuiData): void {
            //暂时用alert
            alert(this._className + "加载失败");
        }

        private createNumericStepper() {
            // let num:NumericStepper = <NumericStepper>SuiResManager.getInstance().createDisplayObject("lib","ui.numstep.style1",null);
            // this.addChild(num);
            // num.value = 1;
            // num.width = 80;
            // let btn:Button = <Button>SuiResManager.getInstance().createDisplayObject("lib","ui.btn.sub",null);
            // btn.x = 150;
            // btn.y = 150;
            // this.addChild(btn);

            //  let sc:ScaleBitmap = <ScaleBitmap>SuiResManager.getInstance().createDisplayObject("lib","bmd.scale9.txtbg",null);
            // sc.x = 170;
            // sc.y = 170;
            // sc.width = 200;
            // sc.height = 50;
            // this.addChild(sc);

            // let slider:Slider = <Slider>SuiResManager.getInstance().createDisplayObject("lib","ui.slider.style1",null);
            // slider.maxVlaue = 200;
            // slider.minValue = 0;
            // slider.step = 1;
            // slider.value = 0;
            // slider.barEnabled = true;
            // this.addChild(slider);

            let scroll: ScrollBar = <ScrollBar>SuiResManager.getInstance().createDisplayObject("lib", "ui.scroll.Style1", null);
            // this.addChild(scroll);
            // let txt:egret.TextField = new egret.TextField();
            // txt.$setTextColor(0);
            // txt.text = "gggggggg11111111112222222222233333333333334444444444444455555555555556666666666666777777777777888888888888899999999999999aaaaaaaaaassssssssssddddddddddffffffffffggggggggggghhhhhhhhhjjjjjjjjjjjkkkkkkkkkkklllllllllmmmmmmmbbbbbbbbbvvvvvvvvvccccccccccxxxxxxxxxxzzzzzzzzz";
            // txt.width = 150;
            // txt.wordWrap = true;
            // txt.x = 20;
            // this.addChild(txt);
            let scroller: Scroller = new sui.Scroller();
            // // scroller.scrollType = 1;
            // let rect:egret.Rectangle = new egret.Rectangle(txt.x-2,txt.y,200,200);
            // scroller.bindObj(txt,rect,scroll);
            // scroll.supportSize = 10;

            // var sp:egret.Sprite = new egret.Sprite();
            // sp.x = 200;
            // var tmp:egret.Sprite;
            // for(let i=0;i<5;i++){
            //     tmp = this.getgSp();
            //     tmp.x = i*110;
            //     sp.addChild(tmp);
            // }
            // this.addChild(sp);
            // let pscroll = new sui.PageScroller();
            // pscroll.globalspeed = 1;
            // pscroll.scrollType = 1;
            // pscroll.minPageScrollSpeed = 2;
            // pscroll.autoScrollSpeed = 0.1;
            // pscroll.blockSpeed = 1;
            // pscroll.settotalpageInfo(5,110);
            // pscroll.bindObj(sp,new egret.Rectangle(0,0,100,150));

            // let list:PageList = new PageList(TestItemRender,10,10,5,1);
            // list.x = 30;
            // // this.addChild(list);
            // let rect:egret.Rectangle = new egret.Rectangle(0,list.y,220,200);
            // scroller.alwaysShowBar = true;
            // scroller.bindObj(list,rect,scroll);
            // scroll.supportSize = 10;
            // list.displayList([[1],[2],[3],[4],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5],[5]]);

            // list.selectedIndex = 25;
            // this.plist = list;

            let a: egret.Sprite = new egret.Sprite();
            a.x = 500;
            a.graphics.beginFill(0);
            a.graphics.drawRect(0, 0, 20, 20);
            a.graphics.endFill();
            a.touchEnabled = true;
            a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAClick, this);
            this.addChild(a);

            this.msgManager = junyou.hqg.MessageManager.getInstance();
            // this.msgManager.initContainer(this);
        }

        private onAClick(e: egret.TouchEvent) {
            //  this.plist.selectedIndex = 3;
            // this.msgManager.addMessage(["11111111111111111111111111111111111111111111111111","222222222222222222222222222222222222222222222222222222","333333333333333333333333333333333333333333333333333333333333333333333333333"])
        }

        private i: number = 0;
        private getgSp(): egret.Sprite {
            this.i++;
            var sp: egret.Sprite = new egret.Sprite();
            sp.graphics.beginFill(0x00ff00);
            sp.graphics.drawRect(0, 0, 100, 150);
            sp.graphics.endFill();
            var txt: egret.TextField = new egret.TextField();
            txt.text = this.i.toString();
            sp.addChild(txt);
            return sp;
        }

        private createShapeNumber() {
            let shape: ArtText = <ArtText>SuiResManager.getInstance().createDisplayObject("lib", "bmd.number.example", null);
            this.addChild(shape);
            shape.x = shape.y = 10;
            this._shape = ArtTextUtil.convertTextToNumber(shape);;
            this._shape.useSign = true;
            this._shape.isFloat = false;
            shape.value = -123;
        }

    }
}