/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E5%85%AC%E5%91%8A%E9%80%9A%E7%9F%A5 生成
 * 生成时间 2016-10-10 16:15:19
 **/
module junyou.hqg {
	/*-*begin $area1*-*///这里填写类上方的手写内容
	/*-*end $area1*-*/
	export class NoticeService extends junyou.mvc.Service {
		constructor(){
			super("NoticeService");
		}
		
		onRegister(){
			super.onRegister();
			this.regMsg("SystemMsg_S2C", 10400);
			this.regHandler(this.systemMsg, 10400);
			/*-*begin $onRegister*-*///这里写onRegister中手写内容
			/*-*end $onRegister*-*/
		}
		
		
				/**【systemMsg】
		   * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ wiki ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		 * message SystemMsg_S2C{
		 *    option (cmd) = 10400;
		 *    required int32 chanel = 1;//在哪个频道广播，频道不同，显示的位置不一样
		 *    required string msgcode = 2;//要广播的信息，可以是code码或者文本信息
		 *    repeated string params=3;//其他参数，非必需
		 * }
		 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ wiki ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		 *
		 * 这里写手写的注释
		 */
		protected systemMsg = (data:NetData) => {
			let msg:SystemMsg_S2C = <SystemMsg_S2C>data.data;
			/*-*begin systemMsg*-*///这里填写方法中的手写内容
			switch (msg.chanel) {
				case MessageChanelID.SYSTEM:
					this.systemMsgHandler(msg);
					break;
			
				default:
					break;
			}
			/*-*end systemMsg*-*/
		}
		/*-*begin $area2*-*///这里填写类里面的手写内容
		private systemMsgHandler(msg:SystemMsg_S2C){
			dispatch(EventConst.SHOW_MSG_BY_CHANEL,{chanel:msg.chanel,value:msg.msgcode})
		}
		/*-*end $area2*-*/
	}
	/*-*begin $area3*-*///这里填写类下发的手写内容
	/*-*end $area3*-*/
}