module junyou.hqg {

    /**
    * Game
    */
    export class Game extends egret.DisplayObjectContainer {
        constructor() {
            super();
            junyou.Global.initTick();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {
            this.stage.dirtyRegionPolicy = "off";
            new mvc.Facade();
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");

        }

        private onConfigComplete(event: RES.ResourceEvent): void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup("preload");
        }

        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (event.groupName == "preload") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

                junyou.ConfigUtils.setData(//这个是测试用临时赋值
                    RES.getRes("game")
                );



                //设置登录地址和action地址
                var netService = new junyou.HttpNetService;
                let baseParam = egret["baseParams"];
                let aurl = "http://" + baseParam.ip + ":" + baseParam.port + "/a";
                let lurl = "http://" + baseParam.ip + ":" + baseParam.port + "/l";
                netService.reset(aurl, lurl);

                //解析配置数据
                var ConfigKey = game.ConfigKey;
                DataLocator.regParser(ConfigKey.MAP, MapConfigParser);
                DataLocator.regParser(ConfigKey.PST, PstConfigParser);
                DataLocator.regParser(ConfigKey.ANI, AniConfigParser);
                DataLocator.regParser("Code", LangUtil.regMsgDict);
                game.initData();
                DataLocator.parsePakedDatas();

                game.GameEngine.init(this.stage);
                ResourceManager.init();
                var engine = game.GameEngine.instance;
                engine.camera = new game.Camera();
                var auth = new junyou.AuthData();
                auth.pid = baseParam.pid;//"weixin";
                auth.puid = baseParam.uid//"F4D05C2C65F640E9E27C21ED6E656B94";
                auth.sid = parseInt(baseParam.sid)//1;
                auth.sign = baseParam.sign//"1hXVjPIfWvnTgbiq40/xWQ==";
                netService.setAuthData(auth);
                mvc.Facade.addEventListener(junyou.NetEvent.LOGIN_COMPLETE, this.loginCompleteHandler, this);
                netService.login();
                WordFilter.loadDirtyWord(ConfigUtils.getParam("dirty"));
                NameUtils.loadNameLib(ConfigUtils.getParam("nameLib"));
            }
        }

        private loginCompleteHandler() {
            this.doRegister();
            let facade = mvc.Facade.getInstance();
            facade.removeEventListener(junyou.NetEvent.LOGIN_COMPLETE, this.loginCompleteHandler, this);
            facade.addEventListener(LoginService.ENTER_GAME, this.createGameScene, this);
            facade.getProxy("LoginService", (loginService: LoginService) => {
                let ns = NetService.getInstance();
                let auth = ns.authData;
                if (auth.roles && auth.roles.length) {
                    //TODO 如果有角色，显示角色列表
                    //暂时直接使用第一个角色登录
                    let role = auth.roles[0];
                    loginService.login(role._id);
                } else {
                    // loginService.createRole(<CreateRole_C2S>{ name: "张三", sid: 1, cfgid: 1 });
                    facade.toggle(ModuleId.CreateRole);
                }

            }, this);

        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onItemLoadError(event: RES.ResourceEvent): void {
            ThrowError("Url:" + event.resItem.url + " has failed to load");
        }

        private onResourceLoadError(event: RES.ResourceEvent): void {
            ThrowError("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        }

        private hero: GUnit;
        /**
        * 创建游戏场景
        * Create a game scene
        */
        private createGameScene(): void {

            var ConfigKey = game.ConfigKey;
            var stage = this.stage;


            ResizeManager.getInstance().init(stage);

            sui.SuiResManager.getInstance().setInlineData("lib", RES.getRes("libs"));


            //this.addTestHero();

            // MessageManager.getInstance();

            // CoreFunction.systemTips = new SystemTips();


            let facade = mvc.Facade.getInstance();
            facade.toggle(ModuleId.Sider);
            facade.toggle(ModuleId.MiniRole);

            //this.testFightController();
            MessageManager.getInstance().initSystemChanel(1);
        }

        private initMoudleChecker() {
            let mm = mvc.Facade.getInstance().moduleManager;
            let checks: { [index: number]: ModuleChecker };
            checks = {};
            checks[1] = new ModuleChecker();
            mm.checkers = checks;
        }
        /**
         * 注册Mediator,Proxy,handler
         */
        private doRegister() {
            //绑定字典
            PBMessageUtils.structByName = <any>PBMsgDict;
            let facade = mvc.Facade.getInstance();

            //初始化模块处理
            let mm = new mvc.ModuleManager();
            facade.bindModuleManager(mm);
            let cfgs = DataLocator.getData(game.ConfigKey.GongNeng);
            mm.setCfgs(cfgs);
            this.initMoudleChecker();
            mm.registerHandler(0, new ModuleHandler0());

            //注册服务
            facade.registerInlineProxy(LoginService);
            facade.registerInlineProxy(ItemsService);
            facade.registerInlineProxy(BattleService);
            facade.registerInlineProxy(RongLianService);
            facade.registerInlineProxy(GMCmdService);
            facade.registerInlineProxy(RoleService);
            facade.registerInlineProxy(SkillService);
            facade.registerInlineProxy(ClanService);
            facade.registerInlineProxy(NoticeService);

            //绑定面板处理器和功能标识
            facade.registerInlineMediator(SiderPanelMediator, ModuleId.Sider);
            facade.registerInlineMediator(MiniRolePanelMediator, ModuleId.MiniRole);
            facade.registerInlineMediator(RolePanelMediator, ModuleId.Role);
            facade.registerInlineMediator(BagPanelMediator, ModuleId.Bag);
            facade.registerInlineMediator(EquipPanelMediator, ModuleId.EquipItem);
            facade.registerInlineMediator(DaojuPanelMediator, ModuleId.DaojuItem);
            facade.registerInlineMediator(WarePanelMediator, ModuleId.WearEquip);
            facade.registerInlineMediator(EquipDetailPanelMediator, ModuleId.EquipDetail);
            facade.registerInlineMediator(RonglianPanelMediator, ModuleId.Ronglian);
            facade.registerInlineMediator(CreaterolePanelMediator, ModuleId.CreateRole);
            facade.registerInlineMediator(ShopPanelMediator, ModuleId.Shop);
            facade.registerInlineMediator(SkillPanelMediator, ModuleId.Skill);
            facade.registerInlineMediator(ClanPanelMediator, ModuleId.Clan);
            facade.registerInlineMediator(OutClanPanelMediator, ModuleId.OutClan);
            facade.registerInlineMediator(CreateClanPanelMediator, ModuleId.CreateClan);
            facade.registerInlineMediator(InClanPanelMediator, ModuleId.InClan);
            facade.registerInlineMediator(ClanHongbaoPanelMediator, ModuleId.ClanHongbao);
            facade.registerInlineMediator(ClanJuanxianPanelMediator, ModuleId.ClanJuanxian);
            //facade.registerInlineMediator(ClanLingdiPanelMediator,ModuleId.ClanLingdi);
            facade.registerInlineMediator(ClanShopPanelMediator, ModuleId.ClanShop);
            //facade.registerInlineMediator(ClanSkillPanelMediator,ModuleId.ClanSkill);
            facade.registerInlineMediator(ClanMemberPanelMediator, ModuleId.ClanMember);
            //facade.registerInlineMediator(ClanManagePanelMediator,ModuleId.ClanManage);
            //facade.registerInlineMediator(ClanRankPanelMediator,ModuleId.ClanRank);
            facade.registerInlineMediator(ClanUpgradePanelMediator, ModuleId.ClanUpgrade);
            facade.registerInlineMediator(ClanLimitPanelMediator, ModuleId.ClanLimit);
            facade.registerInlineMediator(ClanNoticePanelMediator, ModuleId.ClanNotice);

            facade.registerInlineMediator(MainCityPanelMediator, ModuleId.MainCity);

            facade.registerInlineMediator(HelpPanelMediator, ModuleId.Help);

            CoreFunction.systemTips = new SystemTips();

            //初始化技能
            SkillManager.init();
        }

        // private testFightController() {
        //     let fc = FightController.getInstance();
        //     let entities: UnitEntity[] = [];
        //     entities[0] = this.createTestEntity("f" + (5 * Math.random() >> 0), [{ id: 1 }], 0, "f" + (10 * Math.random() >> 0), "" + (11 * Math.random() >> 0), 10000);
        //     entities[0].guid = 0;
        //     // for (var i = 1; i < 20; i++) {
        //     //     let sex = Math.random() < 0.5 ? "f" : "m";
        //     //     entities[i] = this.createTestEntity(sex + (30 * Math.random() >> 0), i & 1, sex + (23 * Math.random() >> 0), "" + (35 * Math.random() >> 0));
        //     // }

        //     for (var i = 1; i < 5; i++) {
        //         entities[i] = this.createTestEntity("" + (10 * Math.random() >> 0), [{ id: 1 }], 1);
        //     }

        //     fc.start(Number.MAX_VALUE * Math.random(), entities, CallbackInfo.getInstance(this.battleEnd, this), 1);
        // }

        // private battleEnd(result: number) {
        //     let msg = [, "你失败了", "你胜利了", "打平"][result];
        //     // alert(msg);
        //     this.testFightController();
        // }

        // private createTestEntity(cloth: string, skills: SkillInfo[], team: number, weapon?: string, wing?: string, x1: number = 500, x2: number = 50, x3: number = 20, x4: number = 30, x5: number = 10) {
        //     let entity = new UnitEntity();
        //     let data = <MUnitEntity>{};
        //     entity.data = data;
        //     data.cloth = cloth;
        //     data.guid = 0xffffffffffff * Math.random() + performance.now();
        //     data.weapon = weapon;
        //     data.wing = wing;
        //     let xattr = <XAttr>{};
        //     xattr.maxhp = x1;
        //     xattr.wugong = x2;
        //     xattr.wufang = x3;
        //     xattr.fagong = x4;
        //     xattr.fafang = x5;
        //     data.xattr = xattr;
        //     data.x = Math.clamp(2000 * Math.random(), 100, 2000);
        //     data.y = Math.clamp(2000 * Math.random(), 100, 2000);
        //     data.skills = skills;
        //     data.pst = "R3";
        //     data.team = team;
        //     return entity;
        // }



        // private addTestHero() {
        //     let stage = this.stage;
        //     var setting: game.UnitSetting = new game.UnitSetting;

        //     var sw = stage.stageWidth;
        //     var sh = stage.stageHeight;
        //     var unit: GUnit;
        //     unit = new GUnit("R3", setting);
        //     unit.setCloth("f1");
        //     unit.setWeapon("f3");
        //     unit.setWing("0");
        //     unit.x = sw >> 1;
        //     unit.y = sh >> 1;
        //     game.GameEngine.instance.camera.lookat(unit);
        //     this.hero = unit;
        //     stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        // }

        // private tapHandler(e: egret.TouchEvent) {
        //     var engine = game.GameEngine.instance;
        //     var rect = engine.viewRect;
        //     var x = e.stageX + rect.x;
        //     var y = e.stageY + rect.y;
        //     this.hero.startUnitAction(WalkAction.getInstance(x, y));
        // }
    }
}