const PBMsgDict = {
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%AC%E5%91%8A%E9%80%9A%E7%9F%A5 ↓↓↓↓↓
	SystemMsg_S2C: { 1: ["chanel", 2, 5], 2: ["msgcode", 2, 9], 3: ["params", 3, 9] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%B3%E5%8D%A1%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3 ↓↓↓↓↓
	BattleBonus_S2C: { 1: ["id", 2, 1], 2: ["bonus", 2, 11, "ItemsContext"], 3: ["guanka", 1, 11, "GuanKaInfo"] },
	BattleInfo: { 1: ["id", 2, 1], 2: ["seed", 2, 1], 3: ["entities", 3, 11, "MUnitEntity"], 4: ["extras", 3, 11, "FightCommand"], 5: ["map", 2, 5], 6: ["team0", 1, 1], 7: ["team1", 1, 1] },
	BattleResult_C2S: { 1: ["id", 2, 1], 2: ["seed", 2, 1], 3: ["result", 2, 5], 4: ["userCmd", 3, 11, "FightCommand"], 5: ["positions", 3, 11, "Coord"], 6: ["boss", 1, 11, "boolean"] },
	Battle_S2C: { 1: ["battle", 2, 11, "BattleInfo"], 2: ["guanka", 2, 11, "GuanKaInfo"], 3: ["dazhaos", 3, 11, "SkillInfo"] },
	GuanKaInfo: { 1: ["id", 2, 5], 2: ["count", 1, 13, , 0], 3: ["lastTime", 1, 1] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%88%9B%E5%BB%BA%E8%A7%92%E8%89%B2 ↓↓↓↓↓
	CreateRole_C2S: { 1: ["name", 2, 9], 2: ["cfgid", 2, 5], 3: ["sid", 2, 5] },
	RoleNeedRelogin_S2C: { 1: ["state", 2, 5], 2: ["ip", 1, 9] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%88%98%E6%96%97%E6%95%B0%E6%8D%AE%E9%80%9A%E4%BF%A1 ↓↓↓↓↓
	FightCommand: { 1: ["time", 2, 5], 2: ["type", 2, 5], 3: ["datas", 3, 9] },
	MUnitEntity: { 1: ["guid", 2, 5], 2: ["xattr", 2, 11, "XAttr"], 3: ["pst", 2, 9], 4: ["team", 2, 5], 5: ["cloth", 2, 9], 6: ["x", 2, 5], 7: ["y", 2, 5], 8: ["skills", 3, 11, "SkillInfo"], 9: ["weapon", 1, 9], 10: ["wing", 1, 9], 11: ["name", 1, 9] },
	XAttr: { 1: ["maxhp", 1, 5, , 0], 2: ["wugong", 1, 5, , 0], 3: ["wufang", 1, 5, , 0], 4: ["fagong", 1, 5, , 0], 5: ["fafang", 1, 5, , 0], 6: ["mingzhong", 1, 5, , 0], 7: ["shanbi", 1, 5, , 0], 8: ["baoji", 1, 5, , 0], 9: ["renxing", 1, 5, , 0], 10: ["bisha", 1, 5, , 0], 11: ["chuantou", 1, 5, , 0], 12: ["shenfa", 1, 5, , 0] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%8A%80%E8%83%BD%E4%BF%A1%E6%81%AF ↓↓↓↓↓
	SkillInfo: { 1: ["id", 2, 5], 2: ["name", 1, 9], 3: ["rolename", 1, 9] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%8A%80%E8%83%BD%E7%9B%B8%E5%85%B3%E9%80%9A%E4%BF%A1 ↓↓↓↓↓
	NormalSkillInfo_S2C: { 1: ["skills", 3, 11, "SkillInfo"], 2: ["order0", 3, 5], 3: ["order1", 3, 5], 4: ["order2", 3, 5] },
	SetSkillOrder: { 1: ["follower", 2, 5], 2: ["id", 2, 5], 3: ["order", 2, 5] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%89%B9%E6%AE%8A%E6%8C%87%E4%BB%A4 ↓↓↓↓↓
	ModuleChange_S2C: { 1: ["mid", 2, 9], 2: ["open", 2, 8] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF ↓↓↓↓↓
	EquipSuiJi: { 1: ["key", 2, 9], 2: ["value", 2, 1] },
	ItemCount: { 1: ["id", 2, 5], 2: ["count", 1, 5, , 0] },
	ItemInfo: { 1: ["id", 2, 5], 2: ["cfgid", 2, 5], 3: ["slot", 1, 5, , 0], 4: ["rare", 1, 5], 5: ["expire", 1, 3], 6: ["suiji", 3, 11, "EquipSuiJi"], 7: ["count", 1, 5, , 1] },
	ItemsContext: { 1: ["result", 2, 11, "ItemsResult"], 2: ["changed", 3, 11, "ItemCount"] },
	ItemsResult: { 1: ["items", 3, 11, "ItemCount"], 2: ["newItems", 3, 11, "ItemInfo"], 3: ["exp", 1, 5], 4: ["money", 1, 5], 5: ["honor", 1, 5], 6: ["gold", 1, 5], 7: ["fame", 1, 5] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E7%A6%BB%E7%BA%BF%E6%95%B0%E6%8D%AE ↓↓↓↓↓
	OfflineData: { 1: ["time", 2, 5], 2: ["battleCount", 2, 5], 3: ["totalExp", 1, 1, , 0], 4: ["deltaLevel", 1, 5, , 0], 5: ["equips", 3, 11, "ItemInfo"], 6: ["ronglianCount", 1, 5, , 0], 7: ["totalMoney", 1, 5, , 0], 8: ["totalRongLian", 1, 5, , 0] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A3%85%E5%A4%87%E6%95%B0%E6%8D%AE ↓↓↓↓↓
	Add_S2C: { 1: ["items", 3, 11, "ItemInfo"] },
	CountChange_S2C: { 1: ["items", 3, 11, "ItemCount"] },
	DressSuccess_S2C: { 1: ["id", 2, 5], 2: ["slot", 1, 5] },
	Dress_C2S: { 1: ["id", 2, 5], 2: ["slot", 1, 5, , 1] },
	Use_C2S: { 1: ["id", 2, 5], 2: ["count", 1, 5, , 1] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A3%85%E5%A4%87%E7%86%94%E7%82%BC ↓↓↓↓↓
	RongLianSuccess_S2C: { 1: ["equids", 3, 5], 2: ["ronglianzhi", 1, 5, , 0], 3: ["equips", 3, 11, "ItemInfo"], 4: ["errEquids", 3, 5], 5: ["money", 1, 5, , 0] },
	RongLian_C2S: { 1: ["equids", 3, 5] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A7%92%E8%89%B2%E6%95%B0%E6%8D%AE ↓↓↓↓↓
	Follower: { 1: ["cfgid", 2, 5], 2: ["cloth", 1, 9], 3: ["weapon", 1, 9], 4: ["wing", 1, 9], 5: ["xattr", 2, 11, "XAttr"], 6: ["skills", 3, 11, "SkillInfo"] },
	Role: { 1: ["_id", 2, 1], 2: ["name", 2, 9], 3: ["sid", 2, 5], 4: ["level", 1, 5, , 1], 5: ["exp", 1, 1, , 0], 6: ["clanid", 1, 5], 7: ["items", 3, 11, "ItemInfo"], 8: ["followers", 3, 11, "Follower"], 9: ["money", 1, 5, , 0], 10: ["gold", 1, 5, , 0], 11: ["honor", 1, 5, , 0], 12: ["guanka", 2, 11, "GuanKaInfo"], 13: ["dazhao", 3, 11, "SkillInfo"], 14: ["offlineData", 1, 11, "OfflineData"], 15: ["bagNum", 1, 5, , 120], 16: ["fame", 1, 5], 17: ["res", 1, 5], 18: ["head", 2, 5] },
	RoleBase: { 1: ["_id", 2, 1], 2: ["name", 2, 9], 3: ["sid", 2, 5], 4: ["level", 2, 5], 5: ["head", 2, 5] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A7%92%E8%89%B2/%E4%BC%99%E4%BC%B4%E5%B1%9E%E6%80%A7%E5%8F%98%E5%8C%96 ↓↓↓↓↓
	XAttrChange_S2C: { 1: ["slot", 2, 5], 2: ["xattr", 2, 11, "XAttr"] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%80%9A%E7%94%A8%E6%95%B0%E6%8D%AE ↓↓↓↓↓
	Coord: { 1: ["x", 2, 5], 2: ["y", 2, 5], 3: ["map", 1, 5] },
	PageRequest: { 1: ["size", 2, 5], 2: ["startIndex", 1, 5, , 0], 3: ["version", 1, 5, , 0] },
	PageVersion: { 1: ["version", 2, 5], 2: ["total", 2, 5], 3: ["expired", 1, 1] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%80%9A%E7%94%A8%E9%94%99%E8%AF%AF ↓↓↓↓↓
	JError: { 1: ["code", 2, 5], 2: ["params", 3, 9] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE ↓↓↓↓↓
	ClanActiveSuccess_S2C: { 1: ["cfgid", 2, 5], 2: ["context", 2, 11, "ItemsContext"] },
	ClanBuyInfo: { 1: ["cfgid", 2, 5], 2: ["count", 1, 5, , 0] },
	ClanBuyInfoSuccess_S2C: { 1: ["list", 3, 11, "ClanBuyInfo"] },
	ClanBuySuccess_S2C: { 1: ["cfgid", 2, 5], 2: ["count", 1, 5, , 1], 3: ["total", 1, 5, , 0], 4: ["context", 2, 11, "ItemsContext"] },
	ClanCreateSuccess_S2C: { 1: ["honor", 2, 5], 2: ["info", 2, 11, "ClanInfo"] },
	ClanHongbaoInfo: { 1: ["id", 2, 5], 2: ["name", 2, 9] },
	ClanHongbaoInfoSuccess_S2C: { 1: ["list", 3, 11, "ClanHongbaoInfo"] },
	ClanHongbaoReceived: { 1: ["fame", 2, 5], 2: ["time", 2, 1], 3: ["name", 2, 9] },
	ClanHongbaoReceivedSuccess_S2C: { 1: ["fame", 2, 5, , 0], 2: ["list", 3, 11, "ClanHongbaoReceived"] },
	ClanHongbaoSent: { 1: ["gold", 2, 5], 2: ["state", 2, 5], 3: ["time", 2, 1], 4: ["totalNum", 2, 5], 5: ["num", 1, 5] },
	ClanHongbaoSentSuccess_S2C: { 1: ["gold", 2, 5, , 0], 2: ["list", 3, 11, "ClanHongbaoSent"] },
	ClanInfo: { 1: ["id", 2, 1], 2: ["name", 2, 9], 3: ["master", 2, 9], 4: ["level", 1, 5, , 1], 5: ["res", 1, 1, , 0], 6: ["num", 1, 5, , 1] },
	ClanJoinFailed_S2C: { 1: ["state", 2, 5], 2: ["list", 3, 11, "ClanLimitInfo"] },
	ClanJoinSuccess_S2C: { 1: ["info", 2, 11, "ClanInfo"], 2: ["rank", 2, 5], 3: ["notice", 1, 9] },
	ClanJuanxianSuccess_S2C: { 1: ["id", 2, 5], 2: ["fame", 2, 5], 3: ["myRes", 2, 5], 4: ["res", 2, 5] },
	ClanKickSuccess_S2C: { 1: ["id", 2, 1], 2: ["name", 2, 9] },
	ClanLimitInfo: { 1: ["id", 2, 5], 2: ["value", 2, 5] },
	ClanLimitInfoSuccess_S2C: { 1: ["list", 3, 11, "ClanLimitInfo"] },
	ClanLimitUpdateSuccess_S2C: { 1: ["list", 3, 11, "ClanLimitInfo"] },
	ClanLimitUpdate_C2S: { 1: ["list", 3, 11, "ClanLimitInfo"] },
	ClanListSuccess_S2C: { 1: ["startIndex", 2, 5], 2: ["list", 3, 11, "ClanInfo"], 3: ["version", 1, 11, "PageVersion"] },
	ClanMemberInfo: { 1: ["id", 2, 1], 2: ["level", 2, 5], 3: ["name", 2, 9], 4: ["zhanli", 2, 1], 5: ["res", 1, 1], 6: ["titleid", 1, 5, , 3], 7: ["time", 1, 1, , 0] },
	ClanMemberInfoSuccess_S2C: { 1: ["list", 3, 11, "ClanMemberInfo"] },
	ClanOpenHongbaoSuccess_S2C: { 1: ["id", 2, 5], 2: ["fame", 2, 5] },
	ClanQuitSuccess_S2C: { 1: ["id", 1, 1], 2: ["name", 1, 9] },
	ClanSendHongbaoSuccess_S2C: { 1: ["needgold", 2, 5], 2: ["gold", 2, 5], 3: ["honor", 2, 5] },
	ClanShanrangSuccess_S2C: { 1: ["list", 3, 11, "ClanTitleInfo"] },
	ClanTitleInfo: { 1: ["id", 2, 1], 2: ["titleid", 2, 5] },
	ClanUpgradeSuccess_S2C: { 1: ["level", 2, 5], 2: ["res", 2, 1] },
	MyClanInfo: { 1: ["titleid", 1, 5, , 3], 3: ["juanxianNum", 1, 5, , 0], 4: ["res", 1, 5] },
	MyClanInfoSuccess_S2C: { 1: ["myinfo", 2, 11, "MyClanInfo"], 2: ["info", 2, 11, "ClanInfo"], 3: ["rank", 2, 5], 4: ["notice", 1, 9] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//↓↓↓↓↓ http://192.168.0.205:1234/hqgH5/wiki/wikis/GM%E6%8C%87%E4%BB%A4 ↓↓↓↓↓
	SendGMCmd_C2S: { 1: ["params", 3, 9] },
	//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
}