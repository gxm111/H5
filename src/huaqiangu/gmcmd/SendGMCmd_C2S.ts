/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/GM%E6%8C%87%E4%BB%A4 生成
 * 生成时间 2016-08-22 14:47:15
 **/
module junyou.hqg {
	export interface SendGMCmd_C2S{
		/**
		 * 可选参数 (0号位执行类型，1号位执行的关键数据，譬如id,2号位及后面数据，根据类型追加)
		 */
		params?: string[];
	}
}
