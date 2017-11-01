/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-10-13 16:24:56
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class ClanService extends junyou.mvc.Service {
		constructor() {
			super("ClanService");
		}

		onRegister() {
			super.onRegister();
			this.regMsg("MyClanInfoSuccess_S2C", 10300);
			this.regHandler(this.myClanInfoSuccess, 10300);
			this.regMsg("ClanListSuccess_S2C", 10301);
			this.regHandler(this.clanListSuccess, 10301);
			this.regMsg("ClanCreateSuccess_S2C", 10302);
			this.regHandler(this.clanCreateSuccess, 10302);
			this.regMsg(6, 10303);
			this.regHandler(this.clanCreateFailed, 10303);
			this.regMsg(2, 10304);
			this.regHandler(this.clanNoticeUpdateSuccess, 10304);
			this.regMsg(6, 10305);
			this.regHandler(this.clanNoticeUpdateFailed, 10305);
			this.regMsg("ClanUpgradeSuccess_S2C", 10306);
			this.regHandler(this.clanUpgradeSuccess, 10306);
			this.regMsg(6, 10307);
			this.regHandler(this.clanUpgradeFailed, 10307);
			this.regMsg("ClanJuanxianSuccess_S2C", 10308);
			this.regHandler(this.clanJuanxianSuccess, 10308);
			this.regMsg(6, 10309);
			this.regHandler(this.clanJuanxianFailed, 10309);
			this.regMsg("ClanJoinSuccess_S2C", 10310);
			this.regHandler(this.clanJoinSuccess, 10310);
			this.regMsg("ClanJoinFailed_S2C", 10311);
			this.regHandler(this.clanJoinFailed, 10311);
			this.regMsg("ClanSendHongbaoSuccess_S2C", 10312);
			this.regHandler(this.clanSendHongbaoSuccess, 10312);
			this.regMsg(6, 10313);
			this.regHandler(this.clanSendHongbaoFailed, 10313);
			this.regMsg("ClanBuyInfoSuccess_S2C", 10314);
			this.regHandler(this.clanBuyInfoSuccess, 10314);
			this.regMsg("ClanBuySuccess_S2C", 10315);
			this.regHandler(this.clanBuySuccess, 10315);
			this.regMsg(6, 10316);
			this.regHandler(this.clanBuyFailed, 10316);
			this.regMsg("ClanActiveSuccess_S2C", 10317);
			this.regHandler(this.clanActiveSuccess, 10317);
			this.regMsg(6, 10318);
			this.regHandler(this.clanActiveFailed, 10318);
			this.regMsg("ClanMemberInfoSuccess_S2C", 10319);
			this.regHandler(this.clanMemberInfoSuccess, 10319);
			this.regMsg("ClanTitleInfo", 10320);
			this.regHandler(this.clanAppointSuccess, 10320);
			this.regMsg(6, 10321);
			this.regHandler(this.clanAppointFailed, 10321);
			this.regMsg("ClanLimitInfoSuccess_S2C", 10322);
			this.regHandler(this.clanLimitInfoSuccess, 10322);
			this.regMsg("ClanLimitUpdateSuccess_S2C", 10323);
			this.regHandler(this.clanLimitUpdateSuccess, 10323);
			this.regMsg(6, 10324);
			this.regHandler(this.clanLimitUpdateFailed, 10324);
			this.regMsg(6, 10325);
			this.regHandler(this.clanTitleChange, 10325);
			this.regMsg("ClanHongbaoInfo", 10326);
			this.regHandler(this.clanHongbao, 10326);
			this.regMsg("ClanOpenHongbaoSuccess_S2C", 10327);
			this.regHandler(this.clanOpenHongbaoSuccess, 10327);
			this.regMsg(6, 10328);
			this.regHandler(this.clanOpenHongbaoFailed, 10328);
			this.regMsg("ClanHongbaoInfoSuccess_S2C", 10329);
			this.regHandler(this.clanHongbaoInfoSuccess, 10329);
			this.regMsg("ClanShanrangSuccess_S2C", 10330);
			this.regHandler(this.clanShanrangSuccess, 10330);
			this.regMsg(6, 10331);
			this.regHandler(this.clanShanrangFailed, 10331);
			this.regMsg("ClanKickSuccess_S2C", 10332);
			this.regHandler(this.clanKickSuccess, 10332);
			this.regMsg(6, 10333);
			this.regHandler(this.clanKickFailed, 10333);
			this.regMsg("ClanQuitSuccess_S2C", 10334);
			this.regHandler(this.clanQuitSuccess, 10334);
			this.regMsg(6, 10335);
			this.regHandler(this.clanQuitFailed, 10335);
			this.regMsg("ClanHongbaoReceivedSuccess_S2C", 10336);
			this.regHandler(this.clanHongbaoReceivedSuccess, 10336);
			this.regMsg("ClanHongbaoSentSuccess_S2C", 10337);
			this.regHandler(this.clanHongbaoSentSuccess, 10337);
			this.regMsg("ClanMemberInfo", 10338);
			this.regHandler(this.clanMemberAddSuccess, 10338);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			let C = game.ConfigKey;
			//权限
			let quanxians = DataLocator.getData(C.MenPaiQuanXian);
			let quanxianByTitle = this.quanxianByTitle = {};
			let qCfg: MenPaiQuanXianCfg;
			for (let id in quanxians) {
				if (quanxians.hasOwnProperty(id)) {
					qCfg = quanxians[id];
					if (qCfg) {
						quanxianByTitle[qCfg.id] = qCfg;
					}
				}
			}
			//捐献
			let juanxians: { [index: string]: MenPaiJuanXianCfg } = DataLocator.getData(C.MenPaiJuanXian);
			let juanxianArr = this.juanxianArr = [];
			let jCfg: MenPaiJuanXianCfg;
			for (let id in juanxians) {
				if (juanxians.hasOwnProperty(id)) {
					jCfg = juanxians[id];
					if (jCfg) {
						juanxianArr[juanxianArr.length] = jCfg;
					}
				}
			}
			//等级
			this.byLv = DataLocator.getData(C.MenPaiLevel);
			//商店物品
			this.itemByCfgId = DataLocator.getData(C.MenPaiShopItem);
			let needItemByLv = this.needItemByLv = {};
			let itemByCfgId = this.itemByCfgId;
			let itemByLv = this.itemByLv = {};
			let itemCfg: MenPaiShopItemCfg;
			let lv: number;
			for (let id in itemByCfgId) {
				if (itemByCfgId.hasOwnProperty(id)) {
					itemCfg = itemByCfgId[id];
					if (itemCfg) {
						lv = itemCfg.minlevel;
						if (!itemByLv[lv]) {
							itemByLv[lv] = [];
						}
						itemByLv[lv].push(itemCfg);
						/*if (lv == 1) {
							//开放等级为1的默认激活
							itemCfg.state = 1;
						}*/
						if (!needItemByLv[lv]) {
							needItemByLv[lv] = [];
						}
						needItemByLv[lv].push([itemCfg.id]);
					}
				}
			}
			//入门限制
			let limitById = this.limitById = DataLocator.getData(C.MenPaiLimit);
			let lCfg: MenPaiLimitCfg;
			let limitArr = this.limitArr = [];
			for (let id in limitById) {
				if (limitById.hasOwnProperty(id)) {
					lCfg = limitById[id];
					if (lCfg) {
						limitArr[limitArr.length] = lCfg;
					}
				}
			}
			//门派附加数据
			this.needHonor = DataLocator.getExtra(C.MenPaiQuanXian, "needHonor") || 300;
			this.maxJuanxianNum = DataLocator.getExtra(C.MenPaiQuanXian, "maxJuanxianNum") || 1;
			this.maxNameLen = DataLocator.getExtra(C.MenPaiQuanXian, "maxNameLen") || 6;
			this.maxNoticeLen = DataLocator.getExtra(C.MenPaiQuanXian, "maxNoticeLen") || 100;
			this.assiNum = DataLocator.getExtra(C.MenPaiQuanXian, "leaderCount") || 2;
			this.maxRate = DataLocator.getExtra(C.MenPaiQuanXian, "hongbaoMax") || 1000;
			this.hongbaoFame = DataLocator.getExtra(C.MenPaiQuanXian, "hongbaoMulti") || 10;
			this.hongbaoHonor = DataLocator.getExtra(C.MenPaiQuanXian, "hongbaoHonor") || 1;
			/*-*end $onRegister*-*/
		}

		/**【myClanInfo】
* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
* message MyClanInfo_C2S{
*     option (cmd) = 300;
* }
* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
*
* 这里写手写的注释
*/
		public myClanInfo() {
			this.send(300, null)
		}
		/**【clanList】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanList_C2S{
		 *     option (cmd) = 301;
		 *     required PageRequest pageinfo=1;//请求门派信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanList(_pageinfo: PageRequest) {
			this.send(301, _pageinfo, "PageRequest");
		}
		/**【clanCreate】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanCreate_C2S{
		 *     option (cmd) = 302;
		 *     required string name=1;//门派名
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanCreate(_name: string) {
			this.send(302, _name, 2);
		}
		/**【clanNoticeUpdate】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanNoticeUpdate_C2S{
		 *     option (cmd) = 303;
		 *     required string notice= 1;//公告
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanNoticeUpdate(_notice: string) {
			this.send(303, _notice, 2);
		}
		/**【clanUpgrade】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanUpgrade_C2S{
		 *     option (cmd) = 304;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanUpgrade() {
			this.send(304, null)
		}
		/**【clanJuanxian】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanJuanxian_C2S{
		 *     option (cmd) = 305;
		 *     required int32 id= 1;//捐献配置id
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanJuanxian(_id: number) {
			this.send(305, _id, 6);
		}
		/**【clanJoin】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanJoin_C2S{
		 *     option (cmd) = 306;
		 *     required int32 id= 1;//门派id
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanJoin(_id: number) {
			this.send(306, _id, 5);
		}
		/**【clanSendHongbao】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanSendHongbao_C2S{
		 *     option (cmd) = 307;
		 *     required int32 rate= 1;//红包倍率
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanSendHongbao(_rate: number) {
			this.send(307, _rate, 6);
		}
		/**【clanBuyInfo】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanBuyInfo_C2S{
		 *     option (cmd) = 308;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanBuyInfo() {
			this.send(308, null)
		}
		/**【clanBuy】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanBuy_C2S{
		 *     option (cmd) = 309;
		 *     required int32 cfgid= 1;//商品配置id
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanBuy(_cfgid: number) {
			this.send(309, _cfgid, 6);
		}
		/**【clanActive】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanActive_C2S{
		 *     option (cmd) = 310;
		 *     required int32 cfgid= 1;//商品配置id
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanActive(_cfgid: number) {
			this.send(310, _cfgid, 6);
		}
		/**【clanMemberInfo】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanMemberInfo_C2S{
		 *     option (cmd) = 311;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanMemberInfo() {
			this.send(311, null)
		}
		/**【clanAppoint】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanAppoint_C2S{
		 *     option (cmd) = 312;
		 *     required ClanTitleInfo info=1;//要任命的角色id、职位
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanAppoint(_info: ClanTitleInfo) {
			this.send(312, _info, "ClanTitleInfo");
		}
		/**【clanLimitInfo】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanLimitInfo_C2S{
		 *     option (cmd) = 313;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanLimitInfo() {
			this.send(313, null)
		}
		/**【clanLimitUpdate】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanLimitUpdate_C2S{
		 *     option (cmd) = 314;
		 *     repeated ClanLimitInfo list= 1;//入门限制信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanLimitUpdate(_ClanLimitUpdate_C2S: ClanLimitUpdate_C2S) {
			this.send(314, _ClanLimitUpdate_C2S, "ClanLimitUpdate_C2S");
		}
		/**【clanOpenHongbao】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanOpenHongbao_C2S{
		 *     option (cmd) = 315;
		 *     required int32 id=1;//红包id
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanOpenHongbao(_id: number) {
			this.send(315, _id, 6);
		}
		/**【clanHongbaoInfo】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanHongbaoInfo_C2S{
		 *     option (cmd) = 316;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanHongbaoInfo() {
			this.send(316, null)
		}
		/**【clanShanrang】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanShanrang_C2S{
		 *     option (cmd) = 317;
		 *     required double id= 1;//角色id 被让角色
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanShanrang(_id: number) {
			this.send(317, _id, 5);
		}
		/**【clanKick】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanKick_C2S{
		 *     option (cmd) = 318;
		 *     required double id= 1;//角色id 被踢角色
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanKick(_id: number) {
			this.send(318, _id, 5);
		}
		/**【clanQuit】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanQuit_C2S{
		 *     option (cmd) = 319;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanQuit() {
			this.send(319, null)
		}
		/**【clanHongbaoReceived】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanHongbaoReceived_C2S{
		 *     option (cmd) = 320;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanHongbaoReceived() {
			this.send(320, null)
		}
		/**【clanHongbaoSent】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanHongbaoSent_C2S{
		 *     option (cmd) = 321;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public clanHongbaoSent() {
			this.send(321, null)
		}
		/**【myClanInfoSuccess】
* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 * message MyClanInfoSuccess_S2C{
 *     option (cmd) = 10300;
 *     required MyClanInfo myinfo= 1;//门派中和自己相关的信息
 *     required ClanInfo info=2;//门派信息
 *     required int32 rank=3;//门派排名
 *     optional string notice=4;//门派公告
 * }
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
*
* 这里写手写的注释
*/
		protected myClanInfoSuccess = (data: NetData) => {
			let msg: MyClanInfoSuccess_S2C = <MyClanInfoSuccess_S2C>data.data;
			/*-*begin myClanInfoSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let vo;
				let info = msg.info;
				if (info) {
					vo = this.clanInfoVO = new ClanInfoVO();
					info.copyto(vo);
				}
				let myInfo = msg.myinfo;
				if (myInfo) {
					vo = this.myClanInfoVO = new MyClanInfoVO();
					myInfo.copyto(vo);
				}
				vo.rank = msg.rank;
				vo.notice = msg.notice;
				dispatch(EventConst.CLAN_MY_INFO);
			}
			/*-*end myClanInfoSuccess*-*/
		}
		/**【clanListSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanListSuccess_S2C{
		 *     option (cmd) = 10301;
		 *     required int32 startIndex=1;//数据的起始索引，从0开始
		 *     repeated ClanInfo list= 2;//门派列表,undefined时无门派
		 *     optional PageVersion version=3;//分页版本信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanListSuccess = (data: NetData) => {
			let msg: ClanListSuccess_S2C = <ClanListSuccess_S2C>data.data;
			/*-*begin clanListSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let clanArr = this.clanArr = [];
				let arr = msg.list;
				if (arr) {
					let vo: ClanInfoVO;
					arr.forEach(info => {
						if (info) {
							vo = new ClanInfoVO();
							info.copyto(vo);
							clanArr.pushOnce(vo);
						}
					});
				}
				dispatch(EventConst.CLAN_INFO);
			}
			/*-*end clanListSuccess*-*/
		}
		/**【clanCreateSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanCreateSuccess_S2C{
		 *     option (cmd) = 10302;
		 *     required int32 honor=1;//我的荣誉（剩余）
		 *     required ClanInfo  info= 2;//我的门派信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanCreateSuccess = (data: NetData) => {
			let msg: ClanCreateSuccess_S2C = <ClanCreateSuccess_S2C>data.data;
			/*-*begin clanCreateSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				Core.$hero.honor = msg.honor;
				let vo;
				let info = msg.info;
				if (info) {
					vo = this.clanInfoVO = new ClanInfoVO();
					info.copyto(vo);
					Core.$hero.clanid = vo.id;
				}
				else {
					this.clanInfoVO = undefined;
				}
				vo = this.myClanInfoVO = new MyClanInfoVO();
				vo.titleid = 3;
				vo.juanxianNum = 0;
				vo.res = 0;
				dispatch(EventConst.CLAN_MY_INFO);
			}
			/*-*end clanCreateSuccess*-*/
		}
		/**【clanCreateFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanCreateFailed_S2C{
		 *     option (cmd) = 10303;
		 *     required int32 state = 1;//0:荣誉不足，1:名字不能为空，2：名字符超长，3：名不合法，4：重名，5：受活动限制
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanCreateFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanCreateFailed*-*/
			//这里填写方法中的手写内容
			if (_state == 0) {
				CoreFunction.showServerTips(305);
			}
			else if (_state == 1) {
				CoreFunction.showServerTips(306);
			}
			else if (_state == 2) {
				CoreFunction.showServerTips(307, this.maxNameLen);
			}
			else if (_state == 3) {
				CoreFunction.showServerTips(308);
			}
			else if (_state == 4) {
				CoreFunction.showServerTips(309);
			}
			else if (_state == 5) {
				CoreFunction.showServerTips(310);
			}
			/*-*end clanCreateFailed*-*/
		}
		/**【clanNoticeUpdateSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanNoticeUpdateSuccess_S2C{
		 *     option (cmd) = 10304;
		 *     required string notice= 1;//公告
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanNoticeUpdateSuccess = (data: NetData) => {
			let _notice: string = <any>data.data;
			/*-*begin clanNoticeUpdateSuccess*-*/
			//这里填写方法中的手写内容
			if (this.myClanInfoVO) {
				this.myClanInfoVO.notice = _notice;
				CoreFunction.showServerTips(311);
				dispatch(EventConst.CLAN_NOTICE);
			}
			/*-*end clanNoticeUpdateSuccess*-*/
		}
		/**【clanNoticeUpdateFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanNoticeUpdateFailed_S2C{
		 *     option (cmd) = 10305;
		 *     required int32 state= 1;//0：权限不足，1：超长，2：公告不合法，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanNoticeUpdateFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanNoticeUpdateFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(290);
			}
			else if (_state == 1) {
				CoreFunction.showServerTips(312, this.maxNoticeLen);
			}
			else if (_state == 2) {
				CoreFunction.showServerTips(308);
			}
			/*-*end clanNoticeUpdateFailed*-*/
		}
		/**【clanUpgradeSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanUpgradeSuccess_S2C{
		 *     option (cmd) = 10306;
		 *     required int32 level= 1;//等级
		 *     required double res= 2;//资源（剩余）
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanUpgradeSuccess = (data: NetData) => {
			let msg: ClanUpgradeSuccess_S2C = <ClanUpgradeSuccess_S2C>data.data;
			/*-*begin clanUpgradeSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let info = this.clanInfoVO;
				info.level = msg.level;
				info.res = msg.res;
				CoreFunction.showServerTips(313);
				dispatch(EventConst.CLAN_UPGRADE);
			}
			/*-*end clanUpgradeSuccess*-*/
		}
		/**【clanUpgradeFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanUpgradeFailed_S2C{
		 *     option (cmd) = 10307;
		 *     required int32 state= 1;//0：权限不足，1：资源不足，2：受活动限制，3:升级至顶级，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanUpgradeFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanUpgradeFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(290);
			}
			else if (_state == 1) {
				CoreFunction.showServerTips(314);
			}
			else if (_state == 2) {
				CoreFunction.showServerTips(310);
			}
			else if (_state == 3) {
				CoreFunction.showServerTips("已达顶级");
			}
			/*-*end clanUpgradeFailed*-*/
		}
		/**【clanJuanxianSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanJuanxianSuccess_S2C{
		 *     option (cmd) = 10308;
		 *     required int32 id= 1;//捐献配置id
		 *     required int32 fame= 2;//我的声望（剩余）
		 *     required int32 myRes= 3;//我的贡献（剩余）
		 *     required int32 res= 4;//门派资源（剩余）
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanJuanxianSuccess = (data: NetData) => {
			let msg: ClanJuanxianSuccess_S2C = <ClanJuanxianSuccess_S2C>data.data;
			/*-*begin clanJuanxianSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				if (!this.myClanInfoVO.juanxianNum) {
					this.myClanInfoVO.juanxianNum = 0;
				}
				this.myClanInfoVO.juanxianNum++;
				Core.$hero.fame = msg.fame;
				this.myClanInfoVO.res = msg.myRes;
				this.clanInfoVO.res = msg.res;
				let idx: number = msg.id - 1;
				let jCfg: MenPaiJuanXianCfg = this.juanxianArr[idx];
				if (jCfg) {
					jCfg.state = true;
				}
				CoreFunction.showServerTips(315);
				dispatch(EventConst.CLAN_JUANXIAN, idx);
			}
			/*-*end clanJuanxianSuccess*-*/
		}
		/**【clanJuanxianFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanJuanxianFailed_S2C{
		 *     option (cmd) = 10309;
		 *     required int32 state= 1;//0：资源不足，1：捐献次数达上限，2：受活动限制，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanJuanxianFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanJuanxianFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(316);
			}
			else if (_state == 1) {
				CoreFunction.showServerTips(317);
			}
			else if (_state == 2) {
				CoreFunction.showServerTips(310);
			}
			/*-*end clanJuanxianFailed*-*/
		}
		/**【clanJoinSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanJoinSuccess_S2C{
		 *     option (cmd) = 10310;
		 *     required ClanInfo  info= 1;//我的门派信息
		 *     required int32 rank=2;//门派排名
		 *     optional string notice=3;//门派公告
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanJoinSuccess = (data: NetData) => {
			let msg: ClanJoinSuccess_S2C = <ClanJoinSuccess_S2C>data.data;
			/*-*begin clanJoinSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let info = msg.info;
				let vo;
				if (info) {
					vo = this.clanInfoVO = new ClanInfoVO();
					info.copyto(vo);
					vo.rank = msg.rank;
					vo.notice = msg.notice;
					Core.$hero.clanid = vo.id;
				}
				else {
					this.clanInfoVO = undefined;
				}
				vo = this.myClanInfoVO = new MyClanInfoVO();
				vo.titleid = 1;
				vo.juanxianNum = 0;
				vo.res = 0;
				CoreFunction.showServerTips(318);
				dispatch(EventConst.CLAN_MY_INFO);
			}
			/*-*end clanJoinSuccess*-*/
		}
		/**【clanJoinFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanJoinFailed_S2C{
		 *     option (cmd) = 10311;
		 *     required int32 state= 1;//0：已有门派，1:门派已解散，2:不满足条件
		 *     repeated ClanLimitInfo list= 2;//只有不满足条件的时候，才会有此值
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanJoinFailed = (data: NetData) => {
			let msg: ClanJoinFailed_S2C = <ClanJoinFailed_S2C>data.data;
			/*-*begin clanJoinFailed*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let state = msg.state;
				if (state == 0) {
					CoreFunction.showServerTips(319);
				}
				else if (state == 1) {
					CoreFunction.showServerTips(333);
				}
				else {
					let list = msg.list;
					//各种入门限制、值提示
					if (list) {
						let tips = "";
						let len = list.length;
						let info: ClanLimitInfo;
						let id: number;
						let name: string;
						let value: number;
						let cfg: MenPaiLimitCfg;
						for (let i = 0; i < len; i++) {
							info = list[i];
							if (info) {
								id = info.id;
								value = info.value;
								cfg = this.limitById[id];
								if (cfg) {
									name = cfg.name;
									tips += LangUtil.getMsg(334, name, value);
								}
							}
						}
						if (tips.length) {
							CoreFunction.showServerTips(tips);
						}
					}
				}
			}
			/*-*end clanJoinFailed*-*/
		}
		/**【clanSendHongbaoSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanSendHongbaoSuccess_S2C{
		 *     option (cmd) = 10312;
		 *     required int32 needgold=1;//发红包消耗的元宝数量
		 *     required int32 gold=2;//角色剩余的元宝数量
		 *     required int32 honor=3;//荣誉值(剩余)
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanSendHongbaoSuccess = (data: NetData) => {
			let msg: ClanSendHongbaoSuccess_S2C = <ClanSendHongbaoSuccess_S2C>data.data;
			/*-*begin clanSendHongbaoSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				Core.$hero.gold = msg.gold;
				Core.$hero.honor = msg.honor;
				CoreFunction.showServerTips(323);
				dispatch(EventConst.CLAN_SEND_HONGBAO);
			}
			/*-*end clanSendHongbaoSuccess*-*/
		}
		/**【clanSendHongbaoFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanSendHongbaoFailed_S2C{
		 *     option (cmd) = 10313;
		 *     required int32 state= 1;//0：权限不足，1：门派成员小等于1人，:2：元宝不足，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanSendHongbaoFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanSendHongbaoFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(324);
			}
			else if (_state == 1) {
				CoreFunction.showServerTips(325);
			}
			else if (_state == 2) {
				CoreFunction.notEnoughGold();
			}
			/*-*end clanSendHongbaoFailed*-*/
		}
		/**【clanBuyInfoSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanBuyInfoSuccess_S2C{
		 *     option (cmd) = 10314;
		 *     repeated ClanBuyInfo list= 1;//购买列表，均为已激活
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanBuyInfoSuccess = (data: NetData) => {
			let msg: ClanBuyInfoSuccess_S2C = <ClanBuyInfoSuccess_S2C>data.data;
			/*-*begin clanBuyInfoSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				//已购买次数整理
				let list = msg.list;
				if (list) {
					let itemByCfgId = this.itemByCfgId;
					let len: number = list.length;
					let info: ClanBuyInfo;
					let cfg: MenPaiShopItemCfg;
					for (var i = 0; i < len; i++) {
						info = list[i];
						if (info) {
							cfg = itemByCfgId[info.cfgid];
							if (cfg) {
								//已激活
								cfg.state = 1;
								//已购买次数
								cfg.count = info.count;
							}
						}
					}
				}
				dispatch(EventConst.CLAN_BUY_INFO);
			}
			/*-*end clanBuyInfoSuccess*-*/
		}
		/**【clanBuySuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanBuySuccess_S2C{
		 *     option (cmd) = 10315;
		 *     required int32 cfgid= 1;//商品配置id
		 *     optional int32 count=2[default=1];//你购买的商品数量
		 *     optional int32 total=3[default=0];//商品已购买的总数量，如果是可无限购买的，为0
		 *     required ItemsContext context=4;//物品消耗/获得信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanBuySuccess = (data: NetData) => {
			let msg: ClanBuySuccess_S2C = <ClanBuySuccess_S2C>data.data;
			/*-*begin clanBuySuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let cfgId = msg.cfgid;
				let cfg = this.itemByCfgId[cfgId];
				if (cfg) {
					cfg.count++;
				}
				let context = msg.context;
				if (context) {
					Core.$hero.itemsResult(context.result, this.itemsService);
				}
				let idx = this.itemArr.indexOf(cfg);
				dispatch(EventConst.CLAN_BUY, idx);
			}
			/*-*end clanBuySuccess*-*/
		}
		/**【clanBuyFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanBuyFailed_S2C{
		 *     option (cmd) = 10316;
		 *     required int32 state= 1;//0：物品未激活，2：权限不足，3：资源不足，4：购买次数已达上限，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanBuyFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanBuyFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(326);
			}
			/*else if (_state == 1) {
				CoreFunction.showServerTips(327);
			}*/
			else if (_state == 2) {
				CoreFunction.showServerTips(290);
			}
			else if (_state == 3) {
				CoreFunction.showServerTips(328);
			}
			else if (_state == 4) {
				CoreFunction.showServerTips(329);
			}
			/*-*end clanBuyFailed*-*/
		}
		/**【clanActiveSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanActiveSuccess_S2C{
		 *     option (cmd) = 10317;
		 *     required int32 cfgid= 1;//物品配置id
		 *     required ItemsContext context=2;//消耗/获得信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanActiveSuccess = (data: NetData) => {
			let msg: ClanActiveSuccess_S2C = <ClanActiveSuccess_S2C>data.data;
			/*-*begin clanActiveSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let cfgId = msg.cfgid;
				let cfg = this.itemByCfgId[cfgId];
				if (cfg) {
					cfg.state = 1;
				}
				let context = msg.context;
				if (context) {
					Core.$hero.itemsResult(context.result, this.itemsService);
				}
				let idx = this.itemArr.indexOf(cfg);
				dispatch(EventConst.CLAN_ACTIVE, idx);
			}
			/*-*end clanActiveSuccess*-*/
		}
		/**【clanActiveFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanActiveFailed_S2C{
		 *     option (cmd) = 10318;
		 *     required int32 state= 1;//0：门派等级不足，1：权限不足，2：资源不足，3:已结激活，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanActiveFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanActiveFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(327);
			}
			else if (_state == 1) {
				CoreFunction.showServerTips(290);
			}
			else if (_state == 2) {
				CoreFunction.showServerTips(328);
			}
			else if (_state == 3) {
				CoreFunction.showServerTips(335);
			}
			/*-*end clanActiveFailed*-*/
		}
		/**【clanMemberInfoSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanMemberInfoSuccess_S2C{
		 *     option (cmd) = 10319;
		 *     repeated ClanMemberInfo list= 1;//成员信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanMemberInfoSuccess = (data: NetData) => {
			let msg: ClanMemberInfoSuccess_S2C = <ClanMemberInfoSuccess_S2C>data.data;
			/*-*begin clanMemberInfoSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let memberArr = this.memberArr = [];
				let memberById = this.memberById = {};
				let arr = msg.list;
				if (arr) {
					let info: ClanMemberInfo;
					let vo: ClanMemberInfoVO;
					let len: number = arr.length;
					for (var i = 0; i < len; i++) {
						info = arr[i];
						vo = new ClanMemberInfoVO();
						info.copyto(vo);
						memberArr[memberArr.length] = vo;
						memberById[vo.id] = vo;
					}
				}
				dispatch(EventConst.CLAN_MEMBER_INFO);
			}
			/*-*end clanMemberInfoSuccess*-*/
		}
		/**【clanAppointSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanAppointSuccess_S2C{
		 *     option (cmd) = 10320;
		 *     required ClanTitleInfo info=1;//任命的角色id、职位
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanAppointSuccess = (data: NetData) => {
			let _info: ClanTitleInfo = <any>data.data;
			/*-*begin clanAppointSuccess*-*/
			//这里填写方法中的手写内容
			if (_info) {
				let id = _info.id;
				let titleId = _info.titleid;
				let vo = this.memberById[id];
				if (vo) {
					vo.titleid = titleId;
				}
				CoreFunction.showServerTips(289);
				dispatch(EventConst.CLAN_MEMBER_INFO);
			}
			/*-*end clanAppointSuccess*-*/
		}
		/**【clanAppointFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanAppointFailed_S2C{
		 *     option (cmd) = 10321;
		 *     required int32 state= 1;//0：权限不足，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanAppointFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanAppointFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(290);
			}
			/*-*end clanAppointFailed*-*/
		}
		/**【clanLimitInfoSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanLimitInfoSuccess_S2C{
		 *     option (cmd) = 10322;
		 *     repeated ClanLimitInfo list= 1;//入门限制信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanLimitInfoSuccess = (data: NetData) => {
			let msg: ClanLimitInfoSuccess_S2C = <ClanLimitInfoSuccess_S2C>data.data;
			/*-*begin clanLimitInfoSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				this.setLimitInfo(msg.list);
				dispatch(EventConst.CLAN_LIMIT_INFO);
			}
			/*-*end clanLimitInfoSuccess*-*/
		}
		/**【clanLimitUpdateSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanLimitUpdateSuccess_S2C{
		 *     option (cmd) = 10323;
		 *     repeated ClanLimitInfo list= 1;//入门限制信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanLimitUpdateSuccess = (data: NetData) => {
			let msg: ClanLimitUpdateSuccess_S2C = <ClanLimitUpdateSuccess_S2C>data.data;
			/*-*begin clanLimitUpdateSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				this.setLimitInfo(msg.list);
				dispatch(EventConst.CLAN_LIMIT_UPDATE);
			}
			/*-*end clanLimitUpdateSuccess*-*/
		}
		/**【clanLimitUpdateFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanLimitUpdateFailed_S2C{
		 *     option (cmd) = 10324;
		 *     required int32 state= 1;//0：权限不足，-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanLimitUpdateFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanLimitUpdateFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(290);
			}
			/*-*end clanLimitUpdateFailed*-*/
		}
		/**【clanTitleChange】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanTitleChange_S2C{
		 *     option (cmd) = 10325;
		 *     required int32 titleid= 1;//职位头衔id
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanTitleChange = (data: NetData) => {
			let _titleid: number = <any>data.data;
			/*-*begin clanTitleChange*-*/
			//这里填写方法中的手写内容
			if (_titleid == 0) {
				this.clanInfoVO = undefined;
				this.myClanInfoVO = undefined;
				CoreFunction.showServerTips(288);
			}
			else {
				let titleId = this.myClanInfoVO.titleid;
				let qCfg = this.quanxianByTitle[titleId];
				if (qCfg) {
					if (titleId < _titleid) {
						CoreFunction.showServerTips("恭喜您被提升为{0}", qCfg.name);
					}
					else {
						CoreFunction.showServerTips("您被降为{0}", qCfg.name);
					}
				}
				this.myClanInfoVO.titleid = _titleid;
			}
			dispatch(EventConst.CLAN_INFO);
			/*-*end clanTitleChange*-*/
		}
		/**【clanHongbao】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanHongbao_S2C{
		 *     option (cmd) = 10326;
		 *     required ClanHongbaoInfo info=1;//红包id、发红包角色名
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanHongbao = (data: NetData) => {
			let _info: ClanHongbaoInfo = <any>data.data;
			/*-*begin clanHongbao*-*/
			//这里填写方法中的手写内容
			if (_info) {
				let vo: ClanHongbaoInfoVO;
				let hongbaoById = this.hongbaoById;
				let hongbaoArr = this.hongbaoArr;
				vo = new ClanHongbaoInfoVO();
				_info.copyto(vo);
				if (!hongbaoById) {
					hongbaoById = {};
				}
				hongbaoById[vo.id] = vo;
				if (!hongbaoArr) {
					hongbaoArr = [];
				}
				hongbaoArr[hongbaoArr.length] = vo;
				dispatch(EventConst.CLAN_HONGBAO_INFO);
			}
			/*-*end clanHongbao*-*/
		}
		/**【clanOpenHongbaoSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanOpenHongbaoSuccess_S2C{
		 *     option (cmd) = 10327;
		 *     required int32 id=1;//红包id
		 *     required int32 fame=2;//红包中的声望值
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanOpenHongbaoSuccess = (data: NetData) => {
			let msg: ClanOpenHongbaoSuccess_S2C = <ClanOpenHongbaoSuccess_S2C>data.data;
			/*-*begin clanOpenHongbaoSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let id = msg.id;
				let vo = this.hongbaoById[id];
				if (vo) {
					this.hongbaoArr.remove(vo);
				}
				this.hongbaoById[id] = undefined;
				delete this.hongbaoById[id];
				Core.$hero.fame += +msg.fame;
				dispatch(EventConst.CLAN_HONGBAO_OPEN);
			}
			/*-*end clanOpenHongbaoSuccess*-*/
		}
		/**【clanOpenHongbaoFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanOpenHongbaoFailed_S2C{
		 *     option (cmd) = 10328;
		 *     required int32 state= 1;//-1:角色已经没有公会
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanOpenHongbaoFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanOpenHongbaoFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			/*-*end clanOpenHongbaoFailed*-*/
		}
		/**【clanHongbaoInfoSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanHongbaoInfoSuccess_S2C{
		 *     option (cmd) = 10329;
		 *     repeated ClanHongbaoInfo list=1;//红包id列表
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanHongbaoInfoSuccess = (data: NetData) => {
			let msg: ClanHongbaoInfoSuccess_S2C = <ClanHongbaoInfoSuccess_S2C>data.data;
			/*-*begin clanHongbaoInfoSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let list = msg.list;
				let len = list.length;
				let info: ClanHongbaoInfo;
				let vo: ClanHongbaoInfoVO;
				let hongbaoById = this.hongbaoById = {};
				let hongbaoArr = this.hongbaoArr = [];
				for (let i = 0; i < len; i++) {
					info = list[i];
					if (info) {
						vo = new ClanHongbaoInfoVO();
						info.copyto(vo);
						hongbaoById[vo.id] = vo;
						hongbaoArr[hongbaoArr.length] = vo;
					}
				}
				dispatch(EventConst.CLAN_HONGBAO_INFO);
			}
			/*-*end clanHongbaoInfoSuccess*-*/
		}
		/**【clanShanrangSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanShanrangSuccess_S2C{
		 *     option (cmd) = 10330;
		 *     repeated ClanTitleInfo list= 1;//有变化的职位头衔信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanShanrangSuccess = (data: NetData) => {
			let msg: ClanShanrangSuccess_S2C = <ClanShanrangSuccess_S2C>data.data;
			/*-*begin clanShanrangSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let list = msg.list;
				if (list) {
					let id: number;
					let titleId: number;
					let vo: ClanMemberInfoVO;
					let len: number = list.length;
					for (var i = 0; i < len; i++) {
						var info = list[i];
						if (info) {
							id = info.id;
							titleId = info.titleid;
							vo = this.memberById[id];
							if (vo) {
								vo.titleid = titleId;
							}
						}
					}
				}
				CoreFunction.showServerTips(336);
				dispatch(EventConst.CLAN_MEMBER_INFO);
				dispatch(EventConst.CLAN_MY_INFO);
			}
			/*-*end clanShanrangSuccess*-*/
		}
		/**【clanShanrangFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanShanrangFailed_S2C{
		 *     option (cmd) = 10331;
		 *     required int32 state= 1;//0:对方已不在公会，1：权限不足（无权禅让），-1:角色已经没有门派
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanShanrangFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanShanrangFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(337);
			}
			/*-*end clanShanrangFailed*-*/
		}
		/**【clanKickSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanKickSuccess_S2C{
		 *     option (cmd) = 10332;
		 *     required double id= 1;//角色id 被踢角色
		 *     required string name= 2;//角色名 被踢角色
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanKickSuccess = (data: NetData) => {
			let msg: ClanKickSuccess_S2C = <ClanKickSuccess_S2C>data.data;
			/*-*begin clanKickSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let id = msg.id;
				if (id) {
					if (this.memberById) {
						let vo = this.memberById[id];
						if (vo) {
							this.memberArr.remove(vo);
						}
						this.memberById[id] = undefined;
						delete this.memberById[id];
					}
					this.clanInfoVO.num--;
					dispatch(EventConst.CLAN_MEMBER_INFO);
				}
				let name = msg.name;
				if (name) {
					CoreFunction.showServerTips(338, name);
				}
			}
			/*-*end clanKickSuccess*-*/
		}
		/**【clanKickFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanKickFailed_S2C{
		 *     option (cmd) = 10333;
		 *     required int32 state= 1;//0:权限不足，1：对方已不在门派，-1:角色已经没有门派
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanKickFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanKickFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			else if (_state == 0) {
				CoreFunction.showServerTips(290);
			}
			else if (_state == 1) {
				CoreFunction.showServerTips(337);
			}
			/*-*end clanKickFailed*-*/
		}
		/**【clanQuitSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanQuitSuccess_S2C{
		 *     option (cmd) = 10334;
		 *     optional double id= 1;//退出的角色id
		 *     optional string name= 2;//退出的角色名
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanQuitSuccess = (data: NetData) => {
			let msg: ClanQuitSuccess_S2C = <ClanQuitSuccess_S2C>data.data;
			/*-*begin clanQuitSuccess*-*/
			//这里填写方法中的手写内容
			this.clanInfoVO = undefined;
			this.myClanInfoVO = undefined;
			if (msg) {
				let id = msg.id;
				if (id && this.memberById) {
					let vo = this.memberById[id];
					if (vo) {
						this.memberArr.remove(vo);
					}
					this.memberById[id] = undefined;
					delete this.memberById[id];
				}
				let name = msg.name;
				if (name) {
					CoreFunction.showServerTips(339, name);
				}
				this.clanInfoVO.num--;
			}
			else {
				CoreFunction.showServerTips(288);
			}
			dispatch(EventConst.CLAN_MY_INFO);
			/*-*end clanQuitSuccess*-*/
		}
		/**【clanQuitFailed】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanQuitFailed_S2C{
		 *     option (cmd) = 10335;
		 *     required int32 state= 1;//-1:角色已经没有门派
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanQuitFailed = (data: NetData) => {
			let _state: number = <any>data.data;
			/*-*begin clanQuitFailed*-*/
			//这里填写方法中的手写内容
			if (_state == -1) {
				CoreFunction.showServerTips(332);
			}
			/*-*end clanQuitFailed*-*/
		}
		/**【clanHongbaoReceivedSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanHongbaoReceivedSuccess_S2C{
		 *     option (cmd) = 10336;
		 *     required int32 fame= 1[default=0];//已收到的总威望数，为0时无列表
		 *     repeated ClanHongbaoReceived list= 2;//收到的红包列表
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanHongbaoReceivedSuccess = (data: NetData) => {
			let msg: ClanHongbaoReceivedSuccess_S2C = <ClanHongbaoReceivedSuccess_S2C>data.data;
			/*-*begin clanHongbaoReceivedSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let list = msg.list;
				let len = list.length;
				let info: ClanHongbaoReceived;
				let vo: ClanHongbaoReceivedVO;
				let hongbaoReceivedArr = this.hongbaoReceivedArr = [];
				for (let i = 0; i < len; i++) {
					info = list[i];
					if (info) {
						vo = new ClanHongbaoReceivedVO();
						info.copyto(vo);
						hongbaoReceivedArr[hongbaoReceivedArr.length] = vo;
					}
				}
				dispatch(EventConst.CLAN_HONGBAO_RECEIVED_INFO);
			}
			/*-*end clanHongbaoReceivedSuccess*-*/
		}
		/**【clanHongbaoSentSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanHongbaoSentSuccess_S2C{
		 *     option (cmd) = 10337;
		 *     required int32 gold= 1[default=0];//已发出的总元宝数，为0时无列表
		 *     repeated ClanHongbaoSent list= 2;//发出的红包列表
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanHongbaoSentSuccess = (data: NetData) => {
			let msg: ClanHongbaoSentSuccess_S2C = <ClanHongbaoSentSuccess_S2C>data.data;
			/*-*begin clanHongbaoSentSuccess*-*/
			//这里填写方法中的手写内容
			if (msg) {
				let list = msg.list;
				let len = list.length;
				let info: ClanHongbaoSent;
				let vo: ClanHongbaoSentVO;
				let hongbaoSentArr = this.hongbaoSentArr = [];
				for (let i = 0; i < len; i++) {
					info = list[i];
					if (info) {
						vo = new ClanHongbaoSentVO();
						info.copyto(vo);
						hongbaoSentArr[hongbaoSentArr.length] = vo;
					}
				}
				dispatch(EventConst.CLAN_HONGBAO_SENT_INFO);
			}
			/*-*end clanHongbaoSentSuccess*-*/
		}
		/**【clanMemberAddSuccess】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message ClanMemberAddSuccess_S2C{
		 *     option (cmd) = 10338;
		 *     required ClanMemberInfo info= 1;//成员信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected clanMemberAddSuccess = (data: NetData) => {
			let _info: ClanMemberInfo = <any>data.data;
			/*-*begin clanMemberAddSuccess*-*///这里填写方法中的手写内容
			if (_info) {
				let memberArr = this.memberArr;
				let vo = new ClanMemberInfoVO();
				_info.copyto(vo);
				memberArr[memberArr.length] = vo;
				this.memberById[vo.id] = vo;
				this.clanInfoVO.num++;
				CoreFunction.showServerTips(340, vo.name);
				dispatch(EventConst.CLAN_MEMBER_INFO);
			}
			/*-*end clanMemberAddSuccess*-*/
		}
		/*-*begin $area2*-*/
		//这里填写类里面的手写内容
		public clanInfoVO: ClanInfoVO;
		public myClanInfoVO: MyClanInfoVO;
		public clanArr: ClanInfoVO[];
		public memberArr: ClanMemberInfoVO[];
		public memberById: { [index: string]: ClanMemberInfoVO };
		public hongbaoById: { [index: string]: ClanHongbaoInfoVO };
		public hongbaoArr: ClanHongbaoInfoVO[];
		public hongbaoReceivedArr: ClanHongbaoReceivedVO[];
		public hongbaoSentArr: ClanHongbaoSentVO[];
		@d_dependProxy(ServiceName.ItemsService)
		public itemsService: ItemsService;
		//配置
		public byLv: { [index: string]: MenPaiLevelCfg };
		public juanxianArr: MenPaiJuanXianCfg[];
		public quanxianByTitle: { [index: string]: MenPaiQuanXianCfg };
		public itemByCfgId: { [index: string]: MenPaiShopItemCfg };
		public itemByLv: { [index: string]: MenPaiShopItemCfg[] };
		public itemArr: MenPaiShopItemCfg[];
		public needItemByLv: { [index: string]: any[] };
		public limitById: { [index: string]: MenPaiLimitCfg };
		public limitArr: MenPaiLimitCfg[];
		//附加
		public assiNum: number;
		public needHonor: number;
		public maxJuanxianNum: number;
		public maxNameLen: number;
		public maxNoticeLen: number;
		public maxRate: number;
		public hongbaoFame: number;
		public hongbaoHonor: number;

		public getOnlineNum(): number {
			let num: number = 0;
			let memberArr = this.memberArr;
			if (memberArr) {
				memberArr.forEach(vo => {
					if (vo && !vo.time) {
						num++;
					}
				});
			}
			return num;
		}

		/**
		 * S2C时调用
		 * 
		 * @param {ClanLimitInfo[]} arr
		 * 
		 * @memberOf ClanService
		 */
		setLimitInfo(arr: ClanLimitInfo[]) {
			if (arr) {
				let limitById = this.limitById;
				let lCfg: MenPaiLimitCfg;
				arr.forEach(info => {
					if (info) {
						lCfg = limitById[info.id];
						lCfg.value = info.value;
					}
				});
			}
			else {
				this.limitById = {};
			}
		}

		testList(_pageinfo: PageRequest) {
			Core.$hero.honor = 300;

			let data = new NetData();
			let msg = <ClanListSuccess_S2C>{};
			msg.list = [];

			let vo = new ClanInfoVO();
			vo.id = 1;
			vo.level = 2;
			vo.master = "afds";
			vo.name = "afds";
			vo.num = 1;
			vo.res = 3000;
			msg.list.push(vo);

			vo.id = 2;
			vo.level = 1;
			vo.master = "afdsfads";
			vo.name = "afdsfda";
			vo.num = 9;
			vo.res = 30000;
			msg.list.push(vo);

			msg.startIndex = 0;

			msg.version = <PageVersion>{ version: _pageinfo.version, total: _pageinfo.size };
			data.data = msg;
			this.clanListSuccess(data);
		}

		testCreate(_name: string) {
			let data = new NetData();
			let msg = <ClanCreateSuccess_S2C>{};
			msg.info = new ClanInfoVO();
			msg.info.id = 1;
			msg.info.level = 2;
			msg.info.master = Core.$hero.name;
			msg.info.name = _name;
			msg.info.num = 1;
			msg.info.res = 3000;
			data.data = msg;
			this.clanCreateSuccess(data);
		}

		testNotice(_notice: string) {
			let data = new NetData();
			let msg = _notice;
			data.data = msg;
			this.clanNoticeUpdateSuccess(data);
		}

		testUpgrade() {
			let data = new NetData();
			let msg = <ClanUpgradeSuccess_S2C>{};
			msg.level = 2;
			msg.res = 0;
			data.data = msg;
			this.clanUpgradeSuccess(data);
		}

		testHongbao() {
			let data = new NetData();
			this.clanSendHongbaoSuccess(data);
		}

		testJuanxian(_id: number) {
			let data = new NetData();
			let msg = <ClanJuanxianSuccess_S2C>{};
			msg.id = _id;
			msg.fame = 20;
			data.data = msg;
			this.clanJuanxianSuccess(data);
		}

		testMember() {
			let data = new NetData();
			let msg = <ClanMemberInfoSuccess_S2C>{};
			msg.list = [];
			let vo = new ClanMemberInfoVO();
			vo.id = Core.$hero._id;
			vo.level = Core.$hero.level;
			vo.name = Core.$hero.name;
			vo.res = this.myClanInfoVO.res || 0;
			vo.titleid = this.myClanInfoVO.titleid
			vo.zhanli = Core.$hero.zhanli || 0;
			msg.list.push(vo);
			vo = new ClanMemberInfoVO();
			vo.id = 2;
			vo.level = 2;
			vo.name = "222";
			vo.res = 0;
			vo.titleid = 1;
			vo.zhanli = 0;
			msg.list.push(vo);
			data.data = msg;
			this.clanMemberInfoSuccess(data);
		}

		testAppoint(_info: ClanTitleInfo) {
			let data = new NetData();
			let msg = <ClanTitleInfo>{};
			msg.id = _info.id;
			msg.titleid = _info.titleid;
			data.data = msg;
			this.clanAppointSuccess(data);
		}

		testShanrang(_info: ClanTitleInfo) {
			let data = new NetData();
			let msg = <ClanShanrangSuccess_S2C>{};
			msg.list = [];
			let vo = <ClanTitleInfo>{};
			vo.id = _info.id;
			vo.titleid = _info.titleid;
			msg.list.push(vo);
			data.data = msg;
			this.clanShanrangSuccess(data);
		}

		testBuyInfo() {
			Core.$hero.honor = 1000;
			let data = new NetData();
			let msg = <ClanMyBuyInfoSuccess_S2C>{};
			msg.list = [];
			let vo = <ClanBuyInfo>{};
			msg.list.push(vo);
			data.data = msg;
			this.clanBuyInfoSuccess(data);
		}

		testActive(_cfgid: number) {
			let data = new NetData();
			let msg = _cfgid;
			data.data = msg;
			this.clanActiveSuccess(data);
		}

		testBuy(_cfgid: number) {
			let data = new NetData();
			let msg = _cfgid;
			data.data = msg;
			this.clanBuySuccess(data);
		}

		testLimit(_ClanLimitUpdate_C2S: ClanLimitUpdate_C2S) {
			let data = new NetData();
			let msg = <ClanLimitUpdate_C2S>{};
			msg.list = _ClanLimitUpdate_C2S.list;
			data.data = msg;
			this.clanLimitUpdateSuccess(data);
		}
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}