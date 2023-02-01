const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        // require('autoprefixer'),
        require('postcss-preset-env')({
            stage: 1,
        }),
        tailwindcss
    ]
}