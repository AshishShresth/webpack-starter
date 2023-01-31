const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'final_destinaion')
        },
        watchFiles: ['./source_code/**/*'],
        open: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Starter',
            filename: 'index.html',
            template: path.resolve(__dirname, 'source_code', 'index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // post css
                    'postcss-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    },
});