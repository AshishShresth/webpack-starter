const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'source_code/index.js'),
    output: {
        path: path.resolve(__dirname, 'final_destination'),
        filename: 'bundle.[contenthash].js',
        // clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'final_destinaion')
        },
        watchFiles: ['./source_code/**/*'],
        port: 8080,
        open: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Starter',
            filename: 'index.html',
            template: 'source_code/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
}