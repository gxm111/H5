module junyou.hqg {
    /**
     * 伤害类型
     * 
     * @export
     * @enum {number}
     */
    export enum DmgType {
        /**
         * 无伤技能
         */
        NULL = 0,
        /**
         * 未命中
         */
        Miss = 0b1,
        /**
         * 照成伤害
         */
        Attack = 0b10,
        /**
         * 造成治疗
         */
        Heal = 0b100,
        /**
         * 造成暴击
         */
        Critical = 0b1000000,
        /**
         * 伤害暴击
         */
        CriticalAttack = Critical | Attack,
        /**
         * 治疗暴击
         */
        CriticalHeal = Critical | Heal
    }
}