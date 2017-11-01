/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%B3%E5%8D%A1%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3 生成
 * 生成时间 2016-10-13 16:07:20
 **/
module junyou.hqg {
	export interface Battle_S2C{
		/**
		 * 战斗信息
		 */
		battle: BattleInfo;
		/**
		 * 当前关卡信息
		 */
		guanka: GuanKaInfo;
		/**
		 * 可选参数 角色当前战斗可用的大招
		 */
		dazhaos?: SkillInfo[];
	}
}
