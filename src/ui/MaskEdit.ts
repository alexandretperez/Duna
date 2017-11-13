import * as utils from '../utils';
import ControlBase, { ControlOptions } from './ControlBase';
import { CaretPosition, CallbackArgs } from '../base';

type MaskEditTranslation = {
    test: RegExp | { (value: string): boolean },
    transform?: (value: string) => string
}

export interface MaskEditOptions extends ControlOptions {
    format: string;
    placeholder?: string;
    allowPartial?: boolean;
    trim?: boolean;
    shifter?: string,
    translation?: { [key: string]: MaskEditTranslation },
    onUpdate?: CallbackArgs<MaskEdit, { value: string, rawValue: string }>
}

class MaskEdit extends ControlBase {
    _maskWithShifter: string;
    _originalMaxLength: number;
    _currentFormat: string;
    _translations: { [key: string]: { test: (value: string) => boolean, transform?: (value: string) => string } };
    _formats: string[];

    $element: HTMLInputElement;
    $options: MaskEditOptions;

    constructor(element: HTMLInputElement, options: MaskEditOptions) {
        let defaultOptions: MaskEditOptions = {
            format: "",
            placeholder: "",
            allowPartial: false,
            trim: true,
            shifter: '_',
            translation: {
                '9': { test: /[0-9]/ },
                'a': { test: /[A-Za-z]/ },
                'A': { test: /[A-Za-z]/, transform: n => n.toUpperCase() }
            }
        }

        super(element, utils.merge(defaultOptions, options));
    }

    update(): void {
        let value = this.$element.value;
        let buffer = [];
        for (let i = 0, j = 0; i < this._currentFormat.length; i++) {
            let result = this._applyMask(i, j, value);
            if (result.arg !== undefined)
                buffer.push(result.value);

            if (result.ok)
                j++;
            else if (!result.keepRunning || value[j] === undefined)
                break;
        }

        this._setValue(buffer.join(''));
    }

    getRawValue() {
        let buffer = [];
        let value = this.$element.value;
        for (let i = 0; i < value.length; i++) {
            if (this._hasTranslation(i) && value[i] !== this.$options.shifter)
                buffer.push(value[i]);
        }
        return buffer.join('');
    }

    setOptions(options: MaskEditOptions) {
        this._setOptionsInternal(options);
        this._onBlurEvent();
    }

    dispose() {
        if (this._originalMaxLength === -1)
            this.$element.removeAttribute("maxlength");
        else
            this.$element.maxLength = this._originalMaxLength;

        super.dispose();
    }

    $initialize() {
        this._setOptionsInternal(null);
        this._defineFormat(true);
        this._registerEvents();
        this.update();
    }

    private _setOptionsInternal(options: MaskEditOptions | null): void {
        utils.merge(this.$options, options);
        this._configOptions();
        this._defineFormat(true);
        this._normalizeTranslations();

        this.$element.value = this.getRawValue();
        this.update();
    }

    private _applyMask(i: number, j: number, value: string) {
        let v = value[j];
        let f = this._currentFormat[i];
        let t = this._translations[f];

        let result = {
            isMask: !t && f !== undefined,
            arg: v,
            ok: (!!t && t.test(v || '')) || f === v,
            keepRunning: !t && i < this._currentFormat.length,
            value: ''
        };

        if (result.ok)
            result.value = (t && t.transform ? t.transform : (arg: string) => arg)(v || '');
        else
            result.value = t ? '' : f;

        return result;
    }

    private _replace(e: KeyboardEvent) {
        e.preventDefault();

        let index = this.$element.selectionStart;
        let buffer = this.$element.value.split('');
        buffer[index] = e.key;

        let value = buffer.join('');
        for (let i = index; i < this._currentFormat.length; i++) {
            let result = this._applyMask(i, index, value);
            if (result.ok) {
                buffer[i] = result.value;
                index = i;
                break;
            } else if (result.isMask) {
                buffer[i] = result.value;
            } else {
                buffer[i] = this.$element.value[i];
                break;
            }

            if (!result.keepRunning || buffer[i] === undefined)
                break;
        }

        this._setValue(buffer.join(''));
        this._setCaretPosition(index + 1);
    }

    private _hasTranslation(index: number): boolean {
        let f = this._currentFormat[index];
        return !!this._translations[f];
    }

