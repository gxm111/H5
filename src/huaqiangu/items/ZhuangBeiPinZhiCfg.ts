module junyou.hqg {
    /*-*begin $area1*-*/
    //这里填写类上方的手写内容
    /*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\4.装备\ZhuangBeiPinZhi.xlsx生成
     * 创建时间：2016-07-15 11:44:58
     **/
    export class ZhuangBeiPinZhiCfg {
        /**
        * 稀有等级
        **/
        public rare: number;
        /**
        * 品质颜色
        **/
        public color: number;
        /**
        * 装备随机属性条目数
        **/
        public randcount: number;
        /**
        * 装备基础属性乘数
        **/
        public multiple: number;

        /*-*begin $area2*-*/
        //这里填写类里面的手写内容
        /*-*end $area2*-*/
        public decode(data: any[]) {
            let i = 0;
            this.rare = data[i++];
            this.color = data[i++];
            this.randcount = data[i++];
            this.multiple = data[i++];

            /*-*begin $decode*-*/
            //这里填写方法中的手写内容
            /*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
    //这里填写类下发的手写内容
    /*-*end $area3*-*/
}