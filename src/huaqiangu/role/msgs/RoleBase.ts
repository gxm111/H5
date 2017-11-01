/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A7%92%E8%89%B2%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-10-13 11:16:42
 **/
module junyou.hqg {
	export interface RoleBase{
		/**
		 * 角色全局唯一标识
		 */
		_id: number;
		/**
		 * 角色名字
		 */
		name: string;
		/**
		 * 服务器标识
		 */
		sid: number;
		/**
		 * 角色等级
		 */
		level: number;
		/**
		 * 头像配置信息        1:男1;2:女1;3:男2;4:女2;5:男3;6:女3
		 */
		head: number;
	}
}
