/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-23 14:22:30
 **/
module junyou.hqg {
	export interface ClanInfo{
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
		 * 可选参数 等级
		 */
		level?: number;
		/**
		 * 可选参数 资源
		 */
		res?: number;
		/**
		 * 可选参数 人数
		 */
		num?: number;
	}
}
