module junyou.hqg {
    /**
     * 战斗飘字 伤害/闪避/暴击
     * @author 3tion
     */
    export class DmgEffect {

        public static showEffect(dmg: DmgInfo, controller: FightController) {
            var text = new egret.TextField;
            game.GameEngine.instance.getLayer(game.GameLayerID.GameEffect).addChild(text);
            tween = controller.getTween(text);
            tween.recycleCallback = CallbackInfo.getInstance(removeDisplay, undefined, [text]);
            var target = dmg.target;
            var tx = target.x;
            var ty = target.y;
            var tween: BattleTween;
            var sx: number, sy: number, dx: number, dy: number;
            switch (dmg.type) {
                case DmgType.Attack:// 普通受创
                    text.text = "-" + dmg.dmg;
                    text.size = 18;
                    text.textColor = 0xff0000;
                    text.x = tx;
                    text.y = ty - 60;
                    sx = dmg.cx;
                    sy = dmg.cy;
                    dx = tx - sx;
                    dy = ty - sy;
                    var dist = Math.sqrt(dy * dy + dx * dx);
                    var x1 = tx + 100 * dx / dist;
                    var y1 = ty + 100 * dy / dist;
                    var x2 = x1 + 300 * dx / dist;
                    var y2 = y1 + 300 * dy / dist;
                    tween.to({ x: x1, y: y1 }, 400, Ease.cubicOut).to({ x: x2, y: y2, alpha: 0 }, 800).call(removeDisplay, undefined, [text]);
                    break;
                case DmgType.CriticalAttack: // 暴击受创
                    text.text = "-" + dmg.dmg + "!!!";
                    text.size = 9;
                    text.textColor = 0xff0000;
                    text.x = tx;
                    text.y = ty - 60;
                    sx = dmg.cx;
                    sy = dmg.cy;
                    dx = tx - sx;
                    dy = ty - sy;
                    var dist = Math.sqrt(dy * dy + dx * dx);
                    var x1 = tx + 50 * dx / dist;
                    var y1 = ty + 50 * dy / dist;
                    tween.to({ size: 48 }, 100).to({ size: 28, x: x1, y: y1, alpha: 0 }, 200, Ease.cubicOut).call(removeDisplay, undefined, [text]);
                    break;
                case DmgType.Miss: // 闪避
                    text.text = "MISS";
                    text.size = 20;
                    text.textColor = 0xcccccc;
                    text.x = tx + 50;
                    text.y = ty - 20 - 40 * Math.random();
                    var tween2 = controller.getTween(text);
                    tween2.to({ size: 36, alpha: 0.5 }, 300);
                    tween.to({ x: tx - 50 }, 300, Ease.elasticOut).call(removeDisplay, undefined, [text]);
                    break;
                case DmgType.Heal: // 治疗
                    text.text = "+" + dmg.dmg;
                    text.size = 18;
                    text.textColor = 0xff00;
                    text.x = tx;
                    text.y = ty - 60;
                    tween.to({ y: ty - 200, alpha: 0 }, 700, Ease.quartOut).call(removeDisplay, undefined, [text]);
                    break
                case DmgType.CriticalHeal: // 治疗
                    text.text = "+" + dmg.dmg + "!!!";
                    text.size = 9;
                    text.textColor = 0xff00;
                    text.x = tx;
                    text.y = ty - 60;
                    tween.to({ size: 48 }, 100).to({ size: 36, y: ty - 200, alpha: 0 }, 700, Ease.quartOut).call(removeDisplay, undefined, [text]);
                    break
            }
        }

    }
}