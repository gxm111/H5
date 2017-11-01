/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-23 14:22:30
 **/
module junyou.hqg {
	export interface ClanListSuccess_S2C{
		/**
		 * 数据的起始索引，从0开始
		 */
		startIndex: number;
		/**
		 * 可选参数 门派列表,undefined时无门派
		 */
		list?: ClanInfo[];
		/**
		 * 可选参数 分页版本信息
		 */
		version?: PageVersion;
	}
}
