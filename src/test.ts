// import { version } from './base';
// import * as utils from './utils';
// import * as dom from './dom';
// import * as http from './http';
// import NumericBox from './ui/NumericBox';
// import SearchBox from './ui/SearchBox';
// import Limiter from './ui/Limiter';
// import MaskEdit from './ui/MaskEdit';

// let duna = {};

// Object.defineProperty(duna, "ui", {
//     get() {
//         return {
//             NumericBox,
//             SearchBox,
//             Limiter,
//             MaskEdit
//         }
//     }
// });

// Object.defineProperty(duna, "http", { get() { return http; } })
// Object.defineProperty(duna, "dom", { get() { return dom; } })
// Object.defineProperty(duna, "utils", { get() { return utils; } })
// Object.defineProperty(duna, "version", { get() { return version; } })

// export = duna;


let bundle = {};
Object.defineProperty(bundle, "ui", {
    get() {
        return "Hello world!";
    }
});

export default bundle;