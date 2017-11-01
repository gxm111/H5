module junyou {
    /**
     * (description)
     * 
     * @export
     * @class EventConst
     */
    export const EventConst = {

        /**
         * 广播一条公告
         * 
         * @static
         * @type {string}
         * @data Object example:{chanel:int,value:"一条消息"}
         */
        SHOW_MSG_BY_CHANEL: "SHOW_MSG_BY_CHANEL",


        /**
         * 穿脱装备返回
         * 
         * @static
         * @type {string}
         */
        DRESS_EQUIP_RTN: "DRESS_EQUIP_RTN",
        /*-*begin 技能*-*/
        /**
         * 技能顺序改变
         * 
         * @static
         * @type {String}
         */
        SKILL_ORDER_CHANGE: "SKILL_ORDER_CHANGE",

        /**
         * 技能基本信息返回
         * 
         * @static
         * @type {string}
         */
        SKILL_BASEINFO_RTN: "SKILL_BASEINFO_RTN",

        
        SKILL_ANGER_SKILL_LOCK:"SKILL_ANGER_SKILL_LOCK",

        /*-*end 技能*-*/
        /**
         * 选中未选中
         * 
         * @static
         * @type {string}
         */
        CHOOSE_STATE_CHANGE: "CHOOSE_STATE_CHANGE",

        /*-*begin 背包*-*/
        /**
         * 物品变化
         */
        BAG_ITEMS_CHANGE: "BAG_ITEMS_CHANGE",
        /**
         * 背包格位数增加
         */
        BAG_NUM_CHANGE: "BAG_NUM_CHANGE",
        /*-*end 背包*-*/

        /*-*begin 熔炼*-*/
        RONGLIAN: "RONGLIAN",
        /*-*end 熔炼*-*/

        /*-*begin 门派*-*/
        /**
         * 我的门派信息
         */
        CLAN_MY_INFO: "CLAN_MY_INFO",
        /**
         * 门派信息
         */
        CLAN_INFO: "CLAN_INFO",
        /**
         * 门派公告
         */
        CLAN_NOTICE: "CLAN_NOTICE",
        /**
         * 门派升级
         */
        CLAN_UPGRADE: "CLAN_UPGRADE",
        /**
         * 门派红包
         */
        CLAN_SEND_HONGBAO: "CLAN_SEND_HONGBAO",
        /**
         * 门派捐献
         */
        CLAN_JUANXIAN: "CLAN_JUANXIAN",
        /**
         * 门派商店信息
         */
        CLAN_BUY_INFO: "CLAN_BUY_INFO",
        /**
         * 门派成员信息
         */
        CLAN_MEMBER_INFO: "CLAN_MEMBER_INFO",
        /**
         * 门派入门限制信息
         */
        CLAN_LIMIT_INFO: "CLAN_LIMIT_INFO",
        /**
         * 门派入门限制信息修改
         */
        CLAN_LIMIT_UPDATE: "CLAN_LIMIT_UPDATE",
        /**
         * 门派物品激活
         */
        CLAN_ACTIVE: "CLAN_ACTIVE",
        /**
         * 门派购买物品
         */
        CLAN_BUY: "CLAN_BUY",
        /**
         * 门派可领红包
         */
        CLAN_HONGBAO_INFO: "CLAN_HONGBAO_INFO",
        /**
         * 门派开红包
         */
        CLAN_HONGBAO_OPEN: "CLAN_HONGBAO_OPEN",
        /**
         * 门派接收过的红包
         */
        CLAN_HONGBAO_RECEIVED_INFO: "CLAN_HONGBAO_RECEIVED_INFO",
        /**
         * 门派发出过的红包
         */
        CLAN_HONGBAO_SENT_INFO: "CLAN_HONGBAO_SENT_INFO",
        /*-*end 门派*-*/

        /*-*begin sideMediator*-*/
        SIDE_MODULE_SHOW: "SIDE_MODULE_SHOW",

        SIDE_MODULE_HIDE: "SIDE_MODULE_HIDE",
        /*-*end sideMediator*-*/


        /*-*begin Role*-*/
        HERO_MONEY_CHANGE: "HERO_MONEY_CHANGE",

        HERO_GOLD_CHANGE: "HERO_GOLD_CHANGE",

        HERO_HONOR_CHANGE: "HERO_HONOR_CHANGE",

        HERO_LEVEL_CHANGE: "HERO_LEVEL_CHANGE",

        HERO_EXP_CHANGE: "HERO_EXP_CHANGE",
        /**
         * 主角或伙伴面板属性
         * 
         * @static
         * @type {string}
         */
        HERO_XATTR_CHANGE: "HERO_XATTR_CHANGE"

        /*-*end Role*-*/
    }
}