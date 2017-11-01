/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%B3%E5%8D%A1%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3 生成
 * 生成时间 2016-08-21 13:44:17
 **/
module junyou.hqg {
	export interface BattleResult_C2S{
		/**
		 * 战斗唯一标识
		 */
		id: number;
		/**
		 * 战斗结果的种子，用于和服务器进行比对
		 */
		seed: number;
		/**
		 * 0 无人获胜<br/>     1 1 队获胜<br/>    2 0 队获胜<br/>    3 两队打平
		 */
		result: number;
		/**
		 * 可选参数 附加的用户指令
		 */
		userCmd?: FightCommand[];
		/**
		 * 可选参数 主角/随从结束时的坐标数据列表
		 */
		positions?: Coord[];
		/**
		 * 可选参数 是否请求打BOSS
		 */
		boss?: boolean;
	}
}