    private _defineFormat(initialization: boolean) {
        if (initialization)
            this._currentFormat = this._formats[0];

        if (!this._originalMaxLength)
            this._originalMaxLength = this.$element.maxLength;

        this.$element.maxLength = this._currentFormat.length;
    }

    private _configOptions() {
        this._formats = utils.isString(this.$options.format)
            ? [this.$options.format]
            : [].concat(this.$options.format);

        this.$element.placeholder = this.$options.placeholder || this._formats[0];
    }

    private _normalizeTranslations() {
        this._translations = {};
        let translation = this.$options.translation || {};
        for (let t in translation) {
            let testFn = translation[t].test;
            this._translations[t] = {
                test: testFn instanceof RegExp ? (value) => (testFn as RegExp).test(value) : testFn,
                transform: translation[t].transform
            }
        }
    }

    private _registerEvents() {
        this.$addEvent("input", this._onInputEvent);
        this.$addEvent("keydown", this._onKeyDownEvent);
        this.$addEvent("blur", this._onBlurEvent);
    }

    private _onBlurEvent() {
        let value = this.$element.value;
        if (value.indexOf(this.$options.shifter as string) >= 0) {
            this._setValue('');
            return;
        }

        if (value.length === this._currentFormat.length)
            return;

        if (!this.$options.allowPartial)
            this._setValue('');
    }

    private _onInputEvent() {
        this.update();
    }

    private _onKeyDownEvent(e: KeyboardEvent) {
        let caret = this._getCaretPosition();
        if (e.key.length === 1) {
            if (this.$element.value[caret.start])
                this._replace(e);
            return;
        }

        if (e.key === "Backspace") {
            this._backspaceHandler.call(this, e, caret);
            return;
        }

        if (e.key === "Delete") {
            this._deleteHandler.call(this, e, caret);
            return;
        }
    }

    private _getMaskWithShifter(): string {
        if (this._maskWithShifter)
            return this._maskWithShifter;

        let buffer = this._currentFormat.split('');
        for (let i = 0; i < buffer.length; i++) {
            if (this._hasTranslation(i))
                buffer[i] = this.$options.shifter as string;
        }
        return (this._maskWithShifter = buffer.join(''));
    }

    private _default(caret: CaretPosition): boolean {
        if (!this.$element.value.length)
            return true;

        if (!caret.areEquals) {
            if (caret.start === 0 && caret.end === this.$element.value.length)
                return true;
        }

        return false;
    }

    private _deleteHandler(e: KeyboardEvent, caret: CaretPosition) {

        if (this._default(caret))
            return;

        e.preventDefault();

        do {
            caret.end++;
        } while (!this._hasTranslation(caret.end - 1) && caret.end < this._currentFormat.length);

        let buffer = this.$element.value.split('');
        let value = this._getMaskWithShifter().substring(caret.start, caret.end);
        buffer.splice.apply(buffer, [caret.start, caret.end - caret.start].concat(value.split('') as any[]));
        this._setValue(buffer.join(''));
        this._setCaretPosition(caret.start, caret.end);
    }

    private _backspaceHandler(e: KeyboardEvent, caret: CaretPosition) {
        if (this._default(caret))
            return;

        e.preventDefault();
        if (caret.areEquals) {
            do {
                caret.start = Math.max(caret.start - 1, 0);
            } while (!this._hasTranslation(caret.start) && caret.start > 0);
        }

        let buffer = this.$element.value.split('');
        if (caret.end === this.$element.value.length) {
            buffer.splice(caret.start);
        } else {
            let value = this._getMaskWithShifter().substring(caret.start, caret.end);
            buffer.splice.apply(buffer, [caret.start, caret.end - caret.start].concat(value.split('') as any[]));
        }

        this._setValue(buffer.join(''));
        this._setCaretPosition(caret.start);
    }


    private _setCaretPosition(start: number, end: number | undefined = undefined) {
        this.$element.selectionStart = start;
        this.$element.selectionEnd = end || start;
    }

    private _getCaretPosition(): CaretPosition {
        let start = this.$element.selectionStart;
        let end = this.$element.selectionEnd;
        return {
            start,
            end,
            areEquals: start === end
        }
    }

    private _setValue(value: string) {
        this.$element.value = value;
        this.$invoke(this.$options.onUpdate, this, { value, rawValue: this.getRawValue() });
    }

    static from(selector: string, options: MaskEditOptions): MaskEdit[] {
        return [...document.querySelectorAll(selector)].map(element => new MaskEdit(<HTMLInputElement>element, options));
    }
}

export default MaskEdit;