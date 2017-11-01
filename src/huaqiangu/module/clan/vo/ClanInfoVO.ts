module junyou.hqg {
    /**
     * description
     * @author pb
     */
    export class ClanInfoVO implements ClanInfo {
        /**
		 * 门派唯一标识
		 */
		id: number;
		/**
		 * 门派名
		 */
		name: string;
		/**
		 * 掌门名
		 */
		master: string;
		/**
		 * 等级
		 */
		level: number;
		/**
		 * 资源
		 */
		res: number;
		/**
		 * 人数
		 */
		num: number;
		/**
		 * 排名
		 */
		rank: number;
		/**
		 * 公告
		 */
		notice: string;
    }
}