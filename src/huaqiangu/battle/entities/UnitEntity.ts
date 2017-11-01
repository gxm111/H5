module junyou.hqg {

    enum UnitEntityState {
        /**
         * 待机
         */
        standby = 0,
        /**
         * 正在攻击
         */
        attacking = 1,
        /**
         * 死亡
         */
        dead = 2
    }

    /**
     * 单位实体
     * @author 3tion
     */
    export class UnitEntity implements IEntity, IRecyclable {

        public guid: number;

        public data: MUnitEntity;

        public x: number;
        public y: number;

        private static _unitSetting: game.UnitSetting;

        public static get unitSetting() {
            let setting = this._unitSetting;
            if (!setting) {
                this._unitSetting = setting = new game.UnitSetting();
                setting.addToEngine = false;
            }
            return setting;
        }

        protected _disposed: boolean;

        public get disposed() {
            return this._disposed;
        }
        /**
         * 对应视图显示对象
         */
        protected _unit: GUnit;
        /**
         * 对应视图显示对象
         */
        public get unit() {
            return this._unit;
        }

        /**
         * 当前血量
         * 
         * @type {number}
         */
        public hp: number;

        /**
         * 仇恨列表
         * 
         * @protected
         * @type {number}
         */
        protected threatList: EnemyVO[] = [];

        /**
         * 下次执行AI的时间
         */
        protected _aiTime: number = 0;

        /**
         * 当前选择要攻击的目标
         */
        protected _target: UnitEntity;

        /**
         * 技能列表
         * 
         * @protected
         * @type {SkillVO[]}
         */
        protected _skills: SkillVO[] = [];

        /**
         * 技能释放索引
         */
        protected _skillIdx: number = 0;

        /**
         * 最小射程的平方
         * 
         * @protected
         * @type {number}
         */
        protected _minSqRange: number = 3600;

        constructor() {
            // super();
            this.initStateHandler();
        }

        /**
         * 增加hp
         * 
         * @param {number} plusHp hp增量，治疗为正数，伤害为负数
         */
        public addHp(plusHp: number) {
            if (plusHp) {
                let nHp = this.hp + plusHp;
                let max = this.data.xattr.maxhp;
                this.hp = nHp = Math.clamp(nHp, 0, max);
                this.unit.hpbar.current = nHp;
            }
        }

        /**
         * 处理状态机
         * 
         * @protected
         */
        protected initStateHandler() {
            let stateHandler = this.stateHandler = {};
            stateHandler[UnitEntityState.standby] = this.sH_standby;
            stateHandler[UnitEntityState.attacking] = this.sH_attacking;
            stateHandler[UnitEntityState.dead] = this.sH_dead;
        }

        /**
         * 对数据进行预检测
         */
        public preCheck(unknownSkills: number[]) {
            let skillData = DataLocator.getData(game.ConfigKey.JiNeng);
            for (let skillInfo of this.data.skills) {
                let skillid = skillInfo.id;
                let skill = skillData[skillid];
                if (!skill) {
                    ThrowError(`使用了客户端配置中未知的技能，技能ID：${skillid}`);
                    unknownSkills.push(skillid);
                }
            }
        }

        public create(now: number) {
            let data = this.data;
            let unit = this._unit;
            if (!unit) {
                this._unit = unit = new GUnit(data.pst, UnitEntity.unitSetting);
            }
            this.guid = data.guid;
            let max = data.xattr.maxhp;
            this.hp = max;
            unit.guid = data.guid;
            var hpbar = this.unit.hpbar;
            hpbar.current = max;
            hpbar.max = max;
            unit.resetRenderTime(now);
            unit.pst = data.pst;
            unit.setCloth(data.cloth);
            unit.setWeapon(data.weapon);
            unit.setWing(data.wing);
            this.x = unit.x = data.x;
            this.y = unit.y = data.y;
            this._state = UnitEntityState.standby;
            let skillData = DataLocator.getData(game.ConfigKey.JiNeng);
            let skills = this._skills;
            let minSqRange = Number.MAX_VALUE;
            if (data.skills) {
                for (let skillInfo of data.skills) {
                    let skillid = skillInfo.id;
                    let skill: JiNengCfg = skillData[skillid];
                    if (skill) {
                        if (skill.sqRange < minSqRange) {
                            minSqRange = skill.sqRange;
                        }
                        skills.push(SkillVO.getInstance(skill));
                    } else if (DEBUG) {
                        ThrowError(`正式创建单位时，仍然没有得到正确的技能配置，技能ID：${skillid}`);
                    }
                }
            }
            if (minSqRange == Number.MAX_VALUE) {
                minSqRange = 3400;
            } else {
                minSqRange -= 200;
            }
            this._minSqRange = minSqRange;
            unit.addedToEngine(false);
        }

        /**
         * 对某个目标添加仇恨
         * 
         * @param {UnitEntity} entity
         * @param {number} threat
         */
        public addThreat(entity: UnitEntity, threat: number) {
            let enemy: EnemyVO;
            for (enemy of this.threatList) {
                if (enemy.entity == entity) {
                    enemy.threat += threat;
                    return;
                }
            }
            enemy = EnemyVO.getInstance();
            enemy.entity = entity;
            enemy.threat = threat;
            this.threatList.push(enemy)
        }

        /**
         * 单位状态
         */
        protected _state: UnitEntityState;

        /**
         * 状态处理器
         * 
         * @protected
         * @type {{ [index: number]: { (controller: FightController, now: number) } }}
         */
        protected stateHandler: { [index: number]: { (controller: FightController, now: number) } };
        /**
         * 死亡状态
         * 
         * @protected
         * @param {FightController} controller (description)
         * @param {number} now (description)
         */
        protected sH_dead(controller: FightController, now: number) {
            if (this.unit.state == game.UnitState.Dead) {
                // 单位已经死透了，销毁单位
                this.dispose();
            }
        }
        /**
         * 待机状态
         * 
         * @protected
         * @param {FightController} controller (description)
         * @param {number} now (description)
         */
        protected sH_standby(controller: FightController, now: number) {
            let threatList = this.threatList;
            let max: UnitEntity;
            if (threatList.length) {
                let maxThreat = 0;
                threatList.forEach(en => {
                    let ent = en.entity;
                    if (ent && !ent._disposed && ent.hp > 0 && en.threat > maxThreat) {
                        maxThreat = en.threat;
                        max = ent;
                    }
                })
            }
            if (!max) {// 如果没有最大仇恨目标，查找敌对目标中，离自己最近的实体
                let opps = controller.getOppsTeam(this.data.team);
                let min = Number.MAX_VALUE;
                for (let entity of opps) {
                    if (entity._disposed || entity.hp <= 0) {
                        continue;
                    }
                    let dist = FightController.getSQDist2(this, entity);
                    if (dist < min) {
                        min = dist;
                        max = entity;
                    }
                }
            }
            if (max) {
                this._state = UnitEntityState.attacking;
                this._target = max;
                this._aiTime = now + controller.frameTime;
            }

        }
        /**
         * 攻击状态
         * 
         * @protected
         * @param {FightController} controller (description)
         * @param {number} now (description)
         */
        protected sH_attacking(controller: FightController, now: number) {
            let target = this._target;
            if (target.hp <= 0) {// 目标死亡
                this._target = undefined;
                this._state = UnitEntityState.standby;
                this._aiTime = now + 3 * controller.frameTime;
                return;
            }

            // 目标活着，先检查可用技能和技能射程
            let start = this._skillIdx;
            let len = this._skills.length;
            let sqdist = FightController.getSQDist2(this, target);
            let x12 = this.data.xattr.shenfa;
            /**
             * 所有技能在射程之内
             */
            for (let i = 0; i < len; i++) {
                if (start >= len) {
                    start = 0;
                }
                let skill = this._skills[start++];
                // 先检查技能射程
                if (!skill.checkDist(sqdist)) {
                    continue;
                }
                if (skill.cast(now, x12)) {
                    this._skillIdx = start;
                    // TODO 检查技能检测类型，检测目标，暂时只做单点的技能
                    // 释放技能
                    // 做技能释放
                    let cfg = skill.cfg;
                    let context = SkillContext.getInstance();
                    context.caster = this;
                    context.controller = controller;
                    context.mainTarget = target;
                    context.skillCfg = cfg;
                    this._unit.startUnitAction(AttackAction.getOperator(cfg.mobanCfg.opid, context), now);
                    this._aiTime = now + cfg.actionTime;
                    return;
                }
            }
            // 没有可用使用的技能
            // 所有技能在射程之内
            // 像目标移动
            if (sqdist > this._minSqRange) {
                this._unit.startUnitAction(WalkAction.getInstance(target.x, target.y), now);
                this._aiTime = now + 200;
            } else {
                this._unit.startUnitAction(undefined, now);
            }

        }

        /**
         * 数据处理帧
         * 
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doData(controller: FightController, now: number) {
            if (this.hp <= 0) {
                this._state = UnitEntityState.dead;
            }
            let unit = this._unit;
            unit.doData(now);
            this.x = unit.x;
            this.y = unit.y;
            //  检查是否需要计算AI
            if (now >= this._aiTime) {
                let handler = this.stateHandler[this._state];
                handler.call(this, controller, now);
            }
        }
        /**
         * 数据渲染信息
         * 
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doRender(controller: FightController, now: number) {
            this._unit.doRender(now);
        }

        dispose() {
            this._disposed = true;
            UnitEntity._pool.recycle(this);
        }

        public clear() {
            // 清理仇恨列表
            for (let enemy of this.threatList) {
                enemy.recycle();
            }
            this.threatList.length = 0;
            // 清理技能列表
            for (let skill of this._skills) {
                skill.recycle();
            }
            this._skills.length = 0;
            this.data = undefined;
            this.guid = undefined;
            this._target = undefined;
        }

        onRecycle() {
            this.clear();
            this.unit.onRecycle();
            // this.unit = undefined;
        }

        onSpawn() {
            this._disposed = false;
            this._aiTime = 0;
        }

        private static _pool: RecyclablePool<UnitEntity> = new RecyclablePool(UnitEntity);

        public static getInstance() {
            return this._pool.getInstance();
        }
    }
}