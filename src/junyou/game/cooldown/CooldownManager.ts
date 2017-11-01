module junyou.game {
    /**
     * 时间冷却管理器
     * @author pb
     */
    export class CooldownManager {

        private _cdDicObj: Object;
        private _cdObj: Object;
        /*运行中的cd列*/
        private _cdArr: Cooldown[];

        constructor() {
            this._cdDicObj = {};
            this._cdObj = {};
            this._cdArr = [];
        }

        /*注册CD*/
        public register(icd: ICooldown): void {
            if (icd.cd) {
                let cdDic: CooldownDictionary = this._cdDicObj[icd.cd];
                if (!cdDic) {
                    cdDic = new CooldownDictionary();
                    this._cdDicObj[icd.cd] = cdDic;
                }
                let cd: Cooldown = new Cooldown();
                cd.icd = icd;
                cdDic.addCD(cd);
                this._cdObj[icd.key] = cd;
            }
        }

        /**
		 * 销毁某个CD
		 */
        public dispose(key: string): void {
            let cd: Cooldown = this._cdObj[key];
            if (cd) {
                let icd: ICooldown = cd.icd;
                let cdDic: CooldownDictionary = this._cdDicObj[icd.cd];
                if (cdDic) {
                    cd = cdDic.removeCD(icd.key);
                    cd.dispose();
                }
                this._cdArr.remove(cd);
            }
            delete this._cdObj[key];
        }

        /**
        * 添加CD显示项
        */
        public addDisplay(key: string, icdDisplay: ICooldownDisplay): void {
            let cd: Cooldown = this._cdObj[key];
            if (cd)
                cd.addICDDisplay(icdDisplay);
        }

        /**
		 * 删除CD项
		 */
        public removeDisplay(key: string, icdDisplay: ICooldownDisplay): void {
            let cd: Cooldown = this._cdObj[key];
            if (cd)
                cd.removeICDDisplay(icdDisplay);
        }

        /**
         * 数据处理
         * @param {number} delta 时间增量
         */
        public doData(delta: number): void {
            if (this._cdArr.length > 0) {
                let cdArr: Cooldown[] = this._cdArr;
                let len: number = cdArr.length;
                for (let index = len - 1; index >= 0; index--) {
                    let cd: Cooldown = cdArr[index];
                    if (cd) {
                        cd.doData(delta);
                        if (cd.state == Cooldown.STOP)
                            this._cdArr.splice(index, 1);
                    }
                }
            }
        }

        /*渲染处理*/
        public doRender(delta: number): void {
            if (this._cdArr.length > 0) {
                let cdArr: Cooldown[] = this._cdArr;
                let len: number = cdArr.length;
                for (let index = len - 1; index >= 0; index--) {
                    let cd: Cooldown = cdArr[index];
                    if (cd) {
                        cd.doRender(delta);
                    }
                }
            }
        }

        /**
         * 添加CD
         * @param ICooldown
         */
        public add(icd: ICooldown): void {
            let cdDic: CooldownDictionary;
            let cd: Cooldown;
            cdDic = this._cdDicObj[icd.cd];
            let cdObj: Object;
            if (cdDic) {
                cdObj = cdDic.cdObj;
                for (let key in cdObj) {
                    if (cdObj.hasOwnProperty(key)) {
                        cd = cdObj[key];
                        if (cd) {
                            cd.start();
                            this._cdArr.pushOnce(cd);
                        }
                    }
                }
            }
        }

        /**
		 * 移除CD
		 * @param ICooldown
		 *
		 */
        public remove(icd: ICooldown): void {
            let cdDic: CooldownDictionary;
            let cd: Cooldown;
            cdDic = this._cdDicObj[icd.cd];
            let cdObj: Object;
            if (cdDic) {
                cdObj = cdDic.cdObj;
                for (let key in cdObj) {
                    if (cdObj.hasOwnProperty(key)) {
                        cd = cdObj[key];
                        if (cd) {
                            cd.stop();
                            this._cdArr.remove(cd);
                        }
                    }
                }
            }
        }

        /**
		 * 重置CD时间<br/>
		 * 由于基于服务器时间戳，<font color='#ff0000'><b>需要等拿到服务器时间戳以后</b></font>，才可以进行CD的设置
		 * @param serverData		<br/>
		 * 	key		String		cdid<br/>
		 * 	value	Number	CD到期的服务器时间戳
		 *
		 */
        public reset(serverData: Object): void {
            let serverTime: number = DateUtils.serverTime;
            var cdObj = this._cdObj;
            let cd: Cooldown;
            let expireTime: number;
            let leftTime: number;
            for (let id in serverData) {
                cd = cdObj[id];
                if (cd) {
                    //停止cd
                    cd.stop();
                    this._cdArr.remove(cd);
                    expireTime = serverData[id] || 0;
                    //剩余时间
                    leftTime = expireTime - serverTime;
                    cd.icd.cd = leftTime;
                }
            }
        }

    }
}