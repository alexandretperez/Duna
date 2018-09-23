import { version } from './base';
import * as utils from './utils';
import * as dom from './dom';
import * as http from './http';
import NumericBox from './ui/NumericBox';
import SearchBox from './ui/SearchBox';
import Limiter from './ui/Limiter';
import MaskEdit from './ui/MaskEdit';

let _duna = {};

Object.defineProperty(_duna, "ui", {
    get() {
        return {
            NumericBox,
            SearchBox,
            Limiter,
            MaskEdit
        }
    }
});

Object.defineProperty(_duna, "http", { get() { return http; } })
Object.defineProperty(_duna, "dom", { get() { return dom; } })
Object.defineProperty(_duna, "utils", { get() { return utils; } })
Object.defineProperty(_duna, "version", { get() { return version; } })

export default _duna;