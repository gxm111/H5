/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%AC%E5%91%8A%E9%80%9A%E7%9F%A5 生成
 * 生成时间 2016-10-10 16:15:19
 **/
module junyou.hqg {
	export interface SystemMsg_S2C{
		/**
		 * 在哪个频道广播，频道不同，显示的位置不一样
		 */
		chanel: number;
		/**
		 * 要广播的信息，可以是code码或者文本信息
		 */
		msgcode: string;
		/**
		 * 可选参数 其他参数，非必需
		 */
		params?: string[];
	}
}
