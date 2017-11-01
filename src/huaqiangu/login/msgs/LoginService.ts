/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%88%9B%E5%BB%BA%E8%A7%92%E8%89%B2 生成
 * 生成时间 2016-08-17 15:21:33
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class LoginService extends junyou.mvc.Service {
		constructor() {
			super("LoginService");
		}

		onRegister() {
			super.onRegister();
			this.regMsg("Role", 10001);
			this.regHandler(this.roleCallback, 10001);
			this.regMsg(6, 10002);
			this.regHandler(this.loginFailed, 10002);
			this.regMsg(6, 10003);
			this.regHandler(this.roleFailed, 10003);
			this.regMsg("RoleNeedRelogin_S2C", 10033);
			this.regHandler(this.roleNeedRelogin, 10033);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			/*-*end $onRegister*-*/
		}

		public login(__id: number) {
			this.send(0, __id, 5);
		}
		public createRole(_CreateRole_C2S: CreateRole_C2S) {
			this.send(1, _CreateRole_C2S, "CreateRole_C2S");
		}
		protected roleCallback = (data: NetData) => {
			let role: Role = <any>data.data;
			/*-*begin roleCallback*-*/
			// 创建角色成功
			let heroVO = Core.$hero = new HeroVO();
			role.copyto(heroVO);
			mvc.Facade.getInstance().getProxy(ServiceName.ItemsService, (itemsService: ItemsService) => {
				itemsService.addItems(role.items);
			}, this);
			dispatch(LoginService.ENTER_GAME);
			/*-*end roleCallback*-*/
		}
		protected loginFailed = (data: NetData) => {
			let error: number = <any>data.data;
			/*-*begin loginFailed*-*/
			//这里填写方法中的手写内容
			/*-*end loginFailed*-*/
		}
		protected roleFailed = (data: NetData) => {
			let error: number = <any>data.data;
			/*-*begin roleFailed*-*/
			//这里填写方法中的手写内容
			/*-*end roleFailed*-*/
		}
		protected roleNeedRelogin = (data: NetData) => {
			let msg: RoleNeedRelogin_S2C = <RoleNeedRelogin_S2C>data.data;
			/*-*begin roleNeedRelogin*-*/
			//这里填写方法中的手写内容
			/*-*end roleNeedRelogin*-*/
		}
		/*-*begin $area2*-*/
		public static ENTER_GAME: string = "ENTER_GAME";
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}