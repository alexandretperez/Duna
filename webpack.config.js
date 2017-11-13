var webpack = require("webpack");
var path = require("path");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const configs = [
    {
        entry: {
            // utilities
            utils: "./src/utils.ts",
            dom: "./src/dom.ts",
            http: "./src/http.ts",

            // controls 
            'ui/NumericBox': "./src/ui/NumericBox.ts",
            'ui/Limiter': "./src/ui/Limiter.ts",
            'ui/MaskEdit': "./src/ui/MaskEdit.ts",
            'ui/SearchBox': "./src/ui/SearchBox.ts"
        },
        output: {
            path: path.join(__dirname, "lib"),
            filename: "[name].js",
            libraryTarget: "umd",
            umdNamedDefine: true
        }
    },
    {
        entry: {
            // bundle
            duna: "./src/index.ts"
        },
        output: {
            path: path.join(__dirname, "lib"),
            filename: "[name].js",
            library: "duna",
            libraryTarget: "umd",
            umdNamedDefine: true
        }
    }
]


configs.forEach((cfg, index) => {
    Object.assign(cfg, {
        devtool: "cheap-eval-source-map",
        resolve: {
            extensions: [".ts", ".js"]
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: { compact: false } },
                { test: /\.tsx?$/, loader: "ts-loader" }
            ]
        }
    });

    if (process.env.NODE_ENV === 'production') {
        cfg.devtool = "source-map";
        cfg.plugins = [new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                mangle: {
                    keep_classnames: true
                }
            }
        })];
    }
});


module.exports = configs;