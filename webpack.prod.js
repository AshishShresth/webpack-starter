const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack Starter',
            filename: 'index.html',
            template: path.resolve(__dirname, 'source_code', 'index.html'),
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // loads css to seperate file
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // minimizes css
            new TerserPlugin() // minimizes js
        ],
    },
});