/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-30 15:21:12
 **/
module junyou.hqg {
	export interface ClanHongbaoSentSuccess_S2C{
		/**
		 * 已发出的总元宝数，为0时无列表
		 */
		gold: number;
		/**
		 * 可选参数 发出的红包列表
		 */
		list?: ClanHongbaoSent[];
	}
}
