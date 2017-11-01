module junyou.hqg {



    /**
     * 战斗控制器
     */
    export class FightController {
        private static _instance: FightController;
        public static getInstance(): FightController {
            return FightController._instance || (FightController._instance = new FightController());
        }

        private _guidCount: number;

        /**
         * 上次tick的时间
         * 
         * @type {number}
         */
        public lastTickTime: number;

        /**
         * 当前时间线
         * 
         * @type {number}
         */
        public timeline: number;

        /**
         * 战斗起始时间
         * 
         * @type {number}
         */
        public startTime: number;

        /**
         * 每帧的时间
         * 
         * @type {number}
         */
        public frameTime: number;


        /**
         * 单位每帧处理的排序函数
         * 
         * @type {(a: IEntity, b: IEntity, seed: number, timeline: number) => number}
         */
        public sortHandler: (a: IEntity, b: IEntity, seed: number, timeline: number) => number = this.defaultSort;

        /**
         * 所有单位的列表
         * 包括特效实体
         * @private
         * @type {IEntity[]}
         */
        private _entities: IEntity[];

        private _tempEntities: IEntity[];


        /**
         * 实体字典
         */
        private _entitieDict: { [index: string]: IEntity };

        /**
         * 获取实体单位
         */
        public getEntity(guid: number) {
            return this._entitieDict[guid];
        }


        /**
         * 队伍数组
         * 
         * @private
         * @type {UnitEntity[][]}
         */
        private _teams: UnitEntity[][];

        /**
         * 所有Unit
         * 
         * @private
         * @type {UnitEntity[]}
         */
        private _units: UnitEntity[];


        public get units() {
            return this._units;
        }

        /**
         * 获取敌对队伍的单位
         * 
         * @returns {UnitEntity[]} (description)
         */
        public getOppsTeam(myTeam: number): UnitEntity[] {
            let opp = myTeam == 1 ? 0 : 1;
            return this._teams[opp];
        }

        /**
         * 获取己方队伍的单位
         * 
         * @param {number} myTeam (description)
         * @returns {UnitEntity[]} (description)
         */
        public getMyTeam(myTeam: number): UnitEntity[] {
            return this._teams[myTeam];
        }

        /**
         * 附加指令，主要用于接收已生成的指令
         */
        private _extraCmds: FightCommand[];

        /**
         * 存放此次战斗过程中，用户产生的指令
         * 
         * @private
         * @type {FightCommand[]}
         */
        private _userCmds: FightCommand[];

        private _callLater: CallLater;

        /**
         * 战斗编号
         * 
         * @private
         * @type {number}
         */
        private _battleID: number;

        // /**
        //  * 两个坐标的距离字典
        //  * 
        //  * @private
        //  * @type {{ [index: string]: number }}
        //  */
        // private _distDict: { [index: string]: number };

        /**
         * 种子
         */
        public seed: number;

        /**
         * 用于随机的值
         */
        private _plus: number;

        private _callback: CallbackInfo;

        private _heroEntity: UnitEntity;

        private _map: string;

        private _mapInfo: game.MapInfo;

        /**
         * tween管理器
         * 
         * @private
         * @type {BattleTweenManager}
         */
        private _tweenManager: BattleTweenManager;

        constructor() {
            this.init();
        }

        protected init() {
            this._entitieDict = {};
            this._entities = [];
            this._tempEntities = [];
            this._units = [];
            this._teams = [[], []];
            // this._distDict = {};
            this.frameTime = 10;
            this._tweenManager = new BattleTweenManager();
            this._callLater = new CallLater();
            this._heroEntity = new UnitEntity();
            this._mapInfo = DataLocator.getData(game.ConfigKey.MAP);
        }

        /**
         * 开始一场战斗
         * 
         * @param {number} seed  种子
         * @param {UnitEntity[]} input 初始进入场景的单位列表
         * @param {CallbackInfo} callback 结束回调
         * @param {number} battleID 战斗编号
         * @param {any[]} [extraCmds] 附加的操作指令
         */
        public start(map: string, seed: number, input: MUnitEntity[], callback: CallbackInfo, battleID: number, extraCmds?: FightCommand[]) {
            if (map != this._map) {
                this._map = map;
                this._mapInfo.path = map;
                game.GameEngine.instance.enterMap(this._mapInfo);
            }
            // 重置动态guid数
            this._guidCount = 0;
            this._battleID = battleID;
            this.timeline = 0;
            this.seed = seed;
            this._callback = callback;
            this._extraCmds = extraCmds;
            let self = this;
            // //主角guid
            input.forEach(item => {
                let entity = UnitEntity.getInstance();
                entity.data = item;
                self.addEntity(entity);
            })
            let now = Global.now;
            this.startTime = now;
            this.lastTickTime = now;
            this._plus = 0;
            this.onRender();
            egret.sys.$TempStage.addEventListener(egret.Event.ENTER_FRAME, this.onRender, this, false, 999999);
        }

        /**
         * 战斗结束，产生结果
         * 
         * @param {number} result
         * 0 无人获胜
         * 1 1 队获胜
         * 2 0 队获胜
         * 3 两队打平
         */
        public end(result: number) {
            // 得到team 0的单位坐标信息
            let coords: Coord[] = [];
            let team0 = this._teams[0];
            if (team0) {
                for (let i = 0, len = team0.length; i < len; i++) {
                    let en = team0[i];
                    if (en) {
                        coords[i] = { x: en.x, y: en.y };
                    }
                }
            }
            this.recycle();
            let callback = this._callback;
            if (callback) {
                this._callback = undefined;
                callback.call(result, this.seed, this._battleID, this._userCmds, coords);
                callback.recycle();
            }
        }
        /**
         * 游戏结束，进行回收
         * 
         * @private
         */
        private recycle() {
            egret.sys.$TempStage.removeEventListener(egret.Event.ENTER_FRAME, this.onRender, this, false);
            for (let entity of this._entities) {
                // if (entity != this._heroEntity) {
                delete this._entitieDict[entity.guid];
                entity.dispose();
                // }
            }
            this._teams[0].length = 0;
            this._teams[1].length = 0;
            this._entities.length = 0;
            this._units.length = 0;
            this._tempEntities.length = 0;
            this._tweenManager.removeAllTweens();
        }

        /**
         * 添加实体到控制器中
         * 
         * @param {IEntity} entity 实体
         */
        public addEntity(entity: IEntity) {
            if (!entity.guid) {
                entity.guid = this.getEntityGuid();
            }
            if (entity instanceof UnitEntity) {
                this._units.push(entity);
                this._teams[entity.data.team].push(entity);
                // 创建到场景中
                entity.create(this.timeline);
            }
            this._entities.push(entity);
            this._entitieDict[entity.guid] = entity;
        }

        /**
         * 动态创建的实体guid
         * 
         * @returns {number} 动态生成guid
         */
        public getEntityGuid(): number {
            return this._guidCount--;
        }

        /**
         * 默认排序
         * 
         * @private
         * @param {IEntity} a
         * @param {IEntity} b
         * @param {number} seed
         * @param {number} timeline
         * @returns {number}
         */
        private defaultSort(a: IEntity, b: IEntity, seed: number, timeline: number): number {
            return ((a.guid * seed - timeline) % 0xcfcf) - ((b.guid * seed - timeline) % 0xcfcf);
        }

        public onRender() {
            let callLater = this._callLater;
            let tm = this._tweenManager;
            let dNow = Global.now;
            let lastTime = this.lastTickTime;
            let frameTime = this.frameTime;
            let startTime = this.startTime;
            let sortHandler = this.sortHandler;
            let entities = this._entities;
            let tempEntities = this._tempEntities;
            // 渲染总时间
            let renderTime = dNow - startTime;
            let nextTick = lastTime + frameTime;
            let teams = this._teams;
            let units = this._units;
            /**
             * 0 无人获胜
             * 1 1 队获胜
             * 2 0 队获胜
             * 3 两队打平
             */
            let win: number;
            while (nextTick <= dNow) {   // 检查跳过的帧，所有碰撞检测，AI检测都在帧中处理
                // this.clearDistance();
                lastTime = nextTick;
                this.lastTickTime = lastTime;
                let timeline = lastTime - startTime;
                this.timeline = timeline;
                let seed = this.seed;
                // 移除前一帧需要移除的entity
                let i: number, entity: IEntity, len = 0;
                entities.forEach(entity => {
                    if (!entity.disposed) { // 保留未销毁的实体
                        entities[len++] = entity;
                    }
                })
                entities.length = len;
                // 对 entity 排序
                entities.sort((a: IEntity, b: IEntity) => {
                    return sortHandler(a, b, seed, timeline);
                });
                win = 0;
                // 检查队伍中需要销毁的实体
                teams.forEach((team, idx) => {
                    i = this.getUnDisposedUnits(team);
                    if (i == 0) {
                        win |= 1 << idx;
                    }
                })
                if (win) {
                    // 有人获胜或者打平
                    this.end(win);
                    return;
                }
                this.getUnDisposedUnits(this._units);

                //处理延迟处理的函数
                callLater.tick(lastTime);

                // tween做数据处理
                tm.doData(frameTime);

                // 做一份entity的副本，防止做tick的时候，新增加实体，如发射箭矢，召唤单位等
                for (i = 0; i < len; i++) {
                    tempEntities[i] = entities[i];
                }

                for (i = 0; i < len; i++) {
                    entity = tempEntities[i];
                    entity.doData(this, timeline);
                    this.seed ^= entity.guid | timeline;// 每次doData，改变一次种子
                }
                nextTick = lastTime + frameTime;
            }

            // 渲染
            entities.forEach(entity => {
                if (!entity.disposed) {
                    entity.doRender(this, renderTime);
                }
            })
            // tween做渲染
            let delta = dNow - this.lastTickTime;
            tm.tick(delta);

            // 暂时使用第一个单位作为镜头跟踪的单位
            // TODO 摄像机其他逻辑
            game.GameEngine.instance.camera.lookat(this._units[0].unit);
        }

        /**
         * 获取未销毁的单位
         * 
         * @param {UnitEntity[]} input     待检查的单位数组
         * @param {UnitEntity[]} [output]  输出的单位数组
         */
        public getUnDisposedUnits(input: UnitEntity[], output?: UnitEntity[]) {
            output = output || input;
            let i = 0;
            input.forEach(entity => {
                if (!entity.disposed) {
                    output[i++] = entity;
                }
            });
            output.length = i;
            return i;
        }
        /**
         * 获取活着的单位
         * 
         * @param {UnitEntity[]} input     待检查的单位数组
         * @param {UnitEntity[]} [output]  输出的单位数组
         */
        public getAlivedUnits(input: UnitEntity[], output?: UnitEntity[]) {
            output = output || input;
            let i = 0;
            input.forEach(entity => {
                if (!entity.disposed && entity.hp > 0) {
                    output[i++] = entity;
                }
            });
            output.length = i;
            return i;
        }

        // /**
        //  * 清理距离字典
        //  * 
        //  * @private
        //  */
        // private clearDistance() {
        //     let dict = this._distDict;
        //     for (let key in dict) {
        //         delete dict[key];
        //     }
        // }
        //
        // /**
        //  * 获取两个实体间的距离的平方
        //  * 
        //  * @param {UnitEntity} en1
        //  * @param {UnitEntity} en2
        //  * @returns {number} 两个实体间的距离的平方
        //  */
        // public getSquareDistance(en1: UnitEntity, en2: UnitEntity) {
        //     if (en1 === en2) {
        //         return 0;
        //     }
        //     let key = en1.guid > en2.guid ? en1.guid + "_" + en2.guid : en2.guid + "_" + en1.guid;
        //     let dict = this._distDict;
        //     if (key in dict) {
        //         return dict[key];
        //     } else {
        //         return dict[key] = this.squareDistance(en1, en2);
        //     }
        // }
        //


        /**
         * 获取两个有x，y坐标的单位在斜45°的距离平方
         * 
         * @param {{ x: number, y: number }} p1
         * @param {{ x: number, y: number }} p2
         * @returns
         */
        public static getSQDist2(p1: { x: number, y: number }, p2: { x: number, y: number }) {
            return this.getSQDist(p1.x, p1.y, p2.x, p2.y);
        }


        /**
         * 获取两个坐标斜45°的距离平方
         * 
         * @param {number} x1 (description)
         * @param {number} y1 (description)
         * @param {number} x2 (description)
         * @param {number} y2 (description)
         * @returns (description)
         */
        public static getSQDist(x1: number, y1: number, x2: number, y2: number) {
            x1 |= 0;
            y1 |= 0;
            x2 |= 0;
            y2 |= 0;
            let dx = x1 - x2;
            let dy = y1 - y2;
            return dx * dx + 4 * dy * dy;
        }

        /**
         * 随机数
         * 
         * @type {{ (max: number, min?: number): number }}
         */
        public random: { (max: number, min?: number): number } = (max: number, min: number = 0): number => {
            let result = min + (max - min) * this.battleRandom(max, this.seed, this.timeline, this._plus++);
            return result < 0 ? -result : result;
        }

        /**
         * 获取一个伪随机数，用于在战斗中的计算
         * 
         * @param {number} r            
         * @param {number} now (description)
         * @param {number} plus (description)
         * @returns {number} (description)
         */
        public battleRandom(r: number, seed: number, now: number, plus: number): number {
            return (r * (seed + plus) * now % 0xcfcf) / 0xcfcf;
        }


        /**
        * 战斗计算
        * 
        * @static
        * @param {UnitEntity} caster 施法者
        * @param {UnitEntity} target 目标
        * @param {SkillCfg} skill 技能配置
        * @param {DmgInfo} dmgInfo 伤害信息
        * @param {{ (max: number, min?: number): number }} random 随机算法
        */
        public cac(caster: UnitEntity, target: UnitEntity, skill: JiNengCfg) {
            if (skill.type == SkillType.NoDMG) {
                return;
            }
            let cXattr = caster.data.xattr;
            let tXattr = target.data.xattr;
            let dmgInfo = DmgInfo.getInstance();
            dmgInfo.target = target;
            dmgInfo.caster = caster;
            let random = this.random;
            if (random(cXattr.mingzhong + skill.mingzhong + 800, 100) < random(tXattr.shanbi, 0)) { // 未命中                
                dmgInfo.type = DmgType.Miss;
            } else {
                let baseDmg: number, critDmg: number = 0, dmg: number;
                if (skill.type == SkillType.Heal) { // 治疗技能
                    dmgInfo.type = DmgType.Heal;
                    baseDmg = cXattr.fagong * skill.fagong; // 治疗使用法伤 
                    if (baseDmg) {
                        if (random(cXattr.baoji) > random(5000)) { // 治疗暴击
                            dmgInfo.type |= DmgType.Critical;
                            critDmg = baseDmg * cXattr.bisha * 0.0001;
                        }
                        dmg = skill.data1 * baseDmg * 0.0001 + skill.data2 + critDmg;
                    } else {
                        dmg = skill.data2;
                    }
                    dmg = parseInt(dmg);
                    target.addHp(dmg);
                } else {// 伤害技能
                    dmgInfo.type = DmgType.Attack;
                    let wudmg, fadmg;
                    let pierceRate = cXattr.chuantou;
                    // 命中目标
                    if (skill.wugong) { // 是否需要计算物理攻击
                        let attack = cXattr.wugong;
                        let pierce = attack * pierceRate;
                        wudmg = (Math.max(attack - pierce - tXattr.wufang, 0) + pierce) * skill.wugong;
                    }
                    if (skill.fagong) { // 是否需要计算法术攻击
                        let attack = cXattr.fagong;
                        let pierce = attack * pierceRate;
                        fadmg = (Math.max(attack - pierce - tXattr.fafang, 0) + pierce) * skill.fagong;
                    }
                    baseDmg = wudmg + fadmg;
                    if (baseDmg) {
                        if (random(cXattr.baoji) > random(tXattr.renxing)) { // 出现暴击
                            dmgInfo.type |= DmgType.Critical;
                            critDmg = baseDmg * cXattr.bisha * 0.0001;
                        }
                        dmg = skill.data1 * baseDmg * 0.0001 + skill.data2 + critDmg;
                    } else {
                        dmg = skill.data2;
                    }
                    dmg = parseInt(dmg);
                    target.addHp(-dmg);

                    // 增加仇恨
                    caster.addThreat(target, dmg * skill.threat10 + skill.threat11)
                    target.addThreat(caster, dmg * skill.threat20 + skill.threat21);
                }
                dmgInfo.dmg = dmg;
            }
            return dmgInfo;
        }



        //*****************************播放动画相关*********************************/

        /**
         * 获取动画播放器
         * 
         * @param {string} uri (description)
         * @param {boolean} [play=true] (description)
         * @returns (description)
         */
        public getAniRender(uri: string, play = true) {
            var ani = game.AniRender.getAni(uri);
            if (play) {
                ani.play();
            }
            return ani;
        }

        private playAni(uri: string, x: number = 0, y: number = 0) {
            var ani = this.getAniRender(uri);
            var d = ani.display;
            d.x = x;
            d.y = y;
            return d;
        }

        /**
         * 按坐标播放动画
         * 
         * @param {string} uri 动画地址
         * @param {number} x (description)
         * @param {number} y (description)
         * @param {game.GameLayerID} layerID (description)
         */
        public playAniByPosition(uri: string, x: number, y: number, layerID: game.GameLayerID = game.GameLayerID.GameEffect) {
            // 特效暂不处理成IEntity，后面有需要再处理成IsEntity
            game.GameEngine.instance.getLayer(layerID).addChild(this.playAni(uri, x, y));
        }

        /**
         * 在角色施法点播放
         * 
         * @param {string} uri 动画地址
         * @param {UnitEntity} entity (description)
         */
        public playAniOnCastPoint(uri: string, entity: UnitEntity) {
            let unit = entity.unit;
            let pt = unit.getCastPoint();
            unit.addToBodyBuff(this.playAni(uri, pt.x, pt.y));
        }

        /**
         * 在角色施法点播放，在场景中播放
         * 
         * @param {string} uri 动画地址
         * @param {UnitEntity} entity 受创的目标实体
         * @param {game.GameLayerID} [layerID=game.GameLayerID.GameEffect] 播放的层级
         */
        public playAniOnCastPointGlobal(uri: string, entity: UnitEntity, layerID: game.GameLayerID = game.GameLayerID.GameEffect) {
            let unit = entity.unit;
            let pt = unit.getCastPoint();
            this.playAniByPosition(uri, pt.x + unit.x, pt.y + unit.y, layerID);
        }

        /**
         * 在受创点播放动画
         * 
         * @param {string} uri 动画地址
         * @param {UnitEntity} entity 受创的目标实体
         */
        public playAniOnTargetHurtPoint(uri: string, entity: UnitEntity) {
            let unit = entity.unit;
            unit.addToBodyBuff(this.playAni(uri, 0, unit.hurtY));
        }

        /**
         * 往目标实体的身上加特效
         * 
         * @param {string} uri 动画地址
         * @param {UnitEntity} entity 目标实体
         */
        public playAniOnTargetBody(uri: string, entity: UnitEntity) {
            entity.unit.addToBodyBuff(this.playAni(uri));
        }
        /**
         * 往目标实体的脚底加特效
         * 
         * @param {string} uri 动画地址
         * @param {UnitEntity} entity 目标实体
         */
        public playAniOnTargetHalo(uri: string, entity: UnitEntity) {
            entity.unit.addToHalo(this.playAni(uri));
        }
        /**
         * 往目标实体的头顶加特效
         * 
         * @param {string} uri 动画地址
         * @param {UnitEntity} entity 目标实体
         */
        public playAniOnTargetHead(uri: string, entity: UnitEntity) {
            entity.unit.addToHeadBuff(this.playAni(uri));
        }

        /**
         * 获取一个单位的tween
         * 
         * @param {*} target (description)
         * @param {CallbackInfo} [dataCallback] 回调函数的callback 必须形式为 (tween:BattleTween,timeline:number,args?:any[])
         * @param {*} [props] (description)
         * @param {*} [pluginData] (description)
         * @param {boolean} [override] (description)
         * @returns (description)
         */
        public getTween(target: any, dataCallback?: CallbackInfo, props?: any, pluginData?: any, override?: boolean) {
            let tween = this._tweenManager.get(target, props, pluginData, override);
            tween.dataCallback = dataCallback;
            tween.controller = this;
            if (dataCallback) {
                let args = dataCallback.args;
                if (args) {
                    args.unshift(tween);
                } else {
                    dataCallback.args = [tween];
                }
            }
            return tween;
        }

        /**
		 * 延迟执行
		 * 
		 * @static
		 * @param {Function} callback (description)
		 * @param {number} [time] (description)
		 * @param {*} [thisObj] (description)
		 * @param args (description)
		 */
        public callLater(callback: Function, time?: number, thisObj?: any, ...args) {
            this._callLater.callLater(callback, this.lastTickTime, time, thisObj, ...args);
        }

        /**
		 * 清理延迟
		 * 
		 * @static
		 * @param {Function} callback (description)
		 * @param {*} [thisObj] (description)
		 * @returns (description)
		 */
        public clearCallLater(callback: Function, thisObj?: any) {
            return this._callLater.clearCallLater(callback, thisObj);
        }
    }
}