'use strict';

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var WebpackStrip = require('strip-loader');

module.exports = {
    entry: {
        game: './app/main',
        pad: './app/plugins/phaser-virtual-joystick.min',
        phaser: './node_modules/phaser-ce/build/phaser'
    },

    output: {
        filename: '[name].bundle.js',
        path: __dirname+ '/public/dist'
    },

    plugins: [
        new BrowserSyncPlugin({
            host:'localhost',
            port: 3000,
            server: {baseDir: ['public']}
        })


    ],
    // devtool: '#source-map',

    module: {
        loaders: [
            {
                test: /phaser\.js$/,
                loader: 'script-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.otf$/,
                exclude: /node_modules/,
                loader: 'url-loader'
            },
            // {
            //     test: /\.js$/,
            //     loader: WebpackStrip.loader('debug','console.log')
            // }
        ]
    }
};
