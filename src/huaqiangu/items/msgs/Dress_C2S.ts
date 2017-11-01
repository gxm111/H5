/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A3%85%E5%A4%87%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-08-24 10:28:23
 **/
module junyou.hqg {
	export interface Dress_C2S{
		/**
		 * 准备换装的装备唯一标识
		 */
		id: number;
		/**
		 * 可选参数 是对主角还是伙伴进行换装，1表示对主角换装，2表示对伙伴1换装，3表示对伙伴2换装
		 */
		slot?: number;
	}
}
