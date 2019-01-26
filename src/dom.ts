import { ElementDimension } from './base';

export function getSize(element: HTMLElement): ElementDimension {
    let hidden = /none/i.test(element.style.display || '');
    if (hidden) element.style.display = null;

    let result = <ElementDimension>{ width: element.offsetWidth, height: element.offsetHeight };
    if (hidden) element.style.display = 'none';

    return result;
}

export function isVisible(element: HTMLElement): boolean {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
}

export function addClass(element: Element, className: string) {
    if (!className) return;

    let classes = element.className
        .split(' ')
        .concat(className.split(' '))
        .reduce(
            (previous, current) => {
                if (previous.indexOf(current) === -1) previous.push(current);
                return previous;
            },
            [] as string[]
        );

    element.className = classes.filter(name => name).join(' ');
}

export function removeClass(element: Element, className: string) {
    if (!className) return;

    let names = className.split(' ');
    let classes = element.className.split(' ').filter(name => names.indexOf(name) === -1);
    if (!classes.length) element.removeAttribute('class');
    else element.className = classes.filter(name => name).join(' ');
}

export function setStyle(element: HTMLElement, styles: { [key: string]: string | number }) {
    for (let name in styles) (element.style as any)[name] = styles[name];
}

export function getStyle(element: Element, name: string): string {
    const view = document.defaultView;
    return view ? view.getComputedStyle(element).getPropertyValue(name) : '';
}

export function removeChildren(element: Element) {
    while (element.lastChild) element.removeChild(element.lastChild);
}
