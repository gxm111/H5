module junyou.game {
	export interface IConfigKey {
		/**
         * 技能模板
         */
		JiNengMoBan: string;
		/**
         * 技能
         */
		JiNeng: string;
		JueSe: string;
		JueSeWaiXian: string;
		GongNeng: string;
		DaoJu: string;
		ZhuangBei: string;
		/**
		 * 
		 * 所有道具配置
		 * @type {string}
		 */
		AllItems: string;
		CeShiBiao: string;
		ZhuangBeiPinZhi: string;
		MenPaiJuanXian: string;
		MenPaiQuanXian: string;
		MenPaiLevel: string;
		MenPaiShopItem: string;
		MenPaiLimit: string;
		GuanKa: string;
	}
	ConfigKey = {
		MAP: "maps",
		PST: "pst",
		ANI: "ani",
		JiNeng: "JiNeng",
		JiNengMoBan: "JiNengMoBan",
		JueSe: "JueSe",
		JueSeWaiXian: "JueSeWaiXian",
		GongNeng: "GongNeng",
		DaoJu: "DaoJu",
		ZhuangBei: "ZhuangBei",
		AllItems: "AllItems",
		CeShiBiao: "CeShiBiao",
		ZhuangBeiPinZhi: "ZhuangBeiPinZhi",
		MenPaiJuanXian: "MenPaiJuanXian",
		MenPaiQuanXian: "MenPaiQuanXian",
		MenPaiLevel: "MenPaiLevel",
		MenPaiShopItem: "MenPaiShopItem",
		MenPaiLimit: "MenPaiLimit",
		GuanKa: "GuanKa",
	}
	function rP(key: string, CfgCreator: { new (): ICfg }, idkey: string = "id") {
		DataLocator.regCommonParser(key, CfgCreator, idkey);
	}
	function rE(key: string) {
		DataLocator.regExtra(key);
	}
	export function initData() {
		var C = ConfigKey;
		var P = junyou.hqg;
		rP(C.JiNengMoBan, P.JiNengMoBanCfg);
		rP(C.JiNeng, P.JiNengCfg);
		rP(C.JueSe, P.JueSeCfg, "level");
		rP(C.JueSeWaiXian, P.JueSeWaiXianCfg);
		rP(C.GongNeng, P.GongNengCfg);
		rP(C.DaoJu, P.DaoJuCfg);
		rP(C.ZhuangBei, P.ZhuangBeiCfg);
		rP(C.ZhuangBeiPinZhi, P.ZhuangBeiPinZhiCfg, "rare");
		rP(C.MenPaiJuanXian, P.MenPaiJuanXianCfg);
		rP(C.MenPaiQuanXian, P.MenPaiQuanXianCfg);
		rP(C.MenPaiLevel, P.MenPaiLevelCfg, "level");
		rP(C.MenPaiShopItem, P.MenPaiShopItemCfg);
		rP(C.MenPaiLimit, P.MenPaiLimitCfg);
		rP(C.GuanKa, P.GuanKaCfg);

		rE(C.JueSeWaiXian);
		rE(C.DaoJu);
		rE(C.MenPaiQuanXian);
		rE(C.MenPaiJuanXian);
		rE(C.GuanKa);
	}
}