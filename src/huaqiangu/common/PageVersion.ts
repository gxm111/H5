/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%80%9A%E7%94%A8%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-09-23 14:30:04
 **/
module junyou.hqg {
	export interface PageVersion{
		/**
		 * 分页数据的版本号
		 */
		version: number;
		/**
		 * 分页的总条目数
		 */
		total: number;
		/**
		 * 可选参数 分页数据的过期时间戳
		 */
		expired?: number;
	}
}
