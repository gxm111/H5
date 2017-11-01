/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-30 15:21:12
 **/
module junyou.hqg {
	export interface ClanHongbaoReceived{
		/**
		 * 获得的声望
		 */
		fame: number;
		/**
		 * 领取时间
		 */
		time: number;
		/**
		 * 发出红包的角色名
		 */
		name: string;
	}
}
