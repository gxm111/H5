module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\8.关卡\GuanKa.xlsx生成
     * 创建时间：2016-10-13 11:06:37
     **/
	export class GuanKaCfg {
		/**
		* 关卡标识
		**/
		public id: number;
		/**
		* 关卡名字
		**/
		public name: string;
		/**
		* 挑战BOSS，需要完成波数
		**/
		public waves: number;
		/**
		* 关卡中单位时间获得的经验
		**/
		public exp: number;
		/**
		* 关卡中单位时间得到的游戏币
		**/
		public money: number;
		/**
		* 关卡中单位时间得到的组包id
		**/
		public zubao: number;

		/*-*begin $area2*-*/
		//这里填写类里面的手写内容
		/*-*end $area2*-*/
		public decode(data: any[]) {
			let i = 0;

			this.id = data[i++];
			this.name = data[i++];
			this.waves = data[i++];
			this.exp = data[i++];
			this.money = data[i++];
			this.zubao = data[i++];

			/*-*begin $decode*-*/
			//这里填写方法中的手写内容
			/*-*end $decode*-*/
		}
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}