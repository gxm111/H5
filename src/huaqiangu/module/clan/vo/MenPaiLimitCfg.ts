module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\10.门派\MenPaiLimit.xlsx生成
     * 创建时间：2016-09-28 16:44:04
     **/
    export class MenPaiLimitCfg {
			/**
			* 限制标识
			**/
			public id: number;
			/**
			* 限制条件名
			**/
			public name: string;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
		public value: number;
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;

			this.id = data[i++];
			this.name = data[i++];

/*-*begin $decode*-*/
//这里填写方法中的手写内容
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}