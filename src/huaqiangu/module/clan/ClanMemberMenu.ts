module junyou.hqg {
    import LangUtil = junyou.LangUtil;
    /**
     * description
     * @author pb
     */
    export class ClanMemberMenu {

        /**
         * 这个函数会在renderer选中的时候自动触发一次，renderer引用也会传过来
         * 可以根据renderer的data情况，自己确定menuvo及需要的回调函数
         * 
         * 参数第1位 renderer
         * 参数第2位 menu
         * 
         * @static
         */
        public static initMenu = (...args) => {
            let renderer: ClanMemberListItemRenderer = args[0];
            let menu: sui.Menu = args[1];
            let vos = [];
            let vo;
            let labels = ClanMemberMenu.getLabels(renderer.getData(), renderer.model);
            if (labels) {
                let len: number = labels.length;
                for (let i = 0; i < len; i++) {
                    vo = <sui.MenuBaseVO>{};
                    vo.label = labels[i];
                    vos[i] = vo;
                    vo.callBack = ClanMemberMenu["btn" + i + "Click"];
                }
                menu.displayMenuDatas(vos);
            }
        }

        static getLabels(vo: ClanMemberInfoVO, model: ClanService): string[] {
            let arr;
            if (vo) {
                arr = [];
                arr.push(LangUtil.getMsg(232));
                let titleid = model.myClanInfoVO.titleid;

                if (vo.titleid == ClanTitle.Assistant) {
                    arr.push(LangUtil.getMsg(233));
                }
                else if (vo.titleid == ClanTitle.Member) {
                    arr.push(LangUtil.getMsg(234));
                }
                else {
                    arr.push(LangUtil.getMsg(233));
                }
                arr.push(LangUtil.getMsg(235));
                if (vo.id == Core.$hero._id) {
                    arr.push(LangUtil.getMsg(236));
                }
                else {
                    arr.push(LangUtil.getMsg(237));
                }

            }
            return arr;
        }

        /**
         * 查看玩家
         * 
         * @private
         * @static
         * @param {any} args
         */
        private static btn0Click(...args) {
            let renderer: ClanMemberListItemRenderer = args[0];
            //renderer.model.viewRole(renderer.getData().id);
        }

        /**
         * 将为弟子
         * 或升为长老
         * 
         * @private
         * @static
         * @param {any} args
         * 
         * @memberOf ClanMemberMenu
         */
        private static btn1Click(...args) {
            let renderer: ClanMemberListItemRenderer = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            let titleid = renderer.getData().titleid;
            if (titleid == ClanTitle.Master) {
                CoreFunction.showClientTips("不能将为弟子");
                return;
            }
            else if(titleid == ClanTitle.Assistant){
                renderer.model.clanAppoint({ id: renderer.getData().id, titleid: ClanTitle.Member });
            }
            else if(titleid == ClanTitle.Member){
                renderer.model.clanAppoint({ id: renderer.getData().id, titleid: ClanTitle.Assistant });
            }
        }
        /**
         * 禅让掌门
         * 
         * @private
         * @static
         * @param {any} args
         * 
         * @memberOf ClanMemberMenu
         */
        private static btn2Click(...args) {
            let renderer: ClanMemberListItemRenderer = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            if (renderer.getData().id != Core.$hero._id) {
                renderer.model.clanAppoint({ id: renderer.getData().id, titleid: 3 });
            }
            else {
                CoreFunction.showClientTips(238);
            }
        }
        /**
         * 踢出门派
         * 或退出门派
         * 
         * @private
         * @static
         * @param {any} args
         * 
         * @memberOf ClanMemberMenu
         */
        private static btn3Click(...args) {
            let renderer: ClanMemberListItemRenderer = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            if(renderer.getData().id != Core.$hero._id){
                renderer.model.clanKick(renderer.getData().id);
            }
            else{
                renderer.model.clanQuit();
            }
        }

    }
}