module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\5.角色外显\JueSeWaiXian.xlsx生成
     * 创建时间：2016-06-28 18:25:32
     **/
    export class JueSeWaiXianCfg {
            /**
            * 外显id
            **/
            public id: number;
            /**
            * 男性角色路径标识
            **/
            public res1: string;
            /**
            * 女性角色路径标识
            **/
            public res2: string;
            /**
            * 外显类型
            **/
            public type: number;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
/*-*end $area2*-*/
        public decode(data:any[]){
            let i = 0;
          this.id = data[i++];
          this.res1 = data[i++];
          this.res2 = data[i++];
          this.type = data[i++];

/*-*begin $decode*-*/
//这里填写方法中的手写内容
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}