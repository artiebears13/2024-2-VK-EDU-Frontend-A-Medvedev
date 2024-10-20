'use strict';

const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
    context: SRC_PATH,
    entry: {
        index: './index.js',
        chat: './chat/chat.js'
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js'
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                oneOf: [
                    {
                        test: /index\.css$/,
                        include: SRC_PATH,
                        use: [
                            MiniCSSExtractPlugin.loader,
                            'css-loader',
                        ],
                    },
                    {
                        include: SRC_PATH,
                        use: ['style-loader', 'css-loader'],
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: '[name].css',
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['index']
        }),
        new HTMLWebpackPlugin({
            filename: 'chat.html',
            template: './chat/chat.html',
            chunks: ['chat'],
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname),
        watchContentBase: true,
        open: true,
    },
    devtool: 'source-map',
};
