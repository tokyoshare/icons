const webpack = require('webpack');
const path = require('path');
const common = require("./webpack.config")

const environment = "staging";
const dotenv = require("dotenv").config(path.join(__dirname, `../env/${environment}.env`))

let plugins = [
    ...common.plugins,
    new webpack.DefinePlugin({
        "process.env": dotenv.parsed
    })
]

module.exports = {
    context: common.context,
    entry: common.entry,
    output: common.output,
    plugins: plugins,
    module: {
        loaders: common.loaders
    },
    resolve: common.resolve,
    externals: common.externals
};
