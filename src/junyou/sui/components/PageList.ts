module junyou.sui {
    export class PageList<T, R extends ListItemRender<T>> extends egret.Sprite {
        /**最大列数 */
        public static MAXCOLUMNCOUNT: number = 9999;

        public static ITEM_SELECTED: string = "ITEM_SELECTED";

        protected _renderFactory: ClassFactory<R>

        /**
         * 水平间距
         * 
         * @protected
         * @type {number}
         */
        protected _hgap: number;

        /**
         * 垂直间距
         * 
         * @protected
         * @type {number}
         */
        protected _vgap: number;

        /**
         * 列数
         * 
         * @protected
         * @type {number}
         */
        protected _columncount: number;

        protected _viewCount: number;

        protected _renderList: R[];

        protected _data: T[];

        protected _childSizeChanged: boolean = false;

        protected _selectedIndex: number = -1;

        protected _selectedItem: R;

        public scroller: Scroller;
        /**0纵向，1横向 */
        private _scrollType: number;

        private _waitForSetIndex: boolean = false;
        private _waitIndex: number;

        private startIndex: number;

        private endIndex: number;

        private renderChange: boolean = false;

        /**
         * Creates an instance of PageList.
         * 
         * @ param renderfactory
         * @ param hgap 单元格之间的宽度
         * @ param vgap 单元格之间的高度
         * @ param viewCount 可视范围内有几个列表项
         * @ param columnCount 列表共有几列（最小1最大9999）
         */
        public constructor(renderfactory: ClassFactory<R>, hgap: number, vgap: number, viewCount: number, columnCount: number = 1) {
            super();
            this._renderFactory = renderfactory;
            this._columncount = columnCount;
            this._hgap = hgap;
            this._viewCount = viewCount;
            this._vgap = vgap;
            this.scroller = null;
            // this._data = null;
            this._renderList = [];
            if (columnCount < PageList.MAXCOLUMNCOUNT) {
                this._scrollType = 0;
            } else {
                this._scrollType = 1;
            }
            this.addEventListener(Scroller.SCROLL_POSITION_CHANGE, this.scrollPositionChange, this);
        }

        public displayList(data?: T[]) {
            this._selectedIndex = -1;
            if (this._data) {
                if (data) {
                    //如果新赋值的数据长度比以前的短，就自动清理掉多出来的item
                    let nlen = data.length;
                    let olen = this._data.length;
                    while (olen > nlen) {
                        this.removeItem(this.getItemRenderAt(nlen));
                        olen = this._data.length;
                    }
                }
            }
            this._data = data;
            if (!data || !data.length) {
                this.dispose();
                return;
            }
            this.initItems();
            if (this.scroller) {
                this.scroller.scrollToHead();
            }
            this.scrollPositionChange();
        }

        public get data() {
            return this._data;
        }

        /**
         * 根据index使某renderer显示生效
         * 
         * @param {number} idx
         * 
         * @memberOf PageList
         */
        public validateItemByIdx(idx: number) {
            let renderer: R = this.getOrCreateItemRenderAt(idx);
            renderer.setData(this._data[idx]);
            renderer.handleView();
            if (renderer["dataChange"]) {
                renderer["dataChange"] = false;
            }
        }

        /**
         * 使所有renderer显示生效
         * 
         * 
         * @memberOf PageList
         */
        public validateAll() {
            if (this._data) {
                let len = this._data.length;
                for (let i = 0; i < len; i++) {
                    this.validateItemByIdx(i);
                }
            }
        }

        /**
         * 初始化render占据array，不做任何初始化容器操作
         * 
         * @private
         */
        private initItems() {
            let len: number = this._data.length;
            for (let i = 0; i < len; i++) {
                this.getOrCreateItemRenderAt(i);
            }
        }


        protected scrollPositionChange(e?: egret.Event) {
            let rect = this.scrollRect;
            let dlen = this._data.length;
            let startIndex = 0;
            let endIndex: number;
            //如果没有绑定滚动条的，那么就表示全在视野内，一次性全部加载渲染
            //如果绑定滚动条了，找到视野内最上（左）边的itemindex，作为起始点，往后处理双倍的viewcount的render
            if (!rect) {
                startIndex = 0;
                startIndex = Math.max(startIndex, this.selectedIndex);
                endIndex = startIndex + this._viewCount;

            } else {
                //取到当前视野内第一个item的index
                //只要列数不是9999那么滚动条方向就是垂直的
                let pos: number;
                if (this._renderList.length < 1) {
                    endIndex = startIndex + this._viewCount * 2;
                } else {
                    let llen = this._renderList.length;
                    let i = 0;
                    let render: R;
                    if (this._scrollType == 0) {
                        //纵向滚动 
                        pos = rect.y;
                        //所有render中，第一个render的y大于等于rect.y的render就是要找的
                        for (i = 0; i < llen; i++) {
                            render = this._renderList[i];
                            if (render.y >= pos) {
                                startIndex = i;//-this._columncount;
                                break;
                            }
                        }
                    } else {
                        //横向滚动
                        pos = rect.x;
                        //所有render中，第一个render的x大于等于rect.x的render就是要找的
                        for (i = 0; i < llen; i++) {
                            render = this._renderList[i];
                            if (render.x >= pos) {
                                startIndex = i;//-this._columncount;
                                break;
                            }
                        }
                    }
                    // startIndex = Math.max(startIndex,0);
                    endIndex = startIndex + this._viewCount * 2;
                }

            }
            endIndex = Math.min(endIndex, dlen);
            this.startIndex = startIndex;
            this.endIndex = endIndex;
            this.doRenderListItem(startIndex, endIndex);

        }


        /**
         * 渲染指定位置的render
         * 
         * @ private
         * @ param {number} start (起始索引)
         * @ param {number} end (结束索引)
         */
        protected doRenderListItem(start: number, end: number) {
            let render: R;
            let data = this._data;
            for (let i = start; i < end; i++) {
                render = this.getOrCreateItemRenderAt(i);
                if("inited" in render){
                    if(!render["inited"]){
                        render["bindComponent"]();
                    }
                }
                let tmp = render.getData();
                if (!tmp || tmp != data[i] || render["dataChange"]) {
                    render.setData(data[i]);
                    render.handleView();
                    if (render["dataChange"]) {
                        render["dataChange"] = false;
                    }
                }
            }
        }

        protected touchItemrender(e: egret.TouchEvent) {
            let render = <R>e.target;
            this._selectedItem = render;
            let len = this._renderList.length;
            for (let i = 0; i < len; i++) {
                render = this._renderList[i];
                if (render) {
                    if (render == this._selectedItem) {
                        render.setChooseState(true);
                        this._selectedIndex = i;
                    } else {
                        render.setChooseState(false);
                    }
                }
            }
            this.dispatchEventWith(PageList.ITEM_SELECTED);
        }

        private getOrCreateItemRenderAt(index: number) {
            let list = this._renderList;
            let render = this._renderList[index];
            if (!render) {
                render = this._renderFactory.newInstance();
                this._renderList[index] = render;
                render.addEventListener(egret.Event.RESIZE, this.childSizeChange, this);
                render.addEventListener(ListItemRenderer.ITEM_TOUCH_TAP, this.touchItemrender, this);
            }
            if ("index" in render) {
                render["index"] = index;
            }
            return render;
        }

        private childSizeChange(e: egret.Event) {
            if (!this._childSizeChanged) {
                this._childSizeChanged = true;
                this.addEventListener(egret.Event.ENTER_FRAME, this.sortChildren, this);
            }
        }


        private sortChildren(e: egret.Event) {
            if (!this._childSizeChanged) {
                return;
            }
            this._childSizeChanged = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.sortChildren, this);
            let len = this._renderList.length;
            let render: R;
            let lastrender: R;
            render = this._renderList[0];
            render.x = 0;
            render.y = 0;

            if (render.renderView) {
                this.addChild(render.renderView);
            }

            let ix: number;
            let iy: number;
            let hei: number;
            let wid: number;
            for (let i = 1; i < len; i++) {
                render = this._renderList[i];

                ix = i % this._columncount;
                iy = Math.floor(i / this._columncount);
                if (ix == 0) {
                    render.x = 0;
                } else {
                    lastrender = this._renderList[i - 1];
                    render.x = lastrender.x + lastrender.width + this._hgap;
                }
                if (iy == 0) {
                    render.y = 0;
                } else {
                    lastrender = this._renderList[i - this._columncount];
                    render.y = lastrender.y + lastrender.height + this._vgap;
                }

                if (i >= this.startIndex && i <= this.endIndex) {
                    if (render.renderView) {
                        this.addChild(render.renderView);
                    }
                }

                if (render.renderView) {
                    hei = render.y + render.height;
                    wid = render.x + render.width;
                }

            }
            this.height = 0;
            this.height = hei;
            this.width = 0;
            this.width = wid;
            this.graphics.clear();
            this.graphics.beginFill(0, 0);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
            if (this._waitForSetIndex) {
                this.selectedIndex = this._waitIndex;
            }
        }

        public set selectedIndex(value: number) {
            if (this._selectedIndex == value) return;
            this._waitIndex = value;
            if (!this._data) {
                this._waitForSetIndex = true;
                return;
            }
            let render: R;
            let len = this._renderList.length;
            if (value > len) {
                return;
            } else {
                render = this._renderList[value];

                if (render.renderView && render.renderView.stage) {
                    this._selectedIndex = value;
                    this._waitForSetIndex = false;
                    for (let i = 0; i < len; i++) {
                        render = this._renderList[i];
                        if (render) {
                            if (i == value) {
                                render.setChooseState(true);
                                this.moveScroll(render);
                                this._selectedItem = render;
                            } else {
                                render.setChooseState(false);
                            }
                        }
                    }

                    this.dispatchEventWith(PageList.ITEM_SELECTED);

                } else {
                    this._waitForSetIndex = true;
                }

                if (this._waitForSetIndex) {
                    this.moveScroll(render);
                    //假如列表里有30个项，选中第20个，所以前20个都没有渲染，这边自己设置的rect，并不能引发scroller抛CHANGE事件
                    //所以自己抛一下
                    //如果已经渲染过，可不用抛
                    this.dispatchEventWith(Scroller.SCROLL_POSITION_CHANGE);
                }

            }
        }

        private moveScroll(render: R) {
            if (!this.scrollRect) return;
            let rect: egret.Rectangle = this.scrollRect;
            let oldPos: number;
            let dis: number;
            if (this._scrollType == 0) {
                oldPos = rect.y;
                rect.y = render.y - (this.scrollRect.height / this._viewCount) / 2;
                if (rect.y <= 0) {
                    rect.y = 0;
                }
                this.scrollRect = rect;
                dis = rect.y - oldPos;
            } else {
                oldPos = rect.x;
                rect.x = render.x - (this.scrollRect.width / this._viewCount) / 2;
                if (rect.x <= 0) {
                    rect.x = 0;
                }
                this.scrollRect = rect;
                dis = rect.x - oldPos;
            }
            let scroller = this.scroller;
            if (scroller) {
                scroller.doMoveScrollBar(-dis);
            }
        }

        public get selectedIndex(): number {
            return this._selectedIndex;
        }

        public selectItemByData(key: string, value: any) {
            let data = this._data;
            let len = data.length;
            for (let i = 0; i < len; i++) {
                if (key in data[i]) {
                    if (data[i][key] == value) {
                        this.selectedIndex = i;
                        break;
                    }
                }
            }
        }

        public get selectedItem() {
            return this._selectedItem;
        }

        /**
         * 更新item数据
         * 
         * @param {number} index (description)
         * @param {*} data (description)
         */
        public updateItembyIndex(index: number, data: any) {
            let item = this.getItemRenderAt(index);
            if (item) {
                this._data[index] = data;
                if (index <= this.endIndex && index >= this.startIndex) {
                    this.doRenderListItem(index, index + 1);
                }
            }

        }

        /**
         * 根据key value获取item,将item的data重新赋值为data
         * 
         * @param {string} key (description)
         * @param {*} value (description)
         * @param {*} data (description)
         */
        public updateItemByKey(key: string, value: any, data: any) {
            let [item, index] = this.getItemRenderData(key, value);
            if (item) {
                this.updateItembyIndex(index, data);
            }

        }

        /**
         * 
         * 根据索引获得视图
         * @param {number} index
         * @returns
         */
        public getItemRenderAt(index: number) {
            return this._renderList[index];
        }

        /**
         * 
         * 通过搜索数据，获取Render
         * @param {string} key
         * @param {*} value
         * @returns
         */
        public getItemRenderData(key: string, value: any): [R, number] {
            let data = this._data;
            let len = data.length;
            let item: R;
            let i = 0;
            for (; i < len; i++) {
                let dat = data[i];
                if (key in dat) {
                    if (dat[key] === value) {
                        item = this.getItemRenderAt(i);
                        break;
                    }
                }
            }
            return [item, i];
        }

        /**
         * 在index后插入一个或多个数据，如果要在首位插入传-1
         * 
         * @param {number} index (description)
         * @param {*} data (description)
         */
        public insertItem(index: number, data: any[]) {
            //todo
        }

        public deleteItemByIndex(value: any[]) {
            //todo
        }

        public deleteItemByData(key: string, value: any) {
            //todo
        }

        public removeItem(item: R) {
            let index = this._renderList.indexOf(item);
            if (index != -1) {
                this._renderList.splice(index, 1);
                removeDisplay(item);
                this._data.splice(index, 1);
                item.dispose();
                if (!this.renderChange) {
                    this.renderChange = true;
                    this.addEventListener(egret.Event.ENTER_FRAME, this.refreshByRemoveItem, this);
                }

            }
        }

        private refreshByRemoveItem(e: egret.Event) {
            this.renderChange = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.refreshByRemoveItem, this);
            this.scrollPositionChange();
            this._childSizeChanged = true;
            this.sortChildren(null);
        }

        public getAllItems() {
            return this._renderList;
        }

        public dispose() {
            this.recycle();
        }

        public recycle() {
            this.graphics.clear();
            this.width = 0;
            this.height = 0;
            this._selectedIndex = -1;
            this._data = undefined;
            let list = this._renderList;
            for (let render of list) {
                render.setData(undefined);
                removeDisplay(render.renderView);
                render.dispose();
            }
            list.length = 0;
            this._selectedItem = undefined;
            this._waitForSetIndex = false;
            this._waitIndex = -1;
        }
    }
}