const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'source_code/index.js'),
        vendor: path.resolve(__dirname, 'source_code/vendor.js')
    },
    output: {
        path: path.resolve(__dirname, 'final_destination'),
        clean: true,
        assetModuleFilename: 'images/[hash][ext][query]'
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
        ]
    },
}