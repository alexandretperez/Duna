import * as utils from '../utils';
import * as dom from '../dom';
import * as http from '../http';
import ControlBase, { ControlOptions } from './ControlBase';
import { CallbackArgs, Callback } from '../base';

export interface SearchBoxOptions extends ControlOptions {
    template: string;
    activeItemClass?: string;
    delay?: number;
    source?: string | any[] | { (value: string): PromiseLike<any> };
    matchesTemplate?: string;
    fieldTemplate?: string;
    maxResults?: number;
    minLength?: number;
    offsetX?: number;
    offsetY?: number;
    dataRoot?: string;
    noRecordsTemplate?: string;
    searchFields?: string[];
    onBeforeRequest?: Callback<SearchBox>;
    onAfterRequest?: CallbackArgs<SearchBox, { container: HTMLElement, data: any[] }>;
    onResultsRender?: CallbackArgs<SearchBox, { container: HTMLElement }>;
    onItemSelected?: CallbackArgs<SearchBox, { data: any, text: string }>;
    onActiveItem?: CallbackArgs<SearchBox, { data: any, text: string }>;
    root?: string;
}

interface DataFilterObject {
    dataSource: any[],
    fields: string[],
    search: string
}

const SEARCH_BOX_DATA_VALUE = "dunaSearchBoxDataValue";
class SearchBox extends ControlBase {
    private _sourceHandler!: (source: any) => void;
    private _timer!: number | null;
    private _searchFields!: string[];
    private _dataFilter!: (filter: any) => any;
    private _noRecords!: boolean;
    private _itemTemplate!: string;
    private _containerBody!: HTMLElement;
    private _container!: HTMLElement;
    private _root!: Element | null;

    $element!: HTMLInputElement;
    $options!: SearchBoxOptions;

    constructor(element: HTMLInputElement, options: SearchBoxOptions) {

        if (!options)
            throw new Error("SearchBox.options is required.");

        if (!options.template)
            throw new Error("SearchBox.options.template is required.");

        if (!options.source)
            throw new Error("SearchBox.source is required.");

        const defaultOptions: SearchBoxOptions = {
            template: '',
            activeItemClass: "active",
            delay: 500,
            source: [],
            matchesTemplate: "<mark>${0}</mark>",
            fieldTemplate: "${0}",
            maxResults: 10,
            minLength: 2,
            offsetX: 0,
            offsetY: 2,
            dataRoot: "data",
            noRecordsTemplate: "<div>No records found</div>",
            searchFields: []
        }

        super(element, utils.merge(defaultOptions, options));
    }

    $initialize() {
        this._setRoot();
        this._createTemplate();
        this._defineSourceHandler();
        this._registerEvents();
    }

    private _setRoot() {
        if (this.$options.root)
            this._root = document.querySelector(this.$options.root);
    }

    private _createTemplate() {
        let template = this.$options.template;
        this.$element.insertAdjacentHTML("afterend", template);

        let container = this.$element.nextElementSibling as HTMLElement;
        let zIndex = parseInt(dom.getStyle(container, "z-index"), 10);
        if (isNaN(zIndex))
            zIndex = 9999;

        dom.setStyle(container, {
            display: "none",
            position: "fixed",
            margin: 0,
            overflowY: "auto",
            height: "auto",
            zIndex
        });

        let item = container.querySelector("[dn-item]");
        if (!item)
            throw new Error("The container template must also have a child element with 'dn-item' attribute on it")

        this._container = container;
        this._containerBody = item.parentElement as HTMLElement;
        this._itemTemplate = item.outerHTML;
    }

    private _renderNoRecords() {
        this._noRecords = true;
        this._resetContainerBody();
        if (this.$options.noRecordsTemplate) {
            this._containerBody.insertAdjacentHTML("beforeend", this.$options.noRecordsTemplate);
            this._container.style.display = "";
            this._updateContainerStyle();
        }
        else
            this._containerBody.style.display = "none";
    }

    private _staticSourceHandler(dataSource: any[]) {
        let value = this.$element.value;
        if (!value.length)
            return;

        if (dataSource.length) {
            this._defineDataFilter(dataSource);
            let items = this._dataFilter({
                dataSource,
                fields: this._searchFields,
                search: value.replace(/\\/g, '\\\\')
            });

            if (!items.length) {
                this._renderNoRecords();
                return;
            }

            this._noRecords = false;
            this._render(items, value);
            return;
        }

        this._renderNoRecords();
    }

    private _readData(data: any) {
        let root = this.$options.dataRoot;
        if (!root)
            return data;

        root.split('.').forEach(property => {
            if (data.hasOwnProperty(property))
                data = data[property];
            return data;
        });

        return data;
    }

    private _httpSourceHandler(url: string) {
        let value = this.$element.value.trim();
        if (!value.length)
            return;

        url = url.replace("${query}", encodeURIComponent(value));
        this._promiseSourceHandler(() => {
            return http.get(url);
        });
    }

