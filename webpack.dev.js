const path = require('path')
const Dotenv = require('dotenv-webpack')

const _isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    target: 'electron-renderer',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '.build'),
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff2?)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        fallback: 'file-loader',
                    },
                },
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            '/common': path.resolve(__dirname, 'src/common'),
            '/components': path.resolve(__dirname, 'src/components'),
            '/hooks': path.resolve(__dirname, 'src/hooks'),
            '/layouts': path.resolve(__dirname, 'src/layouts'),
            '/router': path.resolve(__dirname, 'src/router'),
            '/services': path.resolve(__dirname, 'src/services'),
            '/store': path.resolve(__dirname, 'src/store'),
            '/theme': path.resolve(__dirname, 'src/theme'),
            '/views': path.resolve(__dirname, 'src/views'),
        },
        extensions: ['.tsx', '.ts', 'jsx', '.js'],
    },
    plugins: [new Dotenv()],
}
