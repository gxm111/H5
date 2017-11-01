module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\10.门派\MenPaiQuanXian.xlsx生成
     * 创建时间：2016-09-27 16:48:47
     **/
    export class MenPaiQuanXianCfg {
			/**
			* 权限标识
			**/
			public id: number;
			/**
			* 权限名称
			**/
			public name: string;
			/**
			* 职位高低<br/>
			* 职位高的才有权踢职位低的
			**/
			public zhiwei: number;
			/**
			* 是否可以退出门派
			**/
			public tuichu: boolean;
			/**
			* 是否可以升级门派
			**/
			public shengji: boolean;
			/**
			* 是否可以解散公会
			**/
			public jiesan: boolean;
			/**
			* 是否可以任命长老
			**/
			public shengzhi: boolean;
			/**
			* 是否可以降为弟子
			**/
			public jiangzhi: boolean;
			/**
			* 是否可以调整弟子的招收条件
			**/
			public zhaoshou: boolean;
			/**
			* 是否可以禅让掌门
			**/
			public shanrang: boolean;
			/**
			* 是否可以使用门派商店购买
			**/
			public goumai: boolean;
			/**
			* 是否可以激活商品
			**/
			public jihuo: boolean;
			/**
			* 是否可以发红包
			**/
			public fahongbao: boolean;
			/**
			* 是否可以领红包
			**/
			public linghongbao: boolean;
			/**
			* 是否可以报名地图争夺战
			**/
			public baoming: boolean;
			/**
			* 是否可以门派留言
			**/
			public liuyan: boolean;
			/**
			* 是否可以修改公告
			**/
			public gonggao: boolean;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;

			this.id = data[i++];
			this.name = data[i++];
			this.zhiwei = data[i++];
			this.tuichu = !!data[i++];
			this.shengji = !!data[i++];
			this.jiesan = !!data[i++];
			this.shengzhi = !!data[i++];
			this.jiangzhi = !!data[i++];
			this.zhaoshou = !!data[i++];
			this.shanrang = !!data[i++];
			this.goumai = !!data[i++];
			this.jihuo = !!data[i++];
			this.fahongbao = !!data[i++];
			this.linghongbao = !!data[i++];
			this.baoming = !!data[i++];
			this.liuyan = !!data[i++];
			this.gonggao = !!data[i++];

/*-*begin $decode*-*/
//这里填写方法中的手写内容
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}