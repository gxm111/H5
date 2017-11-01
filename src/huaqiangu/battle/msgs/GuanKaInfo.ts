/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%B3%E5%8D%A1%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3 生成
 * 生成时间 2016-10-13 16:07:20
 **/
module junyou.hqg {
	export interface GuanKaInfo{
		/**
		 * 关卡id
		 */
		id: number;
		/**
		 * 可选参数 当前角色已经完成的波数
		 */
		count?: number;
		/**
		 * 可选参数 最后一次结算奖励的时间，如果没有此值，则用当前时间
		 */
		lastTime?: number;
	}
}
