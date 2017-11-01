module junyou.hqg {
	/**
	 * description
	 * @author pb
	 */
	export class MyClanInfoVO implements MyClanInfo{
		/**
		 * 可选参数 我的职位id
		 */
		titleid: number;
		/**
		 * 可选参数 我的声望
		 */
		//fame: number;
		/**
		 * 今日已捐献次数
		 */
		juanxianNum: number;
		/**
		 * 我的贡献
		 */
		res: number;

		//rank: number;

		notice: string;

	}
}