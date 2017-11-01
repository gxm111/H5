module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\10.门派\MenPaiShopItem.xlsx生成
     * 创建时间：2016-09-28 16:43:56
     **/
    export class MenPaiShopItemCfg {
			/**
			* 物品标识
			**/
			public id: number;
			/**
			* 购买的物品
			**/
			public item: any[];
			/**
			* 购买条件<br/>
			* 只允许配置一个
			**/
			public needitem: any[];
			/**
			* 公会单位，每日最大购买,为0时无限制
			**/
			public maxcount: number;
			/**
			* 物品开放最小公会等级
			**/
			public minlevel: number;
			/**
			* 激活条件<br/>
			* 只允许配置一个
			**/
			public needitem1: any[];

/*-*begin $area2*-*/
//这里填写类里面的手写内容
		public count: number = 0;

		/**
		 * 激活状态
		 * 0：未激活，1：已激活
		 * @type {number}
		 * @memberOf MenPaiShopItemCfg
		 */
		public state: number = 0;
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;

			this.id = data[i++];
			this.item = data[i++];
			this.needitem = data[i++];
			this.maxcount = data[i++];
			this.minlevel = data[i++];
			this.needitem1 = data[i++];

/*-*begin $decode*-*/
//这里填写方法中的手写内容
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}