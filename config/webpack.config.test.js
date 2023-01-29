const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")  // для тестов
// const smp = new SpeedMeasurePlugin()
const webpack = require('webpack')

module.exports = ({
    mode: 'production',


    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                parallel: 4,
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, '../src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new HtmlInlineScriptPlugin(),
        new MiniCssExtractPlugin(),
    ],

    module: {
        rules: [
            // CSS, PostCSS, Sass
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    }
})
