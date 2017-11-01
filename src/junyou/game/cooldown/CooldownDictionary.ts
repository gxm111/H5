module junyou.game {
    /**
     * Cooldown集合
     * @author pb
     */
    export class CooldownDictionary {

        /*cd集合 key:ICooldown.key, value:Cooldown*/
        public cdObj: Object;

        /*添加cd*/
        public addCD(cd: Cooldown): void {
            if (!this.cdObj) {
                this.cdObj = {};
            }
            this.cdObj[cd.icd.key] = cd;
        }

        /*移除cd*/
        public removeCD(key: string): Cooldown {
            let cd: Cooldown = this.cdObj[key];
            delete this.cdObj[key];
            return cd;
        }
    }
}