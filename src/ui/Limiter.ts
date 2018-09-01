import * as utils from '../utils';
import * as dom from '../dom';
import ControlBase, { ControlOptions } from './ControlBase';
import { CallbackArgs, ElementDimension } from '../base';

export interface LimiterOptions extends ControlOptions {
    position?: string;
    template?: string;
    timeout?: number;
    offsetX?: number;
    offsetY?: number;
    preserve?: boolean;
    showOnFocus?: boolean;
    root?: string;
    onCreate?: CallbackArgs<Limiter, { tooltip: HTMLElement }>;
    onShow?: CallbackArgs<Limiter, { tooltip: HTMLElement }>;
    onHide?: CallbackArgs<Limiter, { tooltip: HTMLElement }>;
    onChange?: CallbackArgs<Limiter, { tooltip: HTMLElement }>;
}

type ElementPositionCalculation = {
    x: (rect: ClientRect, size: ElementDimension) => number;
    y: (rect: ClientRect, size: ElementDimension) => number;
}

class Limiter extends ControlBase {
    _position!: ElementPositionCalculation;
    _templateContent!: string;
    _tooltip!: HTMLElement | null;
    _timer!: number | null;
    _root!: Element | null;
    $element!: HTMLInputElement | HTMLTextAreaElement;
    $options!: LimiterOptions;

    constructor(element: HTMLInputElement | HTMLTextAreaElement, options: LimiterOptions) {
        let defaultOptions = {
            position: "right bottom",
            template: "<small><em>${len} / ${max}</em></small>",
            timeout: 1.5,
            offsetX: 0,
            offsetY: 0,
            preserve: false,
            showOnFocus: false
        }

        super(element, utils.merge(defaultOptions, options));
    }

    $initialize() {
        this._setRoot();
        this._registerEvents();
        this._configPosition();
        this._timer = null;
    }

    dispose() {
        if (this._tooltip)
            this._destroy();

        window.removeEventListener("scroll", this._onWindowScrollOrResize, false);
        super.dispose();
    }

    private _setRoot() {
        if (this.$options.root)
            this._root = document.querySelector(this.$options.root);
    }

    private _destroy() {
        if (this._tooltip && this._tooltip.parentNode)
            this._tooltip.parentNode.removeChild(this._tooltip);

        this._tooltip = null;
    }

    private _getTooltip(onFocus?: boolean) {
        let visible = this._tooltip && dom.isVisible(this._tooltip);

        if (!this._tooltip) {
            this.$element.insertAdjacentHTML("afterend", this.$options.template as string);
            this._tooltip = this.$element.nextElementSibling as HTMLElement;
            this._templateContent = this._tooltip.innerHTML;
            this._tooltip.style.position = "fixed";
            let rect = this.$element.getBoundingClientRect();
            this._tooltip.style.left = rect.left + 'px'; // set initial position
            this.$invoke(this.$options.onCreate, this, { tooltip: this._tooltip });
            this._tooltip.style.display = "none";
        }

        if (!visible) {
            if (onFocus && !this.$options.showOnFocus)
                return this._tooltip;

            this.$invoke(this.$options.onShow, this, { tooltip: this._tooltip });
            this._tooltip.style.display = "";
        }

        return this._tooltip;
    }

    private _registerEvents() {
        this.$addEvent("focus", this._onFocusEvent);
        this.$addEvent("input", this._onInputEvent);
        this.$addEvent("blur", this._onBlurEvent);
        this.$addEvent("scroll", this._onWindowScrollOrResize, window);
        this.$addEvent("resize", this._onWindowScrollOrResize, window);
    }

    private _onWindowScrollOrResize() {
        if (this._tooltip && dom.isVisible(this._tooltip))
            this._updatePosition();
    }

    private _onFocusEvent(e: FocusEvent) {
        if (!this.$options.showOnFocus)
            return;

        this._onInputEvent();
    }

    private _onInputEvent() {
        let tooltip = this._getTooltip(true);
        let data = {
            len: this.$element.value.length,
            max: this.$element.maxLength,
            rem: 0
        }

        data.rem = data.max - data.len;
        tooltip.innerHTML = utils.template(this._templateContent, data);

        this._updatePosition();
        window.clearTimeout(this._timer || 0);
        this._timer = window.setTimeout(() => this._onBlurEvent(), (this.$options.timeout as number) * 1000);
    }

    private _onBlurEvent() {
        if (!this._tooltip || this._tooltip.style.display === "none")
            return;

        if (!this.$options.preserve)
            this._destroy.call(this);
        else
            this._tooltip.style.display = "none";

        this.$invoke(this.$options.onHide, this, { tooltip: this._tooltip });
    }

    private _updatePosition() {
        let tooltip = this._getTooltip();
        let rect = this.$element.getBoundingClientRect();
        let position = this.$options.position as string;

        let size = dom.getSize(tooltip);

        let x = this._position.x(rect, size);
        let y = this._position.y(rect, size);

        x += this.$options.offsetX as number;
        y += this.$options.offsetY as number;

        if (this._root) {
            let rootRect = this._root.getBoundingClientRect();
            y -= rootRect.top;
            x -= rootRect.left;
        }

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;

        this.$invoke(this.$options.onChange, this, { tooltip: this._tooltip });
    }

    private _configPosition() {
        let pattern: { [key: string]: (rect: ClientRect, size: ElementDimension) => number } = {
            left: (rect, size) => rect.left,
            right: (rect, size) => rect.right - size.width,
            top: (rect, size) => rect.top - size.height,
            bottom: (rect, size) => rect.bottom
        }

        let position = this.$options.position as string;
        this._position = {} as ElementPositionCalculation;
        let matches = position.match(/(^| )(left|right)( |$)/);
        if (matches)
            this._position.x = pattern[matches[2]];

        matches = position.match(/(^| )(top|bottom)( |$)/);
        if (matches)
            this._position.y = pattern[matches[2]];
    }

    static from(selector: string, options: LimiterOptions): Limiter[] {
        return [...document.querySelectorAll(selector)].map(element => new Limiter(<HTMLInputElement | HTMLTextAreaElement>element, options));
    }
}

export default Limiter;