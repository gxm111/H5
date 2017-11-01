/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%89%B9%E6%AE%8A%E6%8C%87%E4%BB%A4 生成
 * 生成时间 2016-08-27 19:46:44
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class ModuleService extends junyou.mvc.Service {
		constructor() {
			super("ModuleService");
		}

		onRegister() {
			super.onRegister();
			this.regMsg(6, 32010);
			this.regHandler(this.cmdDisabled, 32010);
			this.regMsg("ModuleChange_S2C", 32011);
			this.regHandler(this.moduleChange, 32011);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			/*-*end $onRegister*-*/
		}


		protected cmdDisabled = (data: NetData) => {
			let _cmd: number = <any>data.data;
			/*-*begin cmdDisabled*-*/
			//TODO 提示 功能被关闭，暂时无法使用
			/*-*end cmdDisabled*-*/
		}
		protected moduleChange = (data: NetData) => {
			let msg: ModuleChange_S2C = <ModuleChange_S2C>data.data;
			/*-*begin moduleChange*-*/
			this._facade.moduleManager.serverChangeModuleState(msg.mid, msg.open);
			/*-*end moduleChange*-*/
		}
		/*-*begin $area2*-*/
		//这里填写类里面的手写内容
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}