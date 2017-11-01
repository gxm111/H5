/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A3%85%E5%A4%87%E7%86%94%E7%82%BC 生成
 * 生成时间 2016-08-31 12:12:05
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class RongLianService extends junyou.mvc.Service {

		constructor() {
			super("RongLianService");
		}

		onRegister() {
			super.onRegister();
			this.regMsg("RongLianSuccess_S2C", 10120);
			this.regHandler(this.rongLianSuccess, 10120);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			/*this.addProxy(ItemsService.NAME, "itemsService");*/
			/*-*end $onRegister*-*/
		}

		public rongLian(_RongLian_C2S: RongLian_C2S) {
			this.send(120, _RongLian_C2S, "RongLian_C2S");
		}
		protected rongLianSuccess = (data: NetData) => {
			let msg: RongLianSuccess_S2C = <RongLianSuccess_S2C>data.data;
			/*-*begin rongLianSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let equids = msg.equids;
				let ronglianzhi = msg.ronglianzhi;
				let equips = msg.equips;
				let errEquids = msg.errEquids;
				let money = msg.money;
				let tips: string = "";
				let topZhanliVO: EquVO;
				Core.$hero.ronglianzhi += ronglianzhi;
				Core.$hero.money += money;
				let itemsService = this.itemsService;
				itemsService.deleteItems(equids);
				itemsService.addItems(equips);
				itemsService.deleteItems(errEquids);
				if (equips) {
					equips.forEach(itemInfo => {
						let vo = itemsService.byId[itemInfo.id];
						if (vo) {
							tips += vo.getName() + "×" + itemInfo.count + "\n";
						}
						if (!topZhanliVO) {
							topZhanliVO = <EquVO>vo;
						}
						else if (this.compareZhanli(topZhanliVO, <EquVO>vo) == 1) {
							topZhanliVO = <EquVO>vo;
						}
					});
				}
				if (money > 0) {
					tips += LangUtil.getMsg(204, money);
				}
				if (tips.length > 0) {
					CoreFunction.showServerTips(tips);
				}
				dispatch(EventConst.RONGLIAN, topZhanliVO);
			}
			/*-*end rongLianSuccess*-*/
		}
		/*-*begin $area2*-*/
		//这里填写类里面的手写内容
		/*单次熔炼的最大装备数*/
		public static ONCE_NUM: number = 6;

		public static ZHANLI_LOW: number = 0;
		public static ZHANLI_HIGH: number = 1;
		public static ZHANLI_EQUAL: number = 2;

		@d_dependProxy(ServiceName.ItemsService)
		itemsService: ItemsService;

		higherEquVOArr: EquVO[];

		public getRonglianAbleEquips(outputArr: EquVO[], keepHigher: boolean, count: number): EquVO[] {
			this.itemsService.findByType(this.ronglianFilter, outputArr, count, ItemType.Euipment, this, keepHigher, 1 + Core.$hero.followers.length);
			return outputArr;
		}

		public ronglianFilter(item: EquVO, self: RongLianService, keepHigher: boolean, len: number): boolean {
			if (item) {
				if (keepHigher) {
					let part = item.part;
					let num: number = 0;
					let vo: EquVO;
					for (let i = 0; i < len; i++) {
						vo = self.itemsService.getEquVOByPart(part, SlotForFollowers[i]);
						if (self.compareZhanli(vo, item) != RongLianService.ZHANLI_HIGH) {
							num++;
						}
					}
					if (num == len) {
						return true;
					}
					else {
						return false;
					}
				}
				else {
					return true;
				}
			}
			return false;
		}
		/**
		 * 取得可熔炼装备数组
		 * 按品质从低到高
		 * 品质数组在此之前解析排序过
		 * 
		 * @param {boolean} keepHigher 是否保留未开启职业中最高评分装备
		 * @param {number} count 最多取几条
		 * @returns {EquVO[]}
		 */
		/*public getRonglianAbleVOArr(keepHigher: boolean, count: number): EquVO[] {
			let arr: EquVO[] = [];
			let hArr: EquVO[];
			if (keepHigher) {
				this.resetHigherFlag(this.higherEquVOArr);//重置上次标记的较高评分
				hArr = this.higherEquVOArr = this.getHigherEquVOArrAllRole();//取得需要保留的装备列表
			}
			let rareArr = this.itemsService.rareArr;
			let byRare = this.itemsService.byRare;
			let len = rareArr.length;
			let rArr = [];
			let vo: EquVO;
			let rare: number;
			let rLen: number;
			for (let i = 0; i < len; i++) {
				rare = rareArr[i];
				rArr = byRare[rare];
				if (rArr) {
					rLen = rArr.length;
					for (var j = 0; j < rLen; j++) {
						vo = rArr[j];
						if (keepHigher && hArr && hArr.indexOf(vo) != -1) {//需要保留并列表中存在，跳过
							continue;
						}
						arr.pushOnce(vo);
						if (arr.length >= count) {
							return arr;
						}
					}
				}
			}
			return arr;
		}*/

		/**
		 * 将已标记的较高评分重置
		 * 
		 * @param {EquVO[]} arr
		 */
		/*resetHigherFlag(arr: EquVO[]) {
			if (arr) {
				arr.forEach(vo => {
					if (vo) {
						vo.currentHigher = false;
					}
				});
			}
		}*/

		/**
		 * 取比所有角色身上各对应部位战力高的装备
		 * 
		 * @returns {EquVO[]}
		 */
		/*getHigherEquVOArrAllRole(): EquVO[] {
			let arr = [];
			let len = SlotForFollowers.length;
			let hArr: EquVO[];
			let slotType: number;
			for (let i = 0; i < len; i++) {
				slotType = SlotForFollowers[i];
				hArr = this.getHigherEquVOArrAllPart(slotType);
				arr = arr.concat(hArr);
			}
			return arr;
		}*/

		/**
		 * 取比某角色身上装备战力高的装备
		 * 所有部位
		 */
		/*getHigherEquVOArrAllPart(slotType: number): EquVO[] {
			let arr = [];
			let vo: EquVO;
			let topVO: EquVO;
			for (let i: number = 0; i < 12; i++) {
				vo = this.itemsService.getEquVOByPart(i, slotType);
				topVO = this.getHigherEquVOByPart(i, vo);
				if (topVO) {
					arr.pushOnce(topVO);
				}
			}
			return arr;
		}*/

		/**
		 * 取某部位比身上战力高的装备
		 * 
		 * @param {number} part
		 * @param {EquVO} vo
		 * @returns
		 */
		/*getHigherEquVOByPart(part: number, vo: EquVO): EquVO {
			let topVO = this.getTopZhanliEquVOByPart(part);
			if (this.checkHigherZhanli(vo, topVO) == 1) {
				topVO.currentHigher = true;//标记表示当前较高战力
				return topVO;
			}
			return;
		}*/

		/**
		 * 取某部位的最高战力装备
		 * 
		 * @param {number} part
		 * @returns {EquVO}
		 */
		/*getTopZhanliEquVOByPart(part: number): EquVO {
			let arr = this.itemsService.byPart[part];
			if (arr) {
				arr.multiSort(["zhanli"], [true]);//战力降序
				let len: number = arr.length;
				let vo: EquVO;
				for (let i = 0; i < len; i++) {
					vo = arr[i];
					if (!vo.currentHigher) {//取未标记为较高战力的装备
						return vo;
					}
				}
			}
			return;
		}*/

		/**
		 * 比较目标战力和原战力
		 * 0:比原战力低
		 * 1:比原战力高
		 * 2:和原战力同
		 * 
		 * @param {EquVO} originalVO
		 * @param {EquVO} targetVO
		 * @returns
		 */
		compareZhanli(originalVO: EquVO, targetVO: EquVO): number {
			if (!targetVO) {
				return RongLianService.ZHANLI_LOW;
			}
			if (originalVO) {
				if (originalVO.zhanli < targetVO.zhanli) {
					return RongLianService.ZHANLI_HIGH;
				}
				else if (originalVO.zhanli == targetVO.zhanli) {
					return RongLianService.ZHANLI_EQUAL;
				}
				else {
					return RongLianService.ZHANLI_LOW;
				}
			}
			else {
				return RongLianService.ZHANLI_HIGH;
			}
		}
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}