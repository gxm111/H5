module junyou.game {


	/**
	 * 模型(纸娃娃)渲染器
	 */
    export class UnitRender extends BaseRender {

        /**
         * 人物容器转向时候，对应的scaleX，或者matrix的a
         */
        public static FACE_SCALE_X: { [index: number]: number } =
        {
           /*↓*/ 0: 1,
           /*↘*/ 1: 1,
           /*→*/ 2: 1,
           /*↗*/ 3: 1,
           /*↑*/ 4: 1,
           /*↖*/ 5: -1,
           /*←*/ 6: -1,
           /*↙*/ 7: -1
        }

        /**
         * 朝向对应的帧序列
         */
        public static FACE_DIRECTION: number[] = [
			/*0*/0,
			/*1*/1,
			/*2*/2,
			/*3*/3,
			/*4*/4,
			/*5*/3,
			/*6*/2,
			/*7*/1];

        public faceTo: number = 0;

        /**单位**/
        protected unit: Unit;

        public actionInfo: IRenderAction;

        public model: egret.DisplayObjectContainer;

        protected nextRenderTime: number = 0;

        protected renderedTime: number = 0;

        constructor(unit: Unit) {
            super();
            this.unit = unit;
            this.resetTime(Global.now);
        }

        public resetTime(now: number) {
            this.renderedTime = now;
            this.nextRenderTime = now;
        }

        /**
         * 处理数据
         * 
         * @param {number} now 时间戳
         */
        public doData(now: number) {
            var actionInfo = this.actionInfo;
            if (actionInfo) {
                this.onData(actionInfo, now);
            }
        }

        public render(now: number) {
            var actionInfo = this.actionInfo;
            if (actionInfo) {
                this.onData(actionInfo, now);
                this.doRender(now);
            }
        }

        clearRes() {
            //清空显示
            for (let res of <ResourceBitmap[]>this.model.$children) {
                res.bitmapData = undefined;
            }
        }

        renderFrame(frame: FrameInfo, now: number) {
            if (frame) {
                if (frame.d == -1) {
                    this.model.scaleX = UnitRender.FACE_SCALE_X[this.faceTo];
                    this.d = UnitRender.FACE_DIRECTION[this.faceTo];
                }
                else {
                    this.d = frame.d;
                }
                this.f = frame.f;
                this.a = frame.a;
            }
            //渲染
            for (let res of <ResourceBitmap[]>this.model.$children) {
                res.draw(this, now);
            }
            this.unit.onRenderFrame(now);
        }

        dispatchEvent(event: string, now: number) {
            this.unit.dispatchEvent(event, now);
        }

        doComplete(now: number) {
            this.unit.playComplete(now);
        }

        public dispose() {
            this.unit = undefined;
        }
    }

}
