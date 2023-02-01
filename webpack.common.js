const path = require('path');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'source_code/index.js'),
        vendor: path.resolve(__dirname, 'source_code/vendor.js')
    },
    output: {
        path: path.resolve(__dirname, 'final_destination'),
        clean: true,
        assetModuleFilename: 'images/[name].[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPartialsPlugin([
            {
                path: path.join(__dirname, './source_code/partials/header.html'),
                location: 'nav',
                template_filename: '*'
            },
            {
                path: path.join(__dirname, './source_code/partials/footer.html'),
                location: 'footer',
                template_filename: '*'
            }
        ])
    ]
}