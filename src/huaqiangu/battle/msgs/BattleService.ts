/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%B3%E5%8D%A1%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3 生成
 * 生成时间 2016-10-13 16:07:20
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class BattleService extends junyou.mvc.Service {
		constructor() {
			super("BattleService");
		}

		onRegister() {
			super.onRegister();
			this.regMsg("Battle_S2C", 10010);
			this.regHandler(this.battle, 10010);
			this.regMsg("BattleBonus_S2C", 10011);
			this.regHandler(this.battleBonus, 10011);
			this.regMsg("ItemsContext", 10013);
			this.regHandler(this.guanKaBonus, 10013);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			/*-*end $onRegister*-*/
		}

		/**【battleResult】
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 * message BattleResult_C2S{
 *    option (cmd) = 10;
 *     required double id = 1;//战斗唯一标识
 *     required double seed = 2;//战斗结果的种子，用于和服务器进行比对
 *     required int32 result = 3;//0 无人获胜<br/>     1 1 队获胜<br/>    2 0 队获胜<br/>    3 两队打平
 *     repeated FightCommand userCmd = 4;//附加的用户指令
 *     repeated Coord positions = 5;//主角/随从结束时的坐标数据列表
 *     optional boolean boss = 6[default=false];//是否请求打BOSS
 * }
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 *
 * 这里写手写的注释
 */
		public battleResult(_BattleResult_C2S: BattleResult_C2S) {
			this.send(10, _BattleResult_C2S, "BattleResult_C2S");
		}
		/**【battle】
	 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 * message Battle_S2C{
 *     option (cmd) = 10010;
 *     required BattleInfo battle=1;//战斗信息
 *     required GuanKaInfo guanka=2;//当前关卡信息
 *     repeated SkillInfo dazhaos =3;//角色当前战斗可用的大招
 * }
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 *
 * 这里写手写的注释
 */
		protected battle = (data: NetData) => {
			console.log("battle", Date.now());
			let msg: Battle_S2C = <Battle_S2C>data.data;
			if(!msg)return;
			/*-*begin battle*-*/
			//这里填写方法中的手写内容
			let battle = msg.battle;
			FightController.getInstance().start(battle.map + "", battle.seed, battle.entities, CallbackInfo.getInstance(this.battleEnd, this), battle.id, battle.extras);
			/*-*end battle*-*/
		}
		/**【battleBonus】
		     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message BattleBonus_S2C{
		 *     option (cmd) = 10011;
		 *     required double id = 1;//战斗唯一标识
		 *     required ItemsContext bonus = 2;//奖励信息
		 *     optional GuanKaInfo guanka=3;//新的关卡信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected battleBonus = (data: NetData) => {
			let msg: BattleBonus_S2C = <BattleBonus_S2C>data.data;
			/*-*begin battleBonus*-*/
			let bonus = msg.bonus;
			Core.$hero.itemsResult(bonus.result, this.itemsService);
			/*-*end battleBonus*-*/
		}
		/**【guanKaBonus】
		    * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message GuanKaBonus_S2C{
		 *     option (cmd) = 10013;
		 *     required ItemsContext bonus =1;//奖励信息
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected guanKaBonus = (data: NetData) => {
			let _bonus: ItemsContext = <any>data.data;
			/*-*begin guanKaBonus*-*/
			Core.$hero.itemsResult(_bonus.result, this.itemsService);
			/*-*end guanKaBonus*-*/
		}
		/*-*begin $area2*-*/
		/**
		 * 
		 * 下场挑战BOSS
		 * @type {boolean}
		 */
		public nextToBoss: boolean;

		private battleEnd(result: number, seed: number, battleID: number, userCmds: FightCommand[], coords: Coord[]) {
			//将战斗结果回馈给服务端，让服务端进行验证
			let res = <BattleResult_C2S>{};
			res.id = battleID;
			res.boss = this.nextToBoss;
			res.positions = coords;
			res.result = result;
			res.seed = seed;
			res.userCmd = userCmds;
			this.battleResult(res);
		}

		@d_dependProxy(ServiceName.ItemsService)
		public itemsService: ItemsService;

		//这里填写类里面的手写内容
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}