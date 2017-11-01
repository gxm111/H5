/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%8A%80%E8%83%BD%E7%9B%B8%E5%85%B3%E9%80%9A%E4%BF%A1 生成
 * 生成时间 2016-10-10 14:00:45
 **/
module junyou.hqg {
	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class SkillService extends junyou.mvc.Service {
		constructor(){
			super("SkillService");
		}
		
		onRegister(){
			super.onRegister();
			this.regMsg("NormalSkillInfo_S2C", 10030);
			this.regHandler(this.normalSkillInfo, 10030);
			this.regMsg("SetSkillOrder", 10031);
			this.regHandler(this.skillOrderSetSuccess, 10031);
			this.regMsg(6, 10032);
			this.regHandler(this.skillOrderSetFailed, 10032);
			/*-*begin $onRegister*-*/
			//这里写onRegister中手写内容
			/*-*end $onRegister*-*/
		}
		
				/**【getNormalSkill】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message GetNormalSkill_C2S {
		 *     option (cmd)=30;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public getNormalSkill() {
			if(!this.baseSkillInfo){
				this.initBaseSkillinfo();
			}
			this.send(30, null);
			// let data:NetData = new NetData();
			// let tmp = <NormalSkillInfo_S2C>{};
			// data.data = tmp;
			// let arr = [];
			// for(let i=0;i<8;i++){
			// 	let info = <SkillInfo>{};
			// 	info.id = i+1;
			// 	info.name = "冠名"+i;
			// 	arr[i] = info;
			// }
			// tmp.skills = arr;
			// tmp.order0 = [1,3,5,7];
			// tmp.order1 = [1,6,undefined,undefined];
			// tmp.order2 = [2,5,7,1];
			// this.normalSkillInfo(data);
		}
		/**【setSkillOrder】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message SetSkillOrder_C2S {
		 *     option (cmd)=31;
		 *     required SetSkillOrder msg=1;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		public setSkillOrder(_msg: SetSkillOrder) {
			this.send(31, _msg, "SetSkillOrder");
			// let data = new NetData();
			// let msg = <SetSkillOrder>{};
			// msg.follower = _SetSkillOrder_C2S.follower;
			// msg.id = _SetSkillOrder_C2S.id;
			// msg.order = _SetSkillOrder_C2S.order;
			// data.data = msg;
			// this.skillOrderSetSuccess(data);
		}
				/**【normalSkillInfo】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message NormalSkillInfo_S2C {
		 *     option (cmd)=10030;    
		 *     repeated SkillInfo skills=1;//普通技能的冠名信息
		 *     repeated int32 order0=2;//主角技能释放优先级的id顺序 [id3,id1,id2,id5]
		 *     repeated int32 order1=3;//伙伴1技能释放优先级的id顺序 [id3,id1,id2,id5]
		 *     repeated int32 order2=4;//伙伴2技能释放优先级的id顺序 [id3,id1,id2,id5]
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected normalSkillInfo = (data:NetData) => {
			let msg:NormalSkillInfo_S2C = <NormalSkillInfo_S2C>data.data;
			/*-*begin normalSkillInfo*-*/
			//这里填写方法中的手写内容
			if (!this.skillOrderByFollower) {
				this.skillOrderByFollower = {};
				for (let i = 0; i < 3; i++) {
					let tmp = [];
					this.skillOrderByFollower[i] = tmp;
					for (let j = 0; j < 4; j++) {
						tmp[j] = undefined;
					}
				}
			}
			let tmp;
			let order;
			for (let i = 0; i < 3; i++) {
				tmp = msg["order" + i];
				order = this.skillOrderByFollower[i];
				if(tmp){

					let len = tmp.length;
					for (let j = 0; j < len; j++) {
						order[j] = tmp[j];
					}
				}
			}
			let skills = msg.skills;
			if(skills){
				let skilllen = skills.length;
				let info;
				let oarr = this.baseSkillInfo;
				let olen = oarr.length;
				let oinfo;
				for (let i = 0; i < skilllen; i++) {
					info = skills[i];
					for (let j = 0; j < olen; j++) {
						oinfo = oarr[j];
						if (oinfo.id == info.id) {
							oinfo.name = info.name ? info.name : "";
							oinfo.rolename = info.rolename ? info.rolename : "";
						}
					}
			}
			}
			
			dispatch(EventConst.SKILL_BASEINFO_RTN);
			/*-*end normalSkillInfo*-*/
		}
		/**【skillOrderSetSuccess】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message SkillOrderSetSuccess_S2C {
		 *     option (cmd)=10031;
		 *     required SetSkillOrder msg=1;
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected skillOrderSetSuccess = (data:NetData) => {
			let _msg: SetSkillOrder = <any>data.data;
			/*-*begin skillOrderSetSuccess*-*/
			//这里填写方法中的手写内容
			let order = this.skillOrderByFollower[_msg.follower];
			if(_msg.order==5){
				let index = order.indexOf(_msg.id);
				order[index] = undefined;
			}else{

				let lastid = order[_msg.order];

				if (lastid) {
					//如果原来位置上有技能，则2个位置互换
					let lastindex: number = -1;
					let len = order.length;
					for (let i = 0; i < len; i++) {
						if (order[i] == _msg.id) {
							lastindex = i;
							break;
						}
					}
					if (lastindex >= 0) {
						if(lastid==_msg.id){
							order[lastindex] = undefined;
						}else{
							order[lastindex] = lastid;
						}
					}
				}else{
					let tmp = order.indexOf(_msg.id);
					if(tmp>=0){
						order[tmp] = undefined;
					}
				} 
				order[_msg.order] = _msg.id;
			}
			dispatch(EventConst.SKILL_ORDER_CHANGE,{id:_msg.id,order:_msg.order});
			/*-*end skillOrderSetSuccess*-*/
		}
		/**【skillOrderSetFailed】
		 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message SkillOrderSetFailed_S2C{
		 *     option (cmd)=10032;
		 *     required int32 state=1;// 0 技能未领悟 1 其他情况
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected skillOrderSetFailed = (data:NetData) => {
			let _state: number = <any>data.data;
			/*-*begin skillOrderSetFailed*-*/
			//这里填写方法中的手写内容
			/*-*end skillOrderSetFailed*-*/
		}
		/*-*begin $area2*-*/

		//这里填写类里面的手写内容

		private initBaseSkillinfo(){
			this.baseSkillInfo = [];
			let arr = DataLocator.getData(game.ConfigKey.JiNeng);
			let len = arr.length;
			for(let key in arr){
				let info = <SkillInfo>{};
				info.id = arr[key].id;
				info.name = "";
				info.rolename = "";
				this.baseSkillInfo.push(info);
			}
		}
		public skillOrderByFollower: { [index: number]: any[] };


		public baseSkillInfo: SkillInfo[];
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/
}