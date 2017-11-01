module junyou.sui {

    /**
     * 为已布局好的render提供List功能
     * 
     * @export
     * @class MPageList
     * @extends {PageList}
     */
    export class MPageList<T, R extends ListItemRender<T>> extends PageList<T, R>{
        public constructor() {
            super(null, 0, 0, 0, 0);
        }

        public displayList(data?: T[]) {
            this._data = data;
            if (!data || !data.length) {
                this.recycle();
                return;
            }
            this.scrollPositionChange();
        }

        public addItem(item: R) {
            if (this._renderList.indexOf(item) == -1) {
                this._renderList.push(item);
                item.addEventListener(ListItemRenderer.ITEM_TOUCH_TAP, this.touchItemrender, this);
            }
            this._viewCount = this._renderList.length;
        }

        public recycle() {
            this._data = undefined;
            for (let render of this._renderList) {
                render.setData(undefined);
            }
        }
    }
}