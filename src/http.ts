import * as utils from './utils';

type ResponseConverter = (xhr: XMLHttpRequest, options: HttpOptions) => any;

interface HttpOptions {
    user?: string;
    password?: string;
    headers?: { [key: string]: string },
    data?: any;
    responseConverter?: ResponseConverter;
    json?: boolean;
    crossDomain?: boolean;
    withCredentials?: boolean;
}

interface HttpResponse {
    data: any
    options: HttpOptions,
    status: number,
    statusText: string,
    contentType: string | null;
}

function getHeaders(options: HttpOptions): { [key: string]: any } {
    const defaultHeaders: { [key: string]: string } = {
        "Accept": "text/plain, text/javascript, application/json, application/xml, */*",
        "Content-Type": options.json
            ? "application/json; charset=UTF-8"
            : "application/x-www-form-urlencoded; charset=UTF-8"
    }

    let normalizedHeaders: { [key: string]: any } = {};
    let headers = options.headers || {};
    for (var p in headers)
        normalizedHeaders[utils.titleCase(p)] = headers[p];

    if (!options.crossDomain || !defaultHeaders["X-Requested-With"])
        defaultHeaders["X-Requested-With"] = "XMLHttpRequest";

    return Object.assign({}, defaultHeaders, normalizedHeaders);
}

function getResponseConverter(optionsResponseConverter?: ResponseConverter): ResponseConverter {
    if (optionsResponseConverter && utils.isFunction(optionsResponseConverter))
        return optionsResponseConverter;

    return (xhr: XMLHttpRequest, options: HttpOptions) => {
        let responseHeader = xhr.getResponseHeader("Content-Type") || '';

        if (responseHeader.indexOf("application/json") > -1 || utils.isJsonLike(xhr.responseText))
            return JSON.parse(xhr.response);

        return responseHeader.toLowerCase() === "text/xml"
            ? xhr.responseXML
            : xhr.responseText;
    }
}

function startRequest(method: string, url: string, options: HttpOptions): PromiseLike<HttpResponse> {
    return new Promise((done, error) => {
        let xhr = new XMLHttpRequest();
        if (options.withCredentials)
            xhr.withCredentials = options.withCredentials;

        xhr.open(method, url, true, options.user, options.password);
        let headers = options.headers || {};
        for (var p in headers)
            xhr.setRequestHeader(p, headers[p]);

        xhr.onload = () => {
            let response: HttpResponse = {
                data: getResponseConverter(options.responseConverter)(xhr, options),
                contentType: xhr.getResponseHeader("Content-Type"),
                options,
                status: xhr.status,
                statusText: xhr.statusText
            };

            if (xhr.status >= 200 && xhr.status < 300)
                done(response);
            else
                error(response);
        }

        let data = options.data;
        if (utils.isObject(data))
            data = JSON.stringify(data);

        xhr.send(data);
    });
}

export function init(method: string, url: string, options: HttpOptions): PromiseLike<HttpResponse> {
    let headers = getHeaders(options);

    if (method.toLowerCase() === "get" && (headers["Content-Type"] || '').indexOf("application/json") === 0) {
        let index = url.indexOf("?");
        let query = utils.fromQuery(url.slice(index + 1));
        if (query) {
            let jsonValue = utils.toQuery(query, encodeURIComponent, JSON.stringify);
            url = `${url.slice(0, index)}${jsonValue}`;
        }

        options.headers = headers;
    }

    return startRequest(method, url, options);
}

export function get(url: string, options?: HttpOptions) {
    return init("get", url, options || {});
}

export function post(url: string, data: any, options?: HttpOptions) {
    return init("post", url, Object.assign({}, options, { data }));
}