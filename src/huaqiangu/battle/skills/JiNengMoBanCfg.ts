module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\6.技能表\JiNengMoBan.xlsx生成
     * 创建时间：2016-06-28 18:25:32
     **/
    export class JiNengMoBanCfg {
            /**
            * 模板标识
            **/
            public id: number;
            /**
            * 施法者动作id
            **/
            public action: number;
            /**
            * 刀光资源
            **/
            public daoguang: string;
            /**
            * 起始角色特效
            **/
            public sani: string;
            /**
            * 起始角色特效，人物下层
            **/
            public sani1: string;
            /**
            * 起始音效
            **/
            public sound: string;
            /**
            * 起始目标特效
            **/
            public tani: string;
            /**
            * 起始目标特效，人物下层
            **/
            public tani1: string;
            /**
            * 受创特效
            **/
            public hani: string;
            /**
            * 对应技能处理器
            **/
            public opid: number;
            /**
            * 参数0
            **/
            public data0: any;
            /**
            * 参数1
            **/
            public data1: any;
            /**
            * 参数2
            **/
            public data2: any;
            /**
            * 参数3
            **/
            public data3: any;
            /**
            * 参数4
            **/
            public data4: any;
            /**
            * 参数5
            **/
            public data5: any;
            /**
            * 参数6
            **/
            public data6: any;
            /**
            * 参数7
            **/
            public data7: any;
            /**
            * 参数8
            **/
            public data8: any;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
/*-*end $area2*-*/
        public decode(data:any[]){
            let i = 0;
          this.id = data[i++];
          this.action = data[i++];
          this.daoguang = data[i++];
          this.sani = data[i++];
          this.sani1 = data[i++];
          this.sound = data[i++];
          this.tani = data[i++];
          this.tani1 = data[i++];
          this.hani = data[i++];
          this.opid = data[i++];
          this.data0 = data[i++];
          this.data1 = data[i++];
          this.data2 = data[i++];
          this.data3 = data[i++];
          this.data4 = data[i++];
          this.data5 = data[i++];
          this.data6 = data[i++];
          this.data7 = data[i++];
          this.data8 = data[i++];

/*-*begin $decode*-*/
//这里填写方法中的手写内容
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}