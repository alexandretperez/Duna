import { Converter } from "./base";

export function merge(target: any, ...sources: any[]): any {
    sources.forEach(source => {
        for (let p in source || {}) {
            if (source.hasOwnProperty(p) && isDefined(source[p])) {
                if (source[p].constructor === Object) {
                    target[p] = target[p] || {};
                    merge(target[p], source[p]);
                } else {
                    target[p] = Array.isArray(source[p]) 
                        ? source[p].slice(0) 
                        : source[p];
                }
            }
        }
    });

    return target;
}

export function isDefined(value: any): boolean {
    return value !== undefined && value !== null;
}

export function isJsonLike(value: string): boolean {
    let start = /^\[|^\{(?!\{)/;
    let ends: { [key: string]: RegExp } = { '[': /]$/, '{': /}$/ };
    let m = value.match(start);
    return !!m && ends[m[0]].test(value);
}

export function isFunction(value: any): value is Function {
    return typeof value === "function"
};

export function isString(value: any): value is string {
    return typeof value === "string";
}

/**
 * Determines whether a reference is an object.
 * Unlike the `typeof` in javascript, `null` values are not considered objects.
 * @param value 
 */
export function isObject(value: any): value is object {
    return value !== null && typeof value === "object";
}

/**
 * Determines whether a reference is a valid number.
 *
 * Unlike the `typeof` in JavaScript, the special numeric values `NaN`, `Inifity` and `-Infinity` are not considered as valid numbers.
 * @param value Reference to check.
 */
export function isNumber(value: any): value is number {
    return typeof value === "number" && !isNaN(value) && isFinite(value);
}

export function template(format: string, data: any, prefix = '${', suffix = '}'): string {
    let regex = new RegExp(`\\${prefix}([^(\\${suffix})]+)\\${suffix}`, 'g');
    let result = format.toString().replace(regex, (expr, key) => {
        return isDefined(data[key]) ? data[key] : '';
    });

    return result;
}

export function toQuery(obj: any, keyEncoding: Converter<string, any> = (v) => encodeURIComponent(v), valueEncoding: Converter<string, any> = (v) => encodeURIComponent(v)): string {

    let query: string[] = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (Array.isArray(obj[p])) {
                (obj[p] as any[]).forEach(item => {
                    query.push(`${keyEncoding(p)}=${valueEncoding(item)}`);
                });
            } else {
                query.push(`${keyEncoding(p)}=${valueEncoding(obj[p])}`);
            }
        }
    }
    return query.join("&");
}

export function fromQuery(query: string, keyEncoding: Converter<string, any> = (v) => decodeURIComponent(v).toLowerCase(), valueEncoding: Converter<string, any> = (v) => decodeURIComponent(v)): any {
    if (!query)
        return null;

    return query.split('&').reduce((previous, current) => {
        let item = current.split('=');
        let key = keyEncoding(item[0]);
        let value = valueEncoding(item[1]);
        if (previous[key]) {
            if (!Array.isArray(previous[key]))
                previous[key] = [previous[key]];

            previous[key].push(value);
        } else {
            previous[key] = value;
        }
        return previous;
    }, {} as { [key: string]: any });
}

export function titleCase(value: string): string {
    return value.replace(/(\w+)/g, v => v[0].toUpperCase() + v.slice(1).toLowerCase());
}

export function noDiacritics(value: string): string {
    if (!isString(value))
        return value;

    let patterns: { [key: string]: RegExp } = {
        'A': /[\300-\306]/g,
        'a': /[\340-\346]/g,
        'E': /[\310-\313]/g,
        'e': /[\350-\353]/g,
        'I': /[\314-\317]/g,
        'i': /[\354-\357]/g,
        'O': /[\322-\330]/g,
        'o': /[\362-\370]/g,
        'U': /[\331-\334]/g,
        'u': /[\371-\374]/g,
        'N': /[\321]/g,
        'n': /[\361]/g,
        'C': /[\307]/g,
        'c': /[\347]/g
    }

    for (let key in patterns)
        value = value.replace(patterns[key], key);

    return value;
}