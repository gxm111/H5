/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A3%85%E5%A4%87%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-09-01 16:14:34
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class ItemsService extends junyou.mvc.Service {
		constructor() {
			super("ItemsService");
		}

		onRegister() {
			super.onRegister();
			this.regMsg("DressSuccess_S2C", 10100);
			this.regHandler(this.dressSuccess, 10100);
			this.regMsg(6, 10101);
			this.regHandler(this.dressFailed, 10101);
			this.regMsg("CountChange_S2C", 10102);
			this.regHandler(this.countChange, 10102);
			this.regMsg(6, 10103);
			this.regHandler(this.useFailed, 10103);
			this.regMsg("Add_S2C", 10104);
			this.regHandler(this.add, 10104);
			this.regMsg(6, 10105);
			this.regHandler(this.addNumSuccess, 10105);
			this.regMsg(6, 10106);
			this.regHandler(this.addNumFailed, 10106);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			//PBMessageUtils.ctorByName["ItemInfo"] = ItemVO;
			let C = game.ConfigKey;
			let daojus: { [index: string]: DaoJuCfg } = DataLocator.getData(C.DaoJu);
			let equips: { [index: string]: ZhuangBeiCfg } = DataLocator.getData(C.ZhuangBei);
			let allItems: { [index: string]: DaoJuCfg } = {};
			for (let id in equips) {
				allItems[id] = equips[id];
			}
			for (let id in daojus) {
				if (DEBUG) {
					if (id in allItems) {
						ThrowError(`装备表和道具表中有重复id[${id}]的配置`, 2);
					}
				}
				allItems[id] = daojus[id];
			}
			this.allItems = allItems;
			DataLocator.setData(C.AllItems, allItems);
			//背包附加数据
			this.maxBagNum = DataLocator.getExtra(C.DaoJu, "maxBagNum") || 300;
			this.onceOpenGold = DataLocator.getExtra(C.DaoJu, "onceOpenGold") || 3;
			this.onceOpenNum = DataLocator.getExtra(C.DaoJu, "onceOpenNum") || 4;
			/*-*end $onRegister*-*/
		}

		public dress(_Dress_C2S: Dress_C2S) {
			this.send(100, _Dress_C2S, "Dress_C2S");
		}
		public use(_Use_C2S: Use_C2S) {
			this.send(101, _Use_C2S, "Use_C2S");
		}
		public addNum(_id: number) {
			this.send(102, _id, 6);
		}
		protected dressSuccess = (data: NetData) => {
			let msg: DressSuccess_S2C = <DressSuccess_S2C>data.data;
			/*-*begin dressSuccess*-*/
			//这里填写方法中的手写内容
			let vo = <EquVO>this.byId[msg.id];
			if (vo) {
				//将身上的和背包里的物品的slot重新赋值，并更新byslot

				let arr = this.bySlot[SlotType.ROLE];
				if (!arr) {
					arr = [];
				}

				let bag = this.bySlot[SlotType.BAG];
				if (!bag) {
					bag = [];
				}
				let len = arr.length;
				let temp: EquVO;
				for (let i = 0; i < len; i++) {
					temp = <EquVO>arr[i];
					if (temp) {
						if (temp.part == vo.part) {
							arr.splice(i, 1);
							temp.slot = 0;
							bag.push(temp);
							break;
						}
					}
				}
				let index: number = bag.indexOf(vo);
				if (index != -1) {
					bag.splice(index, 1);
				}
				vo.slot = msg.slot;
				arr.push(vo);
			}
			dispatch(EventConst.DRESS_EQUIP_RTN);
			/*-*end dressSuccess*-*/
		}
		protected dressFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin dressFailed*-*/
			//这里填写方法中的手写内容
			/*-*end dressFailed*-*/
		}
		protected countChange = (data: NetData) => {
			let msg: CountChange_S2C = <CountChange_S2C>data.data;
			/*-*begin countChange*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let id: number;
				let count: number;
				let items = msg.items;
				if (items) {
					items.forEach(item => {
						if (item) {
							id = item.id;
							count = item.count;
							if (!count) {
								this.deleteItem(id);
							}
							else {
								this.updateItem(item);
							}
						}
					});
					dispatch(EventConst.BAG_ITEMS_CHANGE);
				}
			}
			/*-*end countChange*-*/
		}
		protected useFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin useFailed*-*/
			//这里填写方法中的手写内容
			if (_state) {
				CoreFunction.showServerTips(201);
			}
			else {
				CoreFunction.showServerTips(202);
			}
			/*-*end useFailed*-*/
		}
		protected add = (data: NetData) => {
			let msg: Add_S2C = <Add_S2C>data.data;
			/*-*begin add*-*/
			//这里填写方法中的手写内容
			if (msg) {
				this.addItems(msg.items);
			}
			/*-*end add*-*/
		}
		protected addNumSuccess = (data: NetData) => {
			let _id: number = <any>data.data;
			/*-*begin addNumSuccess*-*/
			//这里填写方法中的手写内容
			if (_id > this.totalBagNum) {
				Core.$hero.gold -= this.onceOpenGold;
				this.totalBagNum = _id;
				dispatch(EventConst.BAG_NUM_CHANGE);
			}
			/*-*end addNumSuccess*-*/
		}
		protected addNumFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin addNumFailed*-*/
			//这里填写方法中的手写内容
			if (_state) {
				CoreFunction.showServerTips(203);
			}
			else {
				CoreFunction.notEnoughGold();
			}
			/*-*end addNumFailed*-*/
		}
		/*-*begin $area2*-*/
		//这里填写类里面的手写内容
		/*格位类型为key*/
		public bySlot: { [index: number]: ItemVO<DaoJuCfg>[] } = {};
		/*id为key*/
		public byId: { [index: number]: ItemVO<DaoJuCfg> } = {};
		/*物品类型为key*/
		public byType: { [index: number]: ItemVO<DaoJuCfg>[] } = {};
		/*装备品质为key*/
		public byRare: { [index: number]: EquVO[] } = {};
		/*装备部位为key*/
		public byPart: { [index: number]: EquVO[] } = {};
		/*装备品质数组 排序从低到高*/
		public rareArr: number[] = [0, 1, 2, 3, 4, 5];

		public totalBagNum: number = 120;
		public maxBagNum: number;
		public onceOpenGold: number;
		public onceOpenNum: number;

		private allItems: { [index: string]: DaoJuCfg };

		/**
		 * 批量新增物品
		 * 
		 * @param {ItemInfo[]} [arr]
		 * @param {boolean} [fire=true]	是否派发事件
		 * 
		 * @memberOf ItemsService
		 */
		public addItems(arr?: ItemInfo[], fire: boolean = true) {
			if (arr) {
				arr.forEach(itemInfo => {
					this.addItem(itemInfo);
				});
				if (fire) {
					dispatch(EventConst.BAG_ITEMS_CHANGE);
				}
			}
		}

		/**
		 * 新增物品
		 * 
		 * @param {ItemInfo} itemInfo
		 * @returns
		 * 
		 * @memberOf ItemsService
		 */
		addItem(itemInfo: ItemInfo) {
			if (itemInfo) {
				let bySlot = this.bySlot;
				let byId = this.byId;
				let byType = this.byType;
				let byRare = this.byRare;
				let byPart = this.byPart;
				let allItems = this.allItems;
				let item = this.generateItemVO(itemInfo.cfgid);
				if (!item) {
					ThrowError(`无法找到指定的物品配置[${itemInfo.cfgid}]`);
					return;
				}
				let vo = byId[itemInfo.id];
				if (vo) {
					ThrowError(`客户端新增物品时，新产生的物品的id和之前的物品重复，物品id:` + itemInfo.id, 1);
				}
				itemInfo.copyto(item);
				//按slot存
				let slots = bySlot[item.slot];
				if (!slots) {
					bySlot[item.slot] = slots = [];
				}
				slots.push(item);
				//按id存
				byId[item.id] = item;
				//按type存
				let type = item.type;
				let typeArr = byType[type];
				if (!typeArr) {
					byType[type] = typeArr = [];
				}
				typeArr.push(item);
				//按rare存 
				let rare = item.rare;
				let rareArr = byRare[rare];
				if (type == ItemType.Euipment) {
					if (!rareArr) {
						byRare[rare] = rareArr = [];
					}
					rareArr.push(<EquVO>item);
				}
				this.rareArr.sort();
				//按part存 
				if (is(item, EquVO)) {
					let part = (<ZhuangBeiCfg>item.cfg).part;
					let partArr = byPart[part];
					if (!partArr) {
						byPart[part] = partArr = [];
					}
					partArr.push(<EquVO>item);
				}
			}
		}

		/**
		 * 批量物品数量变更
		 * 
		 * @param {ItemCount[]} [arr]
		 * @param {boolean} [fire=true]
		 * 
		 * @memberOf ItemsService
		 */
		public updateItems(arr?: ItemCount[], fire: boolean = true) {
			if (arr) {
				arr.forEach(itemCount => {
					this.updateItem(itemCount);
				});
				if (fire) {
					dispatch(EventConst.BAG_ITEMS_CHANGE);
				}
			}
		}

		/**
		 * 物品数量变更
		 * 
		 * @param {ItemCount} itemCount
		 * 
		 * @memberOf ItemsService
		 */
		updateItem(itemCount: ItemCount) {
			if (itemCount) {
				let id = itemCount.id;
				let count = itemCount.count;
				let vo = this.byId[id];
				if (vo) {
					vo.count = count;
					if (!count) {
						this.deleteItem(id);
					}
				}
			}
		}

		/**
		 * 批量删除多个物品
		 * 
		 * @param {number[]} ids
		 */
		public deleteItems(ids: number[], fire: boolean = true) {
			if (ids) {
				ids.forEach(id => {
					this.deleteItem(id);
				});
				if (fire) {
					dispatch(EventConst.BAG_ITEMS_CHANGE);
				}
			}
		}

		/**
		 * 根据id删除物品
		 * 
		 * @param {number} id
		 */
		deleteItem(id: number) {
			let vo = this.byId[id];
			if (vo) {
				delete this.byId[id];
				let arr = this.bySlot[vo.slot];
				if (arr) {
					arr.remove(vo);
				}
				arr = this.byType[vo.type];
				if (arr) {
					arr.remove(vo);
				}
				if (vo.type == ItemType.Euipment) {
					arr = this.byRare[vo.rare];
					if (arr) {
						arr.remove(vo);
					}
					let part = (<EquVO>vo).part;
					arr = this.byPart[part];
					if (arr) {
						arr.remove(vo);
					}
				}
			}
		}

		/**
         * 遍历所有物品，使用handler处理
         * 
         * @param {{ (item: ItemVO<DaoJuCfg>, ...args) }} handler 遍历时使用的函数
         * @param {number} [slotType=0] 格位类型
         * @param otherParams 其他参数
         * @returns 
         */
        public forEach(handler: { (item: ItemVO<DaoJuCfg>, ...args) }, slotType: number = SlotType.BAG, ...otherParams) {
            let arr = this.bySlot[slotType];
            if (!arr) {
                ThrowError("无法找到指定的格位数据");
                return;
            }
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let item = arr[i];
                handler(item, ...otherParams);
            }
        }

        /**
         * 遍历物品列表，检查是否有符合条件
         * 
         * @param {{ (item: ItemVO<DaoJuCfg>, ...args) }} handler 检测函数
         * @param {number} [slotType=0] 格位类型
         * @param otherParams 其他参数
         * @returns true        成功通过检查
         *          false       所有道具未通过检查
         */
        public checkFor(handler: { (item: ItemVO<DaoJuCfg>, ...args) }, slotType: number = SlotType.BAG, ...otherParams) {
            let arr = this.bySlot[slotType];
            if (!arr) {
                ThrowError("无法找到指定的格位数据");
                return false;
            }
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let item = arr[i];
                if (handler(item, ...otherParams)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 获取符合条件的物品总数量
         * 
         * @param {{ (item: ItemVO<DaoJuCfg>, ...args) }} filter 过滤器
         * @param {number} [slotType=0] 格位类型
         * @param otherParams 其他参数
         * @returns {number} 符合物品的数量
         */
        public getCount(filter: { (item: ItemVO<DaoJuCfg>, ...args) }, slotType: number = SlotType.BAG, ...otherParams) {
            let arr = this.bySlot[slotType];
            if (!arr) {
                ThrowError("无法找到指定的格位数据");
                return 0;
            }
            let count = 0;
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let item = arr[i];
                if (filter(item, ...otherParams)) {
                    count++;
                }
            }
            return count;
        }

        /**
         * 遍历物品列表，检查是否有符合条件的物品
         * 
         * @param {{ (item: ItemVO<DaoJuCfg>, ...args) }} handler 检测函数
         * @param {number} [slotType=0] 格位类型
         * @param otherParams 其他参数
         * @returns {ItemBase}          符合条件的第一个物品
         *          undefined                所有道具未通过检查
         */
        public find(handler: { (item: ItemVO<DaoJuCfg>, ...args) }, slotType: number = SlotType.BAG, ...otherParams) {
            let arr = this.bySlot[slotType];
            if (!arr) {
                ThrowError("无法找到指定的格位数据");
                return;
            }
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let item = arr[i];
                if (handler(item, ...otherParams)) {
                    return item;
                }
            }
            return;
        }

		/**
		 * 获取背包空格位剩余数量
		 * 
		 * @param {number} [slotType=0] 格位类型
		 * @returns {number} 空格位剩余数量
		 */
		public getEmptyCount(): number {
			let arr = this.bySlot[SlotType.BAG];
            let len = arr ? arr.length : 0;
			return this.totalBagNum - len;
		}

		/**
		 * 根据物品cfgId生成ItemVO
		 * 
		 * @param {number} cfgId
		 * @param {number} [count=1]
		 * @returns {ItemVO<DaoJuCfg>}
		 */
		public generateItemVO(cfgId: number): ItemVO<DaoJuCfg> {
			let cfg = this.allItems[cfgId];
			if (!cfg) {
				return;
			}
			let itemVO: ItemVO<DaoJuCfg>;
			if (cfg.type == 0) {
				itemVO = new EquVO();
			}
			else {
				itemVO = new ItemVO<DaoJuCfg>();
			}
			itemVO.cfg = cfg;
			return itemVO;
		}

		/**
		 * 生成显示用临时对象
 		 * @param {number} cfgId
 		 * @param {number} [count]
 		 * @returns
		 */
		public generateShowItem(cfgId: number, count?: number) {
			let cfg = this.allItems[cfgId];
			if (!cfg) {
				return;
			}
			let item = <GoodsSlotItem>{};
			item.cfg = cfg;
			item.count = count || 1;
			return item;
		}

		/**
		 * 根据配置 needitem 生成显示用的数组
		 * 
		 * @param {any[][]} items
		 * @param {GoodsSlotItem[]} output
		 * @param {string} [errorPrefix]
		 * 
		 * @memberOf ItemsService
		 */
		public generateShowItems(items: any[][], output: GoodsSlotItem[], errorPrefix?: string) {
			if (DEBUG) {
				errorPrefix = errorPrefix || "";
			}
			if (items) {
				items.forEach(item => {
					if (item) {
						let cfgId = item[0];
						let itemVO = this.generateShowItem(cfgId, +item[1]);
						if (itemVO) {
							output.push(itemVO);
						}
						else if (DEBUG) {
							errorPrefix += "找不到物品配置表中对应物品， 物品配置id为:" + cfgId + "的物品", 2;
						}
					}
				});
			}
			else if (DEBUG) {
				errorPrefix = "物品奖励配置为空";
			}
			if (DEBUG) {
				if (errorPrefix) {
					ThrowError(errorPrefix);
				}
			}
		}

		/**
		 * 格位列表显示辅助
		 * 
		 * @param {any[][]} items
		 * @param {GoodsSlotItem[]} output
		 * @param {GoodsItemSlot<GoodsSlotItem>[]} slotArr
		 * @param {Boolean} [hideNull=true]
		 * 
		 * @memberOf ItemsService
		 */
		public solveSlotsData(items: any[][], output: GoodsSlotItem[], slotArr: GoodsItemSlot<GoodsSlotItem>[], hideNull: Boolean = true) {
			this.generateShowItems(items, output);
			if (output) {
				let iLen = output.length;
				let sLen = slotArr.length;
				if (sLen >= iLen) {
					let slot;
					let itemVO;
					for (let i = 0; i < sLen; i++) {
						slot = slotArr[i];
						itemVO = output[i];
						slot.setData(itemVO);
						if (itemVO) {
							slot.visible = true;
						}
						else if (hideNull) {
							slot.visible = false;
						}
					}
				}
				else if (DEBUG) {
					ThrowError("物品格位数量小于配置奖励数量", 2);
				}
			}
			else if (DEBUG) {
				ThrowError("物品奖励配置为空", 2);
			}
		}

		/**
		 * 获取物品配置
		 * 
		 * @param {number} cfgId
		 * @returns {DaoJuCfg}
		 */
		public getItemCfg(cfgId: number): DaoJuCfg {
			return this.allItems[cfgId];
		}

		public getEquVOByPart(part: number, slotType: number = SlotType.ROLE): EquVO {
			let arr: ItemVO<DaoJuCfg>[] = this.bySlot[slotType];
			if (arr) {
				let len: number = arr.length;
				let vo: EquVO;
				for (let i = 0; i < len; i++) {
					vo = <EquVO>arr[i];
					if (vo && vo.part == part) {
						return vo;
					}
				}
			}
			return;
		}

		public findByType(handler: { (item: EquVO, ...args) }, output: EquVO[], count: number, type: number = ItemType.Euipment, ...otherParams) {
			let arr = this.byType[type];
            if (!arr) {
                ThrowError("无法找到指定的装备数据");
                return;
            }
            let len = arr.length;
			let item: EquVO;
            for (let i = 0; i < len; i++) {
                item = <EquVO>arr[i];
                if (handler(item, ...otherParams)) {
                    output[output.length] = item;
					count--;
					if(!count){
						break;
					}
                }
            }
		}
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}