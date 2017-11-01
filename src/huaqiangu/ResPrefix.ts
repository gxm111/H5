module junyou.game {
    export interface ResPrefixConstructor {
        /**
         * 刀光前缀
         */
        DaoGuang: string;
        /**
         * 角色武器
         */
        Weapon: string;
        /**
         * 翅膀前缀
         */
        Wing: string;
    }


    ResPrefix = {
        Cloth: "u/",
        DaoGuang: "d/",
        Weapon: "w/",
        Wing: "c/",
        ANI: "a/"
    };
}