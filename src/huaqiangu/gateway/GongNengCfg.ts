module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\2.功能分布\GongNeng.xlsx生成
     * 创建时间：2016-09-12 16:54:14
     **/
    export class GongNengCfg extends mvc.BaseMCfg {
			/**
			* 功能标识
			**/
			public id: string;
			/**
			* 显示用限制类型
			**/
			public showtype: number;
			/**
			* 可使用功能的限制类型
			**/
			public limittype: number;
			/**
			* 是否关闭此功能（不开放）
			**/
			public close: boolean;
			/**
			* 名字
			**/
			public name: string;
			/**
			* tip
			**/
			public des: string;
			/**
			* 执行类型
			**/
			public type: number;
			/**
			* 参数1
			**/
			public data1: any;
			/**
			* 参数2
			**/
			public data2: any;
			/**
			* 参数3
			**/
			public data3: any;
			/**
			* 参数4
			**/
			public data4: any;
			/**
			* 容器ID
			**/
			public containerID: number;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;
			let local:any = {};
			this.id = data[i++];
			this.showtype = data[i++];
			local.showlimit0 = data[i++];
			local.showlimit1 = data[i++];
			local.showlimit2 = data[i++];
			this.limittype = data[i++];
			local.limit0 = data[i++];
			local.limit1 = data[i++];
			local.limit2 = data[i++];
			this.close = !!data[i++];
			this.name = data[i++];
			this.des = data[i++];
			this.type = data[i++] || 0;
			this.data1 = data[i++];
			this.data2 = data[i++];
			this.data3 = data[i++];
			this.data4 = data[i++];
			this.containerID = data[i++];

/*-*begin $decode*-*/
super.init(local);
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}