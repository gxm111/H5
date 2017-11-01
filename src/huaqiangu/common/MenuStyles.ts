module junyou.hqg {

    /**
     * @author gushuai
     * 菜单样式
     * 
     * @export
     * @class Menustyles
     */
    export class MenuStyles {

        private static _skillstyle: sui.MenuStyle<SkillItemMenuRender>;
        public static get skill_style(): sui.MenuStyle<SkillItemMenuRender> {
            if (!this._skillstyle) {
                this._skillstyle = <sui.MenuStyle<SkillItemMenuRender>>{ uikey: "lib", renderClass: SkillItemMenuRender, scalebg: "bmd.scale9.MenuBg", possize: new egret.Rectangle(10, 5, 387, 40), align: 0 };
            }
            return this._skillstyle;
        }

        private static _clanMemberStyle: sui.MenuStyle<ClanMemberMenuItemRenderer>;
        public static get clanMemberStyle(): sui.MenuStyle<ClanMemberMenuItemRenderer> {
            if (!this._clanMemberStyle) {
                this._clanMemberStyle = <sui.MenuStyle<ClanMemberMenuItemRenderer>>{ uikey: "lib", renderClass: ClanMemberMenuItemRenderer, scalebg: "bmd.scale9.MenuBg", possize: new egret.Rectangle(20, 5, 402, 40), align: 0 };
            }
            return this._clanMemberStyle;
        }
    }
}