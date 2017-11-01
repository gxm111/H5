/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%80%9A%E7%94%A8%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-08-10 11:38:31
 **/
module junyou.hqg {
	export interface Coord{
		/**
		 * x坐标
		 */
		x: number;
		/**
		 * y坐标
		 */
		y: number;
		/**
		 * 可选参数 对应地图标识
		 */
		map?: number;
	}
}
