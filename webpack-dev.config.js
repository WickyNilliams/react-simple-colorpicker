const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

	context: resolve(__dirname, 'src'),

	entry: {
		ColorPicker: './example/index.js'
	},

	devServer: {
		hot: true,
		contentBase: resolve(__dirname, 'build'),
		publicPath: '/',
		historyApiFallback: true,
		disableHostCheck: true
	},

	output: {
		path: resolve(__dirname, 'build'),
		publicPath: './',
		filename: '[name].js',
		chunkFilename: '[name].js',
		library: 'ColorPicker',
		libraryTarget: 'var',
	},

	devtool: 'cheap-eval-source-map',

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [ 'babel-loader' ],
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: { plugins: () => [ require('autoprefixer') ] }
					},
					'sass-loader'
				]
			},
		]
	},

	plugins: [
		new HtmlWebpackPlugin({ template: 'example/index.html' }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};