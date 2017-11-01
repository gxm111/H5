module junyou.hqg {
	/**
	 * description
	 * @author pb
	 */
	export class HeroVO implements Role {
		constructor() {

		}
		/**
			* 角色全局唯一标识
			*/
		public _id: number;

		/**
		 * 角色名字
		 */
		public name: string;
		/**
		 * 服务器标识
		 */
		public sid: number;
		/**
		 * 可选参数 角色等级
		 */
		@bindPropertyEvt(EventConst.HERO_LEVEL_CHANGE)
		public level: number;
		/**
		 * 可选参数 角色经验
		 */
		public exp: number;
		/**
		 * 可选参数 公会全局标识
		 */
		public clanid: number;
		/**
		 * 可选参数 道具列表
		 */
		public items: ItemInfo[];
		/**
		 * 可选参数 主角色和其他随从列表
		 */
		public followers: Follower[];
		/**
		 * 可选参数 游戏币
		 */
		public money: number;
		/**
		 * 可选参数 元宝
		 */
		public gold: number;
		/**
		 * 可选参数 荣誉
		 */
		public honor: number;
		/**
		 * 关卡数据信息
		 */
		public guanka: GuanKaInfo;

		/**
		 * 熔炼值
		 */
		public ronglianzhi: number;
		/**
		 * 关卡数据信息
		 */
		public zhanli: number;

		/**
		 * 门派声望
		 */
		public fame: number;

		/**
		 * 角色的头像配置  
		 * 1:男1;2:女1;3:男2;4:女2;5:男3;6:女3   
		 * 
		 * @type {number}
		 * @memberOf HeroVO
		 */
		public head: number;

		static numAttrArr = ["exp", "money", "gold", "honor", "fame"];

		public checkNeedItems(needItem: any[][], showTips: boolean = true): boolean {
			if (needItem) {
				let len: number = needItem.length;
				for (let i = 0; i < len; i++) {
					if (this.checkNeedItem(needItem[i], showTips)) continue;
					else return false;
				}
			}
			return true;
		}

		public checkNeedItem(needItem: any[], showTips: boolean = true): boolean {
			if (needItem) {
				let result = false;
				let id = needItem[0];
				let count = +needItem[1];
				if (id == DaojuId.GOLD) {
					result = this.checkGold(count, showTips);
				}
				else if (id == DaojuId.MONEY) {
					result = this.checkMoney(count, showTips);
				}
				else if (id == DaojuId.HONOR) {
					result = this.checkHonor(count, showTips);
				}
				else if (id == DaojuId.FAME) {
					result = this.checkFame(count, showTips);
				}
				return result;
			}
			return true;
		}


		public checkGold(count: number, showTips: boolean): boolean {
			let gold = this.gold | 0;
			if (gold < count) {
				if (showTips) {
					CoreFunction.showClientTips(296);
				}
				return false;
			}
			return true;
		}

		public checkMoney(count: number, showTips: boolean): boolean {
			let money = this.money | 0;
			if (money < count) {
				if (showTips) {
					CoreFunction.showClientTips(297);
				}
				return false;
			}
			return true;
		}

		public checkHonor(count: number, showTips: boolean): boolean {
			let honour = this.honor | 0;
			if (honour < count) {
				if (showTips) {
					CoreFunction.showClientTips(298);
				}
				return false;
			}
			return true;
		}

		public checkFame(count: number, showTips: boolean): boolean {
			let fame = this.fame | 0;
			if (fame < count) {
				if (showTips) {
					CoreFunction.showClientTips(299);
				}
				return false;
			}
			return true;
		}

		public getNeedItemsMsg(needItem: any[][]): string {
			let nMsg: string = "";
			if (needItem) {
				let len: number = needItem.length;
				let msg: string = "";
				for (let i = 0; i < len; i++) {
					msg = this.getNeedItemMsg(needItem[i]);
					if (nMsg == "") {
						nMsg += msg;
					}
					else {
						nMsg += "\n" + msg;
					}
				}
			}
			return nMsg;
		}

		public getNeedItemMsg(needItem: any[]): string {
			if (needItem) {
				let id: number;
				let count: number;
				let value: number = 0;
				let countStr: string;
				id = needItem[0];
				count = +needItem[1];
				if (id == DaojuId.FAME) {
					value = this.fame | 0;
					countStr = LangUtil.getMsg(300, count);
				}
				else if (id == DaojuId.HONOR) {
					value = this.honor | 0;
					countStr = LangUtil.getMsg(301, count);
				}
				else if (id == DaojuId.GOLD) {
					value = this.gold | 0;
					countStr = LangUtil.getMsg(302, count);
				}
				else if (id == DaojuId.MONEY) {
					value = this.money | 0;
					countStr = LangUtil.getMsg(303, count);
				}
				if (value < count) {
					return LangUtil.getMsg(214, countStr);
				}
				else {
					return LangUtil.getMsg(216, countStr);
				}
			}
			return "";
		}

		/**
		 * 物品最终结果
		 * 
		 * @param {ItemsResult} result
		 * @param {ItemsService} itemsService
		 * 
		 * @memberOf HeroVO
		 */
		public itemsResult(result: ItemsResult, itemsService: ItemsService) {
			if (result) {
				//最终的物品变化
				itemsService.updateItems(result.items);
				//新增的道具奖励
				itemsService.addItems(result.newItems);
				//最终的各种数值属性值
				let numAttrArr = HeroVO.numAttrArr;
				let len = numAttrArr.length;
				let numAttr: string;
				let value: number;
				for (let j = 0; j < len; j++) {
					numAttr = numAttrArr[j];
					value = +result[numAttr];
					if (!isNaN(value)) {
						this[numAttr] = value;
					}
				}
			}
		}



	}
}