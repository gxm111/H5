/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%88%98%E6%96%97%E6%95%B0%E6%8D%AE%E9%80%9A%E4%BF%A1 生成
 * 生成时间 2016-08-02 11:18:57
 **/
module junyou.hqg {
	export interface FightCommand{
		/**
		 * 执行时间戳，从0开始，单位为毫秒
		 */
		time: number;
		/**
		 * 战斗指令的类型
		 */
		type: number;
		/**
		 * 可选参数 数据集
		 */
		datas?: string[];
	}
}
