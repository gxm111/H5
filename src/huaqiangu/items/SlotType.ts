module junyou.hqg {
    /**
     * 格位类型
     * @author 3tion
     */
    export const SlotType = {
        /**
         * 背包中
         * 
         * @static
         * @type {number}
         */
        BAG: 0,
        /**
         * 角色身上
         * 
         * @static
         * @type {number}
         */
        ROLE: 1,
        /**
         * 伙伴1身上
         * 
         * @static
         * @type {number}
         */
        FOLLOWER1: 2,
        /**
         * 伙伴2身上
         * 
         * @static
         * @type {number}
         */
        FOLLOWER2: 3
    }

    /**
     * 角色/伙伴的格位数组
     */
    export const SlotForFollowers = [SlotType.ROLE, SlotType.FOLLOWER1, SlotType.FOLLOWER2];
}