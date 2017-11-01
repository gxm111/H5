module junyou.hqg {
    /*-*begin $area1*-*/
//这里填写类上方的手写内容
/*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\hqgh5\cehua\02.数值\3.物品\ZhuangBei.xlsx生成
     * 创建时间：2016-09-29 14:05:27
     **/
    export class ZhuangBeiCfg extends DaoJuCfg{
			/**
			* 装备id
			**/
			public id: number;
			/**
			* 名称
			**/
			public name: string;
			/**
			* 排序
			**/
			public order: number;
			/**
			* 装备图标
			**/
			public icon: string;
			/**
			* 可激活外显id
			**/
			public pak: string;
			/**
			* 装备等级/需要角色高于或等于装备等级才可以装备
			**/
			public minlevel: number;
			/**
			* 装备部位
			**/
			public part: number;
			/**
			* 最大生命
			**/
			public x1: number;
			/**
			* 物理攻击
			**/
			public x2: number;
			/**
			* 物理防御
			**/
			public x3: number;
			/**
			* 法术攻击
			**/
			public x4: number;
			/**
			* 法术防御
			**/
			public x5: number;
			/**
			* 命中等级
			**/
			public x6: number;
			/**
			* 闪避等级
			**/
			public x7: number;
			/**
			* 暴击等级
			**/
			public x8: number;
			/**
			* 韧性等级
			**/
			public x9: number;
			/**
			* 必杀等级
			**/
			public x10: number;
			/**
			* 无视防御
			**/
			public x11: number;
			/**
			* 身法等级
			**/
			public x12: number;

/*-*begin $area2*-*/
//这里填写类里面的手写内容
/*-*end $area2*-*/
        public decode(data:any[]){
			let i = 0;
			let local:any = {};
			this.id = data[i++];
			this.name = data[i++];
			this.order = data[i++];
			this.icon = data[i++];
			this.pak = data[i++];
			this.minlevel = data[i++];
			this.part = data[i++];
			local.data0 = data[i++];
			local.data1 = data[i++];
			local.data2 = data[i++];
			local.data3 = data[i++];
			this.x1 = data[i++];
			this.x2 = data[i++];
			this.x3 = data[i++];
			this.x4 = data[i++];
			this.x5 = data[i++];
			this.x6 = data[i++];
			this.x7 = data[i++];
			this.x8 = data[i++];
			this.x9 = data[i++];
			this.x10 = data[i++];
			this.x11 = data[i++];
			this.x12 = data[i++];

/*-*begin $decode*-*/
this.type = 0;
			this.maxcount = 1;
			let datas = [];
			for (let i = 0; i < 4; i++) {
				datas[i] = local["data" + i];
			}
			this.datas = datas;
/*-*end $decode*-*/
        }
    }
    /*-*begin $area3*-*/
//这里填写类下发的手写内容
/*-*end $area3*-*/
}