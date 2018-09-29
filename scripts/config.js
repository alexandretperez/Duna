import typescript from 'rollup-plugin-typescript';
import {
    terser
} from "rollup-plugin-terser";


const config = [{
    input: './src/index.ts',
    output: {
        file: './dist/duna.js',
        format: 'iife',
        name: 'duna',
        sourcemap: process.env.BUILD === 'production' || 'inline'
    }
}];

['index', 'utils', 'dom', 'http', 'ui/NumericBox', 'ui/Limiter', 'ui/MaskEdit', 'ui/SearchBox'].forEach(mod => {
    let target = mod;
    if (mod === 'index')
        target = 'duna.esm';

    config.push({
        input: `./src/${mod}.ts`,
        output: {
            file: `./dist/${target}.js`,
            format: 'cjs',
            sourcemap: process.env.BUILD === 'production' || 'inline'
        }
    });
});


export default config.map(cfg => {
    Object.assign(cfg, {
        plugins: [typescript()]
    });

    if (process.env.BUILD)
        cfg.plugins.push(terser());

    return cfg;
});