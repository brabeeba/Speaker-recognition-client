var webpack = require('webpack');

module.exports = {
	entry: [
		'./src/index.jsx'
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel']
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/output',
		publicPath: '/',
		filename: 'bundle.js'
	}
};