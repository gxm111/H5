/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A7%92%E8%89%B2/%E4%BC%99%E4%BC%B4%E5%B1%9E%E6%80%A7%E5%8F%98%E5%8C%96 生成
 * 生成时间 2016-08-23 16:35:16
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class RoleService extends junyou.mvc.Service {
		constructor() {
			super("RoleService");
		}

		onRegister() {
			super.onRegister();
			this.regMsg(5, 10200);
			this.regHandler(this.expChange, 10200);
			this.regMsg(6, 10201);
			this.regHandler(this.levelChange, 10201);
			this.regMsg(6, 10202);
			this.regHandler(this.goldChange, 10202);
			this.regMsg(5, 10203);
			this.regHandler(this.moneyChange, 10203);
			this.regMsg(6, 10203);
			this.regHandler(this.honourChange, 10203);
			this.regMsg(6, 10204);
			this.regHandler(this.rongLianChange, 10204);
			this.regMsg("XAttrChange_S2C", 10205);
			this.regHandler(this.xAttrChange, 10205);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			this.initXattr();
			this.herovo = Core.$hero;
			/*-*end $onRegister*-*/
		}

		private initXattr() {
			this.xattrBySlot = [];
			let temp = { maxhp: 0, wugong: 0, wufang: 0, fagong: 0, fafang: 0, mingzhong: 0, shanbi: 0, baoji: 0, renxing: 0, bisha: 0, chuantou: 0, shenfa: 0 };
			this.xattrBySlot[0] = <XAttr>{};
			this.xattrBySlot[1] = <XAttr>{};
			this.xattrBySlot[2] = <XAttr>{};
			let xattar;
			for (let i = 0; i < 3; i++) {
				xattar = this.xattrBySlot[i];
				for (let key in temp) {
					xattar[key] = temp[key];
				}
			}
		}

		public roleXAttr(_slot: number) {
			this.send(205, _slot, 6);

		}
		protected expChange = (data: NetData) => {
			let _exp: number = <any>data.data;
			/*-*begin expChange*-*/
			//这里填写方法中的手写内容
			this.herovo.exp = _exp;
			dispatch(EventConst.HERO_LEVEL_CHANGE);
			/*-*end expChange*-*/
		}
		protected levelChange = (data: NetData) => {
			let _level: number = <any>data.data;
			/*-*begin levelChange*-*/
			//这里填写方法中的手写内容
			this.herovo.level = _level;
			dispatch(EventConst.HERO_LEVEL_CHANGE);
			/*-*end levelChange*-*/
		}
		protected goldChange = (data: NetData) => {
			let _gold: number = <any>data.data;
			/*-*begin goldChange*-*/
			//这里填写方法中的手写内容
			this.herovo.gold = _gold;
			dispatch(EventConst.HERO_GOLD_CHANGE);
			/*-*end goldChange*-*/
		}
		protected moneyChange = (data: NetData) => {
			let _money: number = <any>data.data;
			/*-*begin moneyChange*-*/
			//这里填写方法中的手写内容
			this.herovo.money = _money;
			dispatch(EventConst.HERO_MONEY_CHANGE);
			/*-*end moneyChange*-*/
		}
		protected honourChange = (data: NetData) => {
			let _honour: number = <any>data.data;
			/*-*begin honourChange*-*/
			//这里填写方法中的手写内容
			this.herovo.honor = _honour;
			dispatch(EventConst.HERO_HONOR_CHANGE);
			/*-*end honourChange*-*/
		}
		protected rongLianChange = (data: NetData) => {
			let _ronglian: number = <any>data.data;
			/*-*begin rongLianChange*-*/
			//这里填写方法中的手写内容
			/*-*end rongLianChange*-*/
		}
		protected xAttrChange = (data: NetData) => {
			let msg: XAttrChange_S2C = <XAttrChange_S2C>data.data;
			/*-*begin xAttrChange*-*/
			//这里填写方法中的手写内容
			let xattr = this.xattrBySlot[msg.slot];
			let temp = msg.xattr;
			for (let key in temp) {
				xattr[key] = temp[key];
			}
			dispatch(EventConst.HERO_XATTR_CHANGE);
			/*-*end xAttrChange*-*/
		}
		/*-*begin $area2*-*/
		//这里填写类里面的手写内容
		public static NAME: string = "RoleService";

		public xattrBySlot: { [index: number]: XAttr };

		private herovo:HeroVO;
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}