const webpack = require('webpack');
const path = require('path');
const common = require("./webpack.config")

module.exports = {
    context: common.context,
    entry: common.entry,
    output: common.output,
    module: {
        loaders: common.loaders
    },
    resolve: common.resolve,
    plugins: common.plugins,
    externals: common.externals
};
