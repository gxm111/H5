/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%88%9B%E5%BB%BA%E8%A7%92%E8%89%B2 生成
 * 生成时间 2016-08-17 15:21:33
 **/
module junyou.hqg {
	export interface CreateRole_C2S{
		/**
		 * 角色名字
		 */
		name: string;
		/**
		 * 角色职业配置id
		 */
		cfgid: number;
		/**
		 * 服务器标识
		 */
		sid: number;
	}
}
