import * as utils from '../utils';
import ControlBase, { ControlOptions } from './ControlBase';
import { CallbackArgs } from '../base';
import { isNumber } from '../utils';

export interface NumericBoxOptions extends ControlOptions {
    scale?: number;
    decimalSeparator?: string;
    groupingSeparator?: string;
    format?: string | string[];
    placeholder?: string;
    nullable?: boolean;
    min?: number;
    max?: number;
    onChange?: CallbackArgs<NumericBox, { value: number, inputValue: number }>;
    onFormat?: CallbackArgs<NumericBox, { value: number, text: string }>;
}

class NumericBox extends ControlBase {

    $element!: HTMLInputElement;
    $options!: NumericBoxOptions;
    private _dataFormat!: string[];

    constructor(element: HTMLInputElement, options: NumericBoxOptions) {

        let defaultOptions: NumericBoxOptions = {
            scale: 0,
            decimalSeparator: '.',
            groupingSeparator: ',',
            format: ['-n', 'n', 'n'],
            placeholder: 'n',
            nullable: false
        }

        super(element, utils.merge(defaultOptions, options));
    }

    $initialize(): void {
        this._normalizeFormat();
        this._registerEvents();
        this.format();
    }

    format() {
        let text = this.getRawValue() || "";
        let o = this.$options;

        let ev = { value: 0, text: "" };

        if (!text && o.nullable) {
            this.$invoke(o.onFormat, this, ev);
            return;
        }

        text = text.replace(o.decimalSeparator || '', ".");

        let n = parseFloat(text);
        if (!utils.isNumber(n))
            n = 0;

        n = this._ensureRange(n, o.min, o.max);

        let scale = utils.isNumber(o.scale) ? o.scale : 0;
        let ns = n.toFixed(scale);

        text = ns.replace(".", o.decimalSeparator || '');
        if (scale > 0) {
            let expr = new RegExp(`(\\d)(\\d{3}([\\${o.groupingSeparator}\\${o.decimalSeparator}]))`);
            while (expr.test(text))
                text = text.replace(expr, `$1${o.groupingSeparator}$2`);
        }

        let formatted = "";
        let f = this._dataFormat;
        let placeholder = o.placeholder || '';

        if (n === 0)
            formatted = f[2].replace(placeholder, text);
        else {
            formatted = (n > 0)
                ? (f[1]).replace(placeholder, text)
                : f[0].replace(placeholder, text.replace('-', ''));
        }

        ev.value = parseFloat(ns);
        ev.text = formatted;
        this.$invoke(o.onFormat, this, ev);
        this.$element.value = formatted;
    }

    getRawValue() {
        let value = this.$element.value;
        if (!value)
            return "";

        let matches = value.match(/[-\d]+/g);
        if (!matches || !matches.length)
            return "";

        if (value[0] === ',' || value[0] === '.')
            matches.unshift('0');

        let len = matches.length;
        if (len === 1)
            return parseFloat(matches[0]).toString();

        let result = "";
        let separator = (this.$options.scale as number) > 0 ? "." : "";
        while (--len > -1) {
            result = separator + matches[len] + result;
            separator = "";
        }

        if (!result)
            return result;

        return parseFloat(result).toFixed(this.$options.scale);
    }

    private _normalizeFormat(): void {
        let format = this.$options.format;
        if (utils.isString(format)) {
            format = ['-' + format, <string>format, <string>format];
        }
        else if (Array.isArray(format) && format.length === 2)
            format.push(format[1]);

        this._dataFormat = format as string[];
    }

    private _registerEvents(): void {
        this.$addEvent("focus", this._onFocusEvent);
        this.$addEvent("click", this._onFocusEvent);
        this.$addEvent("keydown", this._onKeyDownEvent);
        this.$addEvent("change", this._onChangeEvent);
        this.$addEvent("blur", this.format);
    }

    private _onKeyDownEvent(e: KeyboardEvent): void {
        let el = this.$element;

        if (e.key === "Enter") {
            el.blur();
            return;
        }

        if (e.key.length > 1)
            return;

        if ((/[0-9]/.test(e.key) && !e.shiftKey))
            return;

        let negSign = (e.key === "-");
        if (negSign && (!el.value || (el.selectionStart === 0 || document.getSelection().toString() === el.value)))
            return;

        let scale = this.$options.scale as number;
        if (/[.,]/.test(e.key) && utils.isNumber(scale) && scale > 0 && (!/[.,]/g.test(el.value) || document.getSelection().toString() === el.value))
            return;

        e.preventDefault();
    }

    private _onFocusEvent(e: FocusEvent): void {
        let el = this.$element;
        if (!this.$options.nullable && !el.value)
            this.format();

        if (!el.hasAttribute("readonly"))
            el.value = this.getRawValue();

        el.select();
        e.preventDefault();
    }

    private _onChangeEvent(e: Event): void {
        let o = this.$options;
        let inputValue = parseFloat(this.getRawValue());
        let value = this._ensureRange(inputValue, o.min, o.max);
        this.$invoke(this.$options.onChange, this, { value, inputValue });
    }

    private _ensureRange(n: number, min: number | undefined, max: number | undefined): number {
        let hasMin = utils.isNumber(min);
        let hasMax = utils.isNumber(max);

        if (hasMin && hasMax && <Number>min >= <Number>max)
            throw new RangeError("min must have a lesser value than max");

        if (hasMin && n < <Number>min)
            return min as number;

        if (hasMax && n > <Number>max)
            return max as number;

        return n;
    }

    static from(selector: string, options: NumericBoxOptions): NumericBox[] {
        return [...document.querySelectorAll(selector)].map(element => new NumericBox(<HTMLInputElement>element, options));
    }
}

export default NumericBox;