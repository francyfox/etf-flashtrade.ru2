const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
// const CriticalCssPlugin = require('critical-css-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")  // для тестов
// const smp = new SpeedMeasurePlugin()
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack')

module.exports = ({
    mode: 'production',

    optimization: {
        minimize: true,
        minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							"imagemin-gifsicle",
							"imagemin-mozjpeg",
							"imagemin-pngquant"
						],
					},
				},
				// Disable `loader`
				loader: false,
			}),
        	new CssMinimizerPlugin({
				parallel: 4,
			}),
			new TerserPlugin({
				parallel: true
			}),
		],
        runtimeChunk: 'single',
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
                    name: "styles",
                    test: /\.css$/,
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../src/img"),
                    to: "img"
                },
                {
                    from: path.resolve(__dirname, "../src/meta"),
                    to: ""
                },
            ],
        }),
		// new CriticalCssPlugin(),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlInlineScriptPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        })
    ],

    module: {
        rules: [
            // CSS, PostCSS, Sass
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
					{
						loader: 'cache-loader',
						options: {
							cacheDirectory: path.resolve(__dirname,	'../node_modules/.cache/cache-loader'),
						},
					},
                    'babel-loader',
                ],
            },
            {
				test: /\.(jpe?g|png|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ],
    }
})
