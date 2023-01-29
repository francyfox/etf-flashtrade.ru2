require('dotenv').config()
const path = require('path')
const SassLintPlugin = require('sass-lint-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlValidatePlugin = require('html-validate-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    stats: 'errors-warnings',

    entry: {
        app: ['webpack-dev-server-status-bar']
    },

    devServer: {
        client: {
            overlay: {
                warnings: false,
                errors: true
            },
            progress: true,
        },
        static: {
            directory: path.join(__dirname, '../src'),
        },
        liveReload: false,
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: false,
        port: process.env.PORT,
        allowedHosts: 'all'
    },

    plugins: [
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [
					`See page http://localhost:${process.env.PORT} \n

██████╗░██╗░█████╗░██╗░░░░░
██╔══██╗██║██╔══██╗██║░░░░░
██║░░██║██║██║░░██║██║░░░░░
██║░░██║██║██║░░██║██║░░░░░
██████╔╝██║╚█████╔╝███████╗
╚═════╝░╚═╝░╚════╝░╚══════╝
					`
				],
				notes: ['Для некоторых шаблонов (layouts) и иногда для линтера, нужна принудительная перекомпиляция']
			},
			clearConsole: true,
		}),
        new webpack.HotModuleReplacementPlugin(),
        new SassLintPlugin(),
        new ESLintPlugin(),
		new HtmlValidatePlugin(),
    ],

    module: {
        rules: [
            // CSS, PostCSS, Sass
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: false
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
							implementation: require.resolve("sass"),
                            sourceMap: true
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
					{
						loader: 'cache-loader', // TODO: исправить положение кэша и вынести в общий конфиг
						options: {
							cacheDirectory: path.resolve(__dirname,	'node_modules/.cache/cache-loader'),
						},
					},
                	'babel-loader'
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
}
