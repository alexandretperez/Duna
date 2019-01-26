import { version } from './base';
import * as utils from './utils';
import * as dom from './dom';
import * as http from './http';
import { NumericBox } from './ui/NumericBox';
import { SearchBox } from './ui/SearchBox';
import { Limiter } from './ui/Limiter';
import { MaskEdit } from './ui/MaskEdit';

export default {
    get http() {
        return http;
    },
    get dom() {
        return dom;
    },
    get utils() {
        return utils;
    },
    get version() {
        return version;
    },
    get ui() {
        return {
            NumericBox,
            SearchBox,
            Limiter,
            MaskEdit
        };
    }
};
