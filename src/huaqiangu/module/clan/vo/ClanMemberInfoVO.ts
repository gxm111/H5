module junyou.hqg {
    /**
     * description
     * @author pb
     */
    export class ClanMemberInfoVO implements ClanMemberInfo{
        /**
		 * 成员id
		 */
		id: number;
		/**
		 * 成员等级
		 */
		level: number;
		/**
		 * 成员名
		 */
		name: string;
		/**
		 * 战力
		 */
		zhanli: number;
		/**
		 * 贡献
		 */
		res: number;
		/**
		 * 职位头衔
		 */
		titleid: number;
		/**
		 * 状态0：在线，大于0：离线时间戳
		 */
		time: number;

    }
}