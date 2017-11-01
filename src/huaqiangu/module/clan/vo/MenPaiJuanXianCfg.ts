module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\10.门派\MenPaiJuanXian.xlsx生成
     * 创建时间：2016-09-28 17:39:29
     **/
    export class MenPaiJuanXianCfg {
			/**
			* 捐献标识
			**/
			public id: number;
			/**
			* 捐献道具id
			**/
			public needitem: any[];
			/**
			* 获得公会声望
			**/
			public fame: number;
			/**
			* 获得资源
			**/
			public res: number;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
		/**
		 * 是否已捐献
		 * 
		 * @type {boolean}
		 * @memberOf MenPaiJuanXianCfg
		 */
		public state: boolean;
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;

			this.id = data[i++];
			this.needitem = data[i++];
			this.fame = data[i++];
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