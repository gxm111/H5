module junyou.sui {
	/**
	 * 导出类型，需要和导出工具的ExportType对应
	 * @author 
	 *
	 */
        export class ExportType {
                /**图片**/
                public static Image = 0;
                /**文本框*/
                public static Text = 1;
                /**复合容器**/
                public static Container = 2;
                /**按钮 */
                public static Button = 3;

                /**九宫图片*/
                public static ScaleBitmap = 5;

                public static ShapeNumber = 6;
                
                public static NumericStepper = 7;
                
                public static Slider = 8;
                
                public static ScrollBar = 9;

                /**进度条**/
                public static ProgressBar = 10;

                public static SlotBg = 11;

                public static ShareBmp = 12;

                public static Slot = 13;
        }
}