    private _promiseSourceHandler(promise: (value: string) => PromiseLike<any>) {
        window.clearTimeout(this._timer as number);
        this._timer = window.setTimeout(() => {
            this.$invoke(this.$options.onBeforeRequest, this);
            promise(encodeURIComponent(this.$element.value)).then(response => {
                let data = this._readData(response);
                if (!data || !Array.isArray(data))
                    throw new Error("The data source is invalid. Check if the options.dataRoot is correct.")
                this.$invoke(this.$options.onAfterRequest, this, { container: this._container, data });
                this._staticSourceHandler(data);
            }, error => console.error(error));
        }, this.$options.delay);
    }

    private _normalizeValue(value: any): string {
        if (!utils.isDefined(value))
            return '';

        if (!utils.isString(value))
            value = value.toString().trim();

        return value;
    }

    private _resetContainerBody() {
        Array.from(this._containerBody.children).forEach(child => {
            this.$removeEvent("mouseenter", this._onItemMouseEnterEvent, child);
            this.$removeEvent("click", this._onItemClick, child);
        })

        dom.removeChildren(this._containerBody);
    }

    private _render(dataSource: any[], value: string) {
        this._resetContainerBody();

        let options = this.$options;
        let len = Math.min(dataSource.length, options.maxResults as number);
        let rawValue = utils.noDiacritics(value);
        let expr = new RegExp(rawValue, 'gi');

        for (let i = 0; i < len; i++) {
            let item = Object.assign({}, dataSource[i]);
            let content = this._itemTemplate;

            this._searchFields.forEach(field => {
                let fieldValue = this._normalizeValue(item[field]);
                if (!fieldValue)
                    return;

                let result = fieldValue.split('');
                utils.noDiacritics(fieldValue).replace(expr, (match, index) => {
                    let matchesTemplate = (options.matchesTemplate as string).replace("${0}", fieldValue.substr(index, match.length));
                    let strIndex = index + match.length - 1;
                    while (strIndex > index)
                        result.splice(strIndex--, 1);
                    result.splice(index, 1, matchesTemplate);
                    return '';
                });

                content = content.replace(new RegExp(`\\\${${field}\\}`, 'g'), result.join(''));
            });

            content = utils.template(content, item);
            this._containerBody.insertAdjacentHTML("beforeend", content);
            (this._containerBody.lastElementChild as any)[SEARCH_BOX_DATA_VALUE] = dataSource[i];
        }

        [...this._containerBody.querySelectorAll("img[dn-src]")].forEach(img => {
            let value = img.getAttribute("dn-src");
            if (value && value.length > 0)
                (img as HTMLImageElement).src = value;
        });

        this._container.style.display = len ? "block" : "none";
        this._updateContainerStyle();
        this._registerContainerEvents();

        this.$invoke(this.$options.onResultsRender, this, { container: this._container });
    }

    private _defineDataFilter(dataSource: any[]) {
        if (this._dataFilter)
            return;

        if (utils.isString(dataSource[0])) {
            this._dataFilter = this._stringDataFilter;
            this._searchFields = ["0"];
        } else {
            this._dataFilter = this._objectDataFilter;
            let fields = this.$options.searchFields;
            if (!Array.isArray(fields) || !fields.length)
                fields = Object.keys(dataSource[0]);
            this._searchFields = fields;
        }
    }

    private _stringDataFilter(filter: DataFilterObject) {
        return this._objectDataFilter(Object.assign(filter, {
            dataSource: filter.dataSource.map(p => { return { 0: p } })
        }));
    }

    private _objectDataFilter(filter: DataFilterObject) {
        let value = utils.noDiacritics(filter.search);
        let expr = new RegExp(value, 'i');
        let fields = filter.fields;
        let len = fields.length;
        return filter.dataSource.reduce((previous, current) => {
            for (let i = 0; i < len; i++) {
                let raw = utils.noDiacritics(current[fields[i]]);
                if (expr.test(raw)) {
                    previous.push(current);
                    break;
                }
            }
            return previous;
        }, []);
    }

    private _defineSourceHandler() {
        if (Array.isArray(this.$options.source)) {
            this._sourceHandler = this._staticSourceHandler;
        } else if (utils.isString(this.$options.source)) {
            this._sourceHandler = this._httpSourceHandler;
        } else {
            this._sourceHandler = this._promiseSourceHandler;
        }
    }

    private _selectItem(item: HTMLElement) {
        this._resetContainerBody();
        let data = (item as any)[SEARCH_BOX_DATA_VALUE];
        let field = utils.template(this.$options.fieldTemplate as string, data);
        this.$element.value = field;
        this.$invoke(this.$options.onItemSelected, this, {
            data,
            text: item.innerText.trim()
        });
        this.$element.dispatchEvent(new Event("input", { bubbles: true }));
        this._container.style.display = "none";
    }

    private _registerEvents() {
        this.$addEvent("keydown", this._onKeyDownEvent);
        this.$addEvent("input", this._onInputEvent);
        this.$addEvent("blur", this._onBlurEvent);
        this.$addEvent("scroll", this._onWindowScrollOrResize, window);
        this.$addEvent("resize", this._onWindowScrollOrResize, window);
    }

