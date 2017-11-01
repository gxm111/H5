module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\3.物品\DaoJu.xlsx生成
     * 创建时间：2016-09-29 11:26:17
     **/
	export class DaoJuCfg implements junyou.game.IItemCfg {
		/**
		* 道具id
		**/
		public id: number;
		/**
		* 名称
		**/
		public name: string;
		/**
		* 排序
		**/
		public order: number;
		/**
		* 道具图标
		**/
		public icon: string;
		/**
		* 道具稀有等级
		**/
		public rare: number;
		/**
		* 道具需要的最小角色等级
		**/
		public minlevel: number;
		/**
		* 道具的职业需求
		**/
		public needjob: number;
		/**
		* 道具类型<br/>
		* 
		**/
		public type: number;
		/**
		* 最大堆叠数量<br/>
		* 0 为可无限堆叠<br/>
		* >0 为最大堆叠数
		**/
		public maxcount: number;
		/**
		* 是否为数值类型道具
		**/
		public isvalue: boolean;

		/*-*begin $area2*-*/
		/**
				 * 
				 * 参数列表
				 * @type {any[]}
				 */
		public datas: any[];
		/*-*end $area2*-*/
		public decode(data: any[]) {
			let i = 0;
			let local: any = {};
			this.id = data[i++];
			this.name = data[i++];
			this.order = data[i++];
			this.icon = data[i++];
			this.rare = data[i++];
			this.minlevel = data[i++];
			this.needjob = data[i++];
			this.type = data[i++];
			this.maxcount = data[i++] || 1;
			local.data0 = data[i++];
			local.data1 = data[i++];
			local.data2 = data[i++];
			local.data3 = data[i++];
			this.isvalue = !!data[i++];

			/*-*begin $decode*-*/
			let datas = [];
			for (let i = 0; i < 4; i++) {
				datas[i] = local["data" + i];
			}
			this.datas = datas;
			/*-*end $decode*-*/
		}
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}