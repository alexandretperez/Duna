import { Callback } from "../base";

const DUNA_PROPERTY = "$duna";

interface HTMLElement {
    [key: string]: any;
}

type ControlEventObject = {
    type: string;
    handler: Function;
    element: HTMLElement;
}

export interface ControlOptions {
    onReady?: Callback<ControlBase>;
}

abstract class ControlBase {
    _eventsCollection: ControlEventObject[];

    protected $element: HTMLElement;
    protected $options: ControlOptions;
    protected $guid: string;

    constructor(element: HTMLElement, options: ControlOptions) {
        this.$element = element;
        this.$options = options;
        this.$guid = `dn${Math.random().toString(36).substr(2)}`;
        this._eventsCollection = [];

        this.$initialize();
        this.$invoke(this.$options.onReady, this);
        this.$registerControl();
    }

    dispose() {
        console.log(`duna: ${this.constructor.name} #${this.$guid} was disposed`);

        this._eventsCollection.forEach(e => e.element.removeEventListener(e.type, e.handler, false));
        this._eventsCollection = [];
        for (let prop in this)
            this[prop] = undefined;
    }

    private _ensureUniqueInstancePerType() {
        let index = (this.$element[DUNA_PROPERTY] as any[]).findIndex(p =>
            p.constructor.name === this.constructor.name &&
            p.constructor.prototype === this.constructor.prototype
        );

        if (index === -1)
            return;

        let instance = this.$element[DUNA_PROPERTY][index];
        this.$element[DUNA_PROPERTY].splice(index, 1);
        instance.dispose();
    }

    protected abstract $initialize(): void;

    $registerControl() {
        if (!Array.isArray(this.$element.hasOwnProperty(DUNA_PROPERTY)))
            this.$element[DUNA_PROPERTY] = [];

        this._ensureUniqueInstancePerType();
        this.$element[DUNA_PROPERTY].push(this);
    }

    $invoke(callback: Function | undefined, ...args: any[]): any {
        return typeof callback === "function" ? callback.apply(this, args) : undefined;
    }

    $addEvent(type: string, handler: Function, element?: HTMLElement): void {
        handler = handler.bind(this);
        element = element || this.$element;

        this._eventsCollection.push({ type, handler, element });
        element.addEventListener(type, handler, false);
    }

    $removeEvent(type: string, handler: Function, element?: HTMLElement): void {
        handler = handler.bind(this);
        element = element || this.$element;

        let events = this._eventsCollection.filter(p => p.element === element && p.type === type);
        events.forEach(e => {
            let index = this._eventsCollection.indexOf(e);
            this._eventsCollection.splice(index, 1);
            e.element.removeEventListener(type, handler, false);
        });
    }
}

export default ControlBase;