/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%88%9B%E5%BB%BA%E8%A7%92%E8%89%B2 生成
 * 生成时间 2016-08-17 15:21:33
 **/
module junyou.hqg {
	export interface RoleNeedRelogin_S2C{
		/**
		 * 0 被其他角色拥下线 1 会话过期
		 */
		state: number;
		/**
		 * 可选参数 挤角色下线的ip
		 */
		ip?: string;
	}
}
