const path = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
	mode: 'production',

	entry: './src/index.ts',

	output: {
		libraryTarget: 'commonjs',
		path: path.resolve(__dirname, `./dist/`),
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	  },
	  //devtool: 'source-map',
	module: {
		rules: [
			// Use esbuild as a Babel alternative
			{
				test: /\.ts$/,
				loader: 'esbuild-loader',
				options: {
					loader: 'ts',
					target: 'es2020'
				}
			},
				{
				  test: /\.(png|svg|jpg|gif|jpe?g)$/,
				  use: [
					{
					  options: {
						name: "[name].[ext]",
						outputPath: "src/images/"
					  },
					  loader: "file-loader"
					}
				  ]
				},
				{
				  test: /\.css$/i,
				  use: ['style-loader', 'css-loader'],
				},
			  ],
			},
			resolve: {
			  extensions: ['.ts', '.tsx', '.js', '.jsx'],
			 
		  },

	optimization: {
		minimizer: [
			// Use esbuild to minify
			new ESBuildMinifyPlugin(),
		],
	},
	
	plugins: [
		new ProgressBarPlugin(),
		new HtmlWebpackPlugin({
		  template: `${__dirname}/src/index.html`,
		  filename: 'index.html',
		  inject: 'body',
		  minify: true
		}),
	  ],
};