    private _keyboardNavigate(e: KeyboardEvent) {
        let isGoingDown = e.key === "ArrowDown";
        if (!isGoingDown && e.key !== "ArrowUp")
            return;

        let active = this.$options.activeItemClass as string;
        let item = this._containerBody.querySelector('.' + active) as any;
        let action = isGoingDown ? ["firstElementChild", "nextElementSibling"] : ["lastElementChild", "previousElementSibling"];

        if (item) {
            dom.removeClass(item, active);
            item = item[action[1]];
        }

        if (!item)
            item = (this._containerBody as any)[action[0]];

        dom.addClass(item, active);
        let data = item[SEARCH_BOX_DATA_VALUE];
        this.$invoke(this.$options.onActiveItem, this, {
            data,
            text: item.innerText.trim()
        });

        this._updateContainerScrollPosition(item, isGoingDown);
    }

    private _updateContainerScrollPosition(item: HTMLElement, isGoingDown: boolean) {
        let body = this._containerBody;
        let value = (item === body.firstElementChild)
            ? 0
            : (item === body.lastElementChild)
                ? body.scrollHeight
                : -1;

        if (value > -1) {
            body.scrollTop = value;
            return;
        }

        let max = body.offsetHeight;
        let top = item.offsetTop + (isGoingDown ? item.offsetHeight : 0);

        if (top > (max + body.scrollTop)) {
            body.scrollTop = (top + (isGoingDown ? item.offsetHeight * 0.2 : item.offsetHeight)) - max;
            return;
        }

        let diff = top - body.scrollTop;
        if (diff < 0)
            body.scrollTop = top - (isGoingDown ? item.offsetHeight : item.offsetHeight * 0.2);
    }

    private _onWindowScrollOrResize() {
        if (dom.isVisible(this._container))
            this._updateContainerStyle();
    }
    private _onKeyDownEvent(e: KeyboardEvent) {
        if (!dom.isVisible(this._container) || this._noRecords)
            return;

        if (e.key === "Enter" || e.key === "Tab") {
            let active = this.$options.activeItemClass;
            let item = this._containerBody.querySelector('.' + active);

            if (!item) {
                if (this._containerBody.children.length === 1)
                    item = this._containerBody.firstElementChild;
                else return;
            }

            if (item)
                this._selectItem(item as HTMLElement);

            if (e.key === "Enter")
                e.preventDefault();

            return;
        }

        this._keyboardNavigate(e);
    }
    private _onInputEvent(e: KeyboardEvent) {
        let value = this.$element.value;
        if (!e.isTrusted)
            return;

        if (value.length && value.length < (this.$options.minLength as number))
            return;

        this._sourceHandler(this.$options.source);
        if (!value.length)
            this._container.style.display = "none";
    }
    private _onBlurEvent() {
        if (!this._container.matches(":hover"))
            this._container.style.display = "none";
    }

    private _updateContainerStyle() {
        let rect = this.$element.getBoundingClientRect();
        this._container.style.minWidth = rect.width + 'px';
        this._container.style.height = "auto";

        let offsetY = this.$options.offsetY as number;
        let offsetX = this.$options.offsetX as number;

        let containerHeight = this._container.offsetHeight + offsetY;
        let bottomSize = window.innerHeight - rect.bottom;
        let maxSize = Math.max(rect.top, bottomSize);
        let newContainerHeight = Math.min(containerHeight, maxSize);
        if (newContainerHeight < containerHeight)
            this._container.style.height = newContainerHeight + 'px';

        let x = rect.left + offsetX
        let y = bottomSize >= rect.top
            ? rect.bottom + offsetY
            : rect.top - this._container.offsetHeight - offsetY;

        if (this._root) {
            let rootRect = this._root.getBoundingClientRect();
            x -= rootRect.left;
            y -= rootRect.top;
        }

        this._container.style.top = y + 'px';
        this._container.style.left = x + 'px';
    }

    private _registerContainerEvents() {
        Array.from(this._containerBody.children).forEach(child => {
            this.$addEvent("mouseenter", this._onItemMouseEnterEvent, child);
            this.$addEvent("click", this._onItemClick, child);
        });
    }

    private _onItemMouseEnterEvent(e: MouseEvent) {
        let className = this.$options.activeItemClass as string;
        let currentItem = ((e.target as Element).parentElement as Element).querySelector('.' + className) as HTMLElement;
        if (currentItem)
            dom.removeClass(currentItem, className);

        dom.addClass(e.target as Element, className);
    }

    private _onItemClick(e: MouseEvent) {
        this._selectItem(e.currentTarget as HTMLElement);
    }

    static from(selector: string, options: SearchBoxOptions): SearchBox[] {
        return [...document.querySelectorAll(selector)].map(element => new SearchBox(<HTMLInputElement>element, options));
    }
}

export default SearchBox;