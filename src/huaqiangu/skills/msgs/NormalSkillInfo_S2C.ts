/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%8A%80%E8%83%BD%E7%9B%B8%E5%85%B3%E9%80%9A%E4%BF%A1 生成
 * 生成时间 2016-10-10 14:00:45
 **/
module junyou.hqg {
	export interface NormalSkillInfo_S2C{
		/**
		 * 可选参数 普通技能的冠名信息
		 */
		skills?: SkillInfo[];
		/**
		 * 可选参数 主角技能释放优先级的id顺序 [id3,id1,id2,id5]
		 */
		order0?: number[];
		/**
		 * 可选参数 伙伴1技能释放优先级的id顺序 [id3,id1,id2,id5]
		 */
		order1?: number[];
		/**
		 * 可选参数 伙伴2技能释放优先级的id顺序 [id3,id1,id2,id5]
		 */
		order2?: number[];
	}
}
