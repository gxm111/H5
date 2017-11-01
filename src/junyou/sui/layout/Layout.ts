module junyou.sui {
	/**
	 *
	 * @author 3tion
	 *
	 */
    export class Layout {

        /**
         * 垂直——上
         * 
         * @static
         * @type {number}
         */
        public static TOP: number = 0b0100;

        /**
         * 垂直——中
         * 
         * @static
         * @type {number}
         */
        public static MIDDLE: number = 0b1000;

        /**
         * 垂直——下
         * 
         * @static
         * @type {number}
         */
        public static BOTTOM: number = 0b1100;

        /**
         * 水平——左
         * 
         * @static
         * @type {number}
         */
        public static LEFT: number = 0b01;

        /**
         * 水平——中
         * 
         * @static
         * @type {number}
         */
        public static CENTER: number = 0b10;

        /**
         * 水平——右
         * 
         * @static
         * @type {number}
         */
        public static RIGHT: number = 0b11;

        /**
         * 垂直方向的位运算mask
         * 
         * @static
         * @type {number}
         */
        public static VERTICAL_MASK: number = 0b1100;

        /**
         * 水平方向位运算mask
         * 
         * @static
         * @type {number}
         */
        public static HORIZON_MASK: number = 0b11;

        /**
         * 左上
         */
        public static TOP_LEFT: number = Layout.TOP | Layout.LEFT;

        /**
         * 中上
         */
        public static TOP_CENTER: number = Layout.TOP | Layout.CENTER;

        /**
         * 右上
         */
        public static TOP_RIGHT: number = Layout.TOP | Layout.RIGHT;

        /**
         * 左中
         */
        public static MIDDLE_LEFT: number = Layout.MIDDLE | Layout.LEFT;

        /**
         * 中心
         */
        public static MIDDLE_CENTER: number = Layout.MIDDLE | Layout.CENTER;

        /**
         * 右中
         */
        public static MIDDLE_RIGHT: number = Layout.MIDDLE | Layout.RIGHT;

        /**
         * 左下
         */
        public static BOTTOM_LEFT: number = Layout.BOTTOM | Layout.LEFT;

        /**
         * 中下
         */
        public static BOTTOM_CENTER: number = Layout.BOTTOM | Layout.CENTER;

        /**
         * 右下
         */
        public static BOTTOM_RIGHT: number = Layout.BOTTOM | Layout.RIGHT;

        /**
         * 对DisplayObject，基于父级进行排布
         * 
         * @static
         * @ param {egret.DisplayObject} dis 要布局的可视对象
         * @ param {number} layout 布局方式
         * @ param {number} hoffset 在原布局基础上，水平方向的再偏移量（内部运算是"+",向左传负）
         * @ param {number} voffset 在原布局基础上，垂直方向的再偏移量（内部运算是"+",向上传负）
         * @ param {boolean} [innerV=true] 垂直方向上基于父级内部
         * @ param {boolean} [innerH=true] 水平方向上基于父级内部
         * @ param {egret.DisplayObjectContainer} [parent] 父级容器，默认取可视对象的父级
         */
        public static layout(dis: egret.DisplayObject, layout: number, hoffset:number=0,voffset:number=0,innerV = true, innerH = true, parent?: egret.DisplayObjectContainer) {
            let parentWidth = 0;
            let parentHeight = 0;
            let posx = 0;
            let posy = 0;
            if (!parent) {
                parent = dis.parent;
            }
            if (parent) {
                if(is (parent,egret.Stage)){
                    parentWidth = (<egret.Stage>parent).stageWidth;
                    parentHeight = (<egret.Stage>parent).stageHeight;
                }else{
                    parentWidth = parent.width;
                    parentHeight = parent.height;
                }
                
            }
            let vertical = layout & Layout.VERTICAL_MASK;
            let horizon = layout & Layout.HORIZON_MASK;
            switch (vertical) {
                case Layout.TOP:
                    if (innerV) {
                        posy = 0;
                    }
                    else {
                        posy = -dis.height;
                    }
                    break;
                case Layout.MIDDLE: // 不支持非innerV
                    posy = parentHeight - dis.height >> 1;
                    break;
                case Layout.BOTTOM:
                    if (innerV) {
                        posy = parentHeight - dis.height;
                    }
                    else {
                        posy = parentHeight;
                    }
                    break;
            }

            switch (horizon) {
                case Layout.LEFT:
                    if (innerH) {
                        posx = 0;
                    }
                    else {
                        posx = -dis.width;
                    }
                    break;
                case Layout.CENTER: // 不支持非innerH
                    posx = parentWidth - dis.width >> 1;
                    break;
                case Layout.RIGHT:
                    if (innerH) {
                        posx = parentWidth - dis.width;
                    }
                    else {
                        posx = parentWidth;
                    }
                    break;
            }
            posx = posx+hoffset;
            posy = posy+voffset;
            dis.x = posx;
            dis.y = posy;
        }

    }
}
