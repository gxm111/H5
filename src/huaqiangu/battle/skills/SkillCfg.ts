module junyou.hqg {
    /*-*begin $area1*-*/
    /*-*end $area1*-*/
    /**
     * 由junyouH5数据生成工具，从D:\junyou2016\huaqianguH5\doc\02.数值\6.技能表\JiNeng.xlsx生成
     * 创建时间：2016-05-11 15:50:29
     **/
    export class JiNengCfg1 {
        /**
        * 技能标识
        **/
        public id: string;
        /**
        * 技能名称
        **/
        public name: string;
        /**
        * 技能类型<br />
        * 0 无伤技能<br />
        * 1 攻击技能<br />
        * 2 治疗技能
        **/
        public type: number;
        /**
        * 使用物理攻击的百分率
        **/
        public wugong: number;
        /**
        * 使用魔法攻击的百分率
        **/
        public fagong: number;
        /**
        * 技能射程<br />
        * 像素距离
        **/
        public range: number;
        /**
        * 技能附加命中
        **/
        public x6: number;
        /**
        * 参数1 最终伤害(不算暴击的附加伤害) * 百分比<br />
        * 放大1万倍
        **/
        public data1: number;
        /**
        * 参数2 技能附加伤害(保底伤害)
        **/
        public data2: number;
        /**
        * 技能模板标识
        **/
        public moban: number;
        /**
        * 技能cd<br />
        * 单位（毫秒）
        **/
        public cd: number;
        /**
        * 战斗开始后<br />
        * 多少毫秒内<br />
        * 不可以使用
        **/
        public delay: number;
        /**
        * 最大目标数
        **/
        public maxtarget: number;
        /**
        * 首目标选择<br />
        * 0 最大仇恨<br />
        * 1 自己<br />
        * 2 当前血量最高<br />
        * 3 当前血量最低<br />
        * 
        **/
        public maintarget: number;
        /**
        * 目标类型<br />
        * 0 敌对目标<br />
        * 1 己方目标<br />
        * 2 全体目标（不分敌我）
        **/
        public targettype: number;
        /**
        * 范围类型<br />
        * 0 无形状（直接遍历）<br />
        * 1 圆形<br />
        * 2 矩形<br />
        * 3 扇形<br />
        * 
        **/
        public areatype: number;
        /**
        * 范围参数1<br />
        * 圆形：半径<br />
        * 矩形：长度<br />
        * 扇形：半径
        **/
        public area1: number;
        /**
        * 范围参数2<br />
        * 圆形：无<br />
        * 矩形：宽度<br />
        * 扇形：角度
        **/
        public area2: number;
        /**
        * 对自己增加的威胁系数<br />
        * 伤害*threat10+threat11
        **/
        public threat10: number;
        /**
        * 对自己增加的威胁值
        **/
        public threat11: number;
        /**
        * 对敌方增加的威胁系数<br />
        * 伤害*threat20+threat21
        **/
        public threat20: number;
        /**
        * 对敌方增加的威胁值
        **/
        public threat21: number;

        /*-*begin $area2*-*/
        /**
         * 射程的平方
         * 
         * @type {number}
         */
        public sqRange: number;

        /**
         * 查找器的参数列表
         * 
         * @type {any[]}
         */
        public finderParams: any[];

        /**
         * 获取技能模板配置
         */
        public mobanCfg: JiNengMoBanCfg;

        public get actionTime() {
            return 800; // TODO 使用攻击动作的总时间 ActionInfo.totalTime
        }
        /*-*end $area2*-*/

        public decode(data: any[]) {
            let i = 0;
            this.id = data[i++];
            this.name = data[i++];
            this.type = data[i++];
            this.wugong = data[i++];
            this.fagong = data[i++];
            this.range = data[i++];
            this.x6 = data[i++];
            this.data1 = data[i++];
            this.data2 = data[i++];
            this.moban = data[i++];
            this.cd = data[i++];
            this.delay = data[i++];
            this.maxtarget = data[i++];
            this.maintarget = data[i++];
            this.targettype = data[i++];
            this.areatype = data[i++];
            this.area1 = data[i++];
            this.area2 = data[i++];
            this.threat10 = data[i++];
            this.threat11 = data[i++];
            this.threat20 = data[i++];
            this.threat21 = data[i++];

            /*-*begin $decode*-*/
            this.range = this.range < 60 ? 60 : this.range;
            this.sqRange = this.range * this.range;
            this.mobanCfg = DataLocator.getData(game.ConfigKey.JiNengMoBan)[this.moban];
            /*-*end $decode*-*/
        }
    }

    /*-*begin $area3*-*/
    /*-*end $area3*-*/
}