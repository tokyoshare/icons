const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

const APP_PATH = path.join(__dirname, '../src/index.js');
const SOURCE_PATH = path.join(__dirname, '../src');
const TEMPLATE_PATH = path.join(__dirname, '../src/static/index.html');
const IMAGE_PATH = path.join(__dirname, "../src/static/images");
const PUBLIC_PATH = path.join(__dirname, '../../build');

console.log("PUBLIC_PATH", PUBLIC_PATH);
// Common plugins
const plugins = [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'js/vendor.js'
    }),
    new webpack.DefinePlugin({
        'process.env': {
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        // Eliminate comments
        comments: true,
        // Compression specific options
        compress: {
            // remove warnings
            warnings: true,
            // Drop console statements
            drop_console: true
        },
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
        // define where to save the file
        // disable: true,
        filename: 'css/[name].css',
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        title: 'Material Icons',
        template: TEMPLATE_PATH,
        filename: 'index.html',
        inject: 'body',
        hash: true
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                AutoPrefixer({
                    browsers: ['last 3 version', 'ie >= 10']
                })
            ],
            context: PUBLIC_PATH
        }
    }),
    new webpack.NamedModulesPlugin(),
];

const loaders = [
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react']
        }
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
            outputPath: 'images',
        },
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',

            // Could also be write as follow:
            // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                        sourceMap: true,
                        importLoaders: 2,
                        // localIdentName: '[name]__[local]'
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        outputStyle: 'compressed',
                        sourceMap: true
                    }
                },
            ]
        })
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: 'babel-loader'
            },
            {
                loader: 'react-svg-loader'
            }
        ]
    }
];

const entry = {
    app: APP_PATH,
    vendor: [
        //move theses package to "vendor.js" file
        //to reduce bunde.js file size
        "react-dom",
        "react-router",
        "react",
        "lodash",
    ],
}

const output = {
    path: PUBLIC_PATH,
    publicPath: '/',
    filename: 'js/[name].js'
}

const resolve = {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
        SOURCE_PATH,
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../node_modules/react-smooth/node_modules'),
    ]
}

module.exports = {
    context: SOURCE_PATH,
    entry,
    output,
    loaders,
    resolve,
    plugins,
    externals: {
        //don't bundle these npm package with our bundle.js
        //but get it from a <src></src> tag in headers
        //lodash: 'lodash',
        moment: 'moment'
    }
};