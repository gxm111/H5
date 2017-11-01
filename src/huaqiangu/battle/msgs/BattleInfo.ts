/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%B3%E5%8D%A1%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3 生成
 * 生成时间 2016-10-13 16:07:20
 **/
module junyou.hqg {
	export interface BattleInfo{
		/**
		 * 战斗唯一标识
		 */
		id: number;
		/**
		 * 战斗的种子
		 */
		seed: number;
		/**
		 * 可选参数 实体集合
		 */
		entities?: MUnitEntity[];
		/**
		 * 可选参数 附加关卡指令
		 */
		extras?: FightCommand[];
		/**
		 * 地图标识
		 */
		map: number;
		/**
		 * 可选参数 队伍0的角色guid，如果是怪物，则无此值
		 */
		team0?: number;
		/**
		 * 可选参数 队伍1的角色guid
		 */
		team1?: number;
	}
}
