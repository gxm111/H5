module junyou.message{
    export interface INotice{
        
        /**
         * 需要显示右侧提示图标的，实现此接口
         * 方法体：
         *  let nd:NoticeData = new NoticeData;
         *  设置nd的相关属性
         *  Facade.simpleDispatch(NoticeIcon.SHOW_NOTICE_ICON,......);
         * 
         * 不实现此接口也行，但事件要抛
         * @param {*} [data] (description)
         */
        onSystemNotice(data?:any);
        
        /**
         * 点击图标处理函数
         * 
         * @param {*} [data] (description)
         */
        doSystemNotice(data?:any);
    }
}