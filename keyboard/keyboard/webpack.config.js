const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist'), // 절대경로를 꼭 입력해줘야 함
		clean: true,
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'keyboard',
			template: './index.html',
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	devServer: {
		host: 'localhost',
		port: 8080,
		open: true,
		watchFiles: 'index.html',
	},
	mode: 'development', //{development:최소화를 다른 방식으로~,production:최소화}
	// optimization : {
	//   minimizer : {
	//     new TerserWebpackPlugin()
	//   }
	// }
};
