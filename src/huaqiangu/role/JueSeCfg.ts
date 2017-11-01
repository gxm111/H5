module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\0.角色配置\JueSe.xlsx生成
     * 创建时间：2016-08-18 20:12:16
     **/
    export class JueSeCfg {
			/**
			* 角色等级
			**/
			public level: number;
			/**
			* 升级所需经验
			**/
			public exp: number;
			/**
			* 可获得外显的id
			**/
			public waixian: number;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;

			this.level = data[i++] || 1;
			this.exp = data[i++];
			this.waixian = data[i++];

/*-*begin $decode*-*/
//这里填写方法中的手写内容
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}