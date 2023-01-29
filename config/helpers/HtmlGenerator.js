const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('dotenv').config()

// Function to walk through files and directories at a given path
function walkDir(rootDir) {
	const paths = []
	function walk(directory, parent) {
		const dirPath = path.resolve(__dirname, directory)
		const templateFiles = fs.readdirSync(dirPath)
		templateFiles.forEach(file => {
			const filepath = path.resolve(__dirname, directory, file)
			const isDirectory = fs.lstatSync(filepath).isDirectory()

			if (isDirectory) {
				const subDirectory = path.join(directory, file)
				if (parent) {
					const parentPath = path.join(parent, file)
					walk(subDirectory, parentPath)
				} else {
					walk(subDirectory, file)
				}
			} else {
				if (parent) {
					const fileWithParent = path.join(parent, file)
					paths.push(fileWithParent)
				} else {
					paths.push(file)
				}
			}
		})
	}

	walk(rootDir)

	return paths
}

function generateHtmlPlugins (templateDir) {
	const templateFiles = walkDir(templateDir)
	return templateFiles.map(item => {
		const parts = item.split('.');
		const name = parts[0];
		const chunksPreset = ['main'];

		if (process.env.MODE === 'dev' || process.env.MODE === 'development') {
			chunksPreset.push('app')
		}

		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.html`),
			chunks: chunksPreset,
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true,
				removeRedundantAttributes: false, // do not remove type="text"
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		})
	})
}

module.exports = { generateHtmlPlugins }
