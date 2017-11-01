/**
 * 配置解析的示例代码
 */
module junyou.hqg {

    /**
     * 处理maps.json
     */
    export var MapConfigParser: ConfigDataParser = (data) => {
        return game.MapInfo.decodeFromArray(data);
    }

    /**
     * 处理pst.json
     */
    export var PstConfigParser: ConfigDataParser = (data) => {
        var pstData = {};
        for (let key in data) {
            let item = data[key];
            let pst = new game.PstInfo();
            pst.init(key, item);
            pstData[key] = pst;
        }
        return pstData;
    }

    export var AniConfigParser: ConfigDataParser = (data) => {
        var pstData = {};
        for (let key in data) {
            let item = data[key];
            let pst = new game.AniInfo();
            pst.init(key, item);
            pstData[key] = pst;
        }
        return pstData;
    }
}
