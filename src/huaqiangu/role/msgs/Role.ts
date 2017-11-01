/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A7%92%E8%89%B2%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-10-13 11:16:42
 **/
module junyou.hqg {
	export interface Role{
		/**
		 * 角色全局唯一标识
		 */
		_id: number;
		/**
		 * 角色名字
		 */
		name: string;
		/**
		 * 服务器标识
		 */
		sid: number;
		/**
		 * 可选参数 角色等级
		 */
		level?: number;
		/**
		 * 可选参数 角色经验
		 */
		exp?: number;
		/**
		 * 可选参数 公会全局标识
		 */
		clanid?: number;
		/**
		 * 可选参数 道具列表
		 */
		items?: ItemInfo[];
		/**
		 * 可选参数 主角色和其他随从列表
		 */
		followers?: Follower[];
		/**
		 * 可选参数 游戏币
		 */
		money?: number;
		/**
		 * 可选参数 元宝
		 */
		gold?: number;
		/**
		 * 可选参数 荣誉
		 */
		honor?: number;
		/**
		 * 关卡数据信息
		 */
		guanka: GuanKaInfo;
		/**
		 * 可选参数 大招
		 */
		dazhao?: SkillInfo[];
		/**
		 * 可选参数 离线数据
		 */
		offlineData?: OfflineData;
		/**
		 * 可选参数 已开启背包格位数
		 */
		bagNum?: number;
		/**
		 * 可选参数 门派声望
		 */
		fame?: number;
		/**
		 * 可选参数 门派贡献
		 */
		res?: number;
		/**
		 * 头像配置         1:男1;2:女1;3:男2;4:女2;5:男3;6:女3
		 */
		head: number;
	}
}
