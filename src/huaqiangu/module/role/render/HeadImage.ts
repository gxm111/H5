module junyou.hqg{
    export class HeadImage extends egret.Sprite{
        private head:sui.Image;
        private hero:HeroVO;
        public constructor(){
            super();
            this.init();
        }

        private init(){
            this.head = new sui.Image();
            this.addChild(this.head);
        }

        /**设置主角圆头像 */
        //1:男1;2:女1;3:男2;4:女2;5:男3;6:女3
        public setHeroCircleHead(){
            let hero = Core.$hero;
            if(!hero.head){
                return;
            }
            let url:string = "i/headicon_"+hero.head+Extension.PNG;
            this.head.source = url;
        }

        /**设置主角方头像 */
        //1:男1;2:女1;3:男2;4:女2;5:男3;6:女3
        public setHeroRectHead(){
            let hero = Core.$hero;
            if(hero.followers[0]){
                this.setFollowerHead(hero.followers[0]);
            }
        }

        /**设置随从方头像 */
        public setFollowerHead(follower:Follower){
            let id = follower.cfgid;
            if(!id)return;
            let url:string;
            switch(id){
                case 1://男
                url = "";
                break;
                case 2://女
                url="";
                break;
            }
            this.head.source = url;
        }

        public clear(){
            this.head.source = null;
        }
    }
}