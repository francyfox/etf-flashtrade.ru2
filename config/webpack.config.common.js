const path = require('path')
const fs = require('fs')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const ColoredProgressBar = require('colored-progress-bar-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const webpack = require('webpack')
const HtmlGenerator = require('./helpers/HtmlGenerator')

const arrPages = fs.readdirSync(path.resolve(__dirname, '../src/pages/'))
const htmlPlugins = HtmlGenerator.generateHtmlPlugins('../../src/pages/')

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/app.js'),
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, '../public'),
        filename: 'assets/scripts/[name].bundle.js',
    },

    plugins: [
        // new SimpleProgressWebpackPlugin({
        //     format: 'compact',
        //     name: ''
        // }),
        new webpack.ProgressPlugin({
            activeModules: false,
            entries: true,
            modules: true,
            modulesCount: 5000,
            profile: false,
            dependencies: true,
            dependenciesCount: 10000,
            percentBy: null,
        }),
        require('autoprefixer'),
        new CaseSensitivePathsPlugin(),
        new HtmlWebpackPartialsPlugin([
            {
                path: path.resolve(__dirname, '../src/layout/common/header-temp.html'),
                location: 'header-temp',
                template_filename: arrPages
            },
            {
                path: path.resolve(__dirname, '../src/layout/common/footer-temp.html'),
                location: 'footer-temp',
                template_filename: arrPages
            },
            {
                path: path.resolve(__dirname, '../src/layout/common/modals.html'),
                location: 'modals',
                template_filename: arrPages
            },
            {
                path: path.resolve(__dirname, '../src/layout/common/trade-temp.html'),
                location: 'trade-temp',
                template_filename: arrPages
            },
            {
              path: path.resolve(__dirname, '../src/layout/common/comment-temp.html'),
              location: 'comment-temp',
              template_filename: arrPages
            },
			{
				path: path.resolve(__dirname, '../src/layout/common/question-temp.html'),
				location: 'question-temp',
				template_filename: arrPages
			},
			{
				path: path.resolve(__dirname, '../src/layout/common/breadcrumb.html'),
				location: 'breadcrumb',
				template_filename: arrPages
			},
        ]),
    ].concat(htmlPlugins)
}
