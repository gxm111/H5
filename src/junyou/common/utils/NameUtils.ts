var $nl_nc;

module junyou {
	export class NameUtils {
		/**
 * 姓 集合
 * 对应配置中 姓 列
 */
		public static A = [];
		/**
		 * 符号 集合
		 * 对应配置中 符号 列
		 */
		public static B = [];
		/**
		 * 名 集合
		 * 对应配置中 男名，女名 列
		 * index（0：男名，1：女名）
		 */
		public static C = [[], []];


		private _random: Function;
		/**
		 *
		 * @param randomFunc	随机算法
		 *
		 */
		public constructor(randomFunc?: Function) {
			this.setRandomFunc(randomFunc);
		}

		public static loadNameLib(url: string) {
			loadScript(url, () => {
				//a：姓,b:符号,c1:男名,c2:女名
				NameUtils.handleNames($nl_nc.a, $nl_nc.b, $nl_nc.c1, $nl_nc.c2, ";");
				$nl_nc = undefined;
			})
		}

		private static handleNames(a: string, b: string, c1: string, c2: string, split: string) {
			NameUtils.A = a.split(split);
			NameUtils.B = b.split(split);
			NameUtils.C = [, c1.split(split), c2.split(split)];
		}


		/**
		 * 设置随机算法
		 * @param randomFunc
		 *
		 */
		public setRandomFunc(randomFunc: Function) {
			if (randomFunc != null) {
				this._random = randomFunc;
			}
			else {
				this._random = Math.random;
			}
		}

		/**
		 * 获取名字
		 * @param sex 1 男  2 女
		 * @return
		 *
		 */
		public getName(sex = 1 | 2) {
			var name: string = "";
			var SC = NameUtils.C[sex];
			if (!SC) {
				if (DEBUG) {
					ThrowError("性别必须为1或者2");
				}
				return;
			}
			var aLen = NameUtils.A.length;
			var bLen = NameUtils.B.length;
			var cLen = SC.length;
			if (aLen)
				name += NameUtils.A[aLen * this._random() >> 0];
			if (bLen)
				name += (egret.getTimer() & 1) ? "" : NameUtils.B[bLen * this._random() >> 0];
			if (cLen)
				name += SC[cLen * this._random() >> 0];
			return name;
		}

		public dispose() {
			this._random = null;
		}
	}
}