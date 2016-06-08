var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    context: __dirname,

    entry: 'index.js', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

    output: {
        path: path.resolve('./storyStack/static/assets/bundles/'),
        filename: "[name]-[hash].js"
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new CleanWebpackPlugin(['bundles'], {
            root: path.resolve('./storyStack/static/assets/'),
            verbose: true,
            dry: false
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }, // to transform JSX into JS and use ES2015
            {
                test: /\.css$/, loader: "style!css"
            }
        ],
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
        root: [
            __dirname,
            path.resolve('stack/static/stack')
        ]
    },
}