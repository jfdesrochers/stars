const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'assets', 'js'),
        publicPath: '/assets/js/',
        filename: 'appbundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: JSON.stringify(pkg.version),
                APP_MODE: JSON.stringify(process.env.NODE_ENV === 'production' ? 'Production' : 'Development')
            }
        })
    ],
    devServer: {
        proxy: {
            '/': 'http://localhost:8081'
        },
        port: 3000,
        host: '0.0.0.0'
    }
}