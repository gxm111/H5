module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\10.门派\MenPaiLevel.xlsx生成
     * 创建时间：2016-09-27 14:25:20
     **/
    export class MenPaiLevelCfg {
			/**
			* 等级
			**/
			public level: number;
			/**
			* 成员上限
			**/
			public maxnum: string;
			/**
			* 升级所需资源
			**/
			public res: number;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;

			this.level = data[i++];
			this.maxnum = data[i++];
			this.res = data[i++];

/*-*begin $decode*-*/
//这里填写方法中的手写内容
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}