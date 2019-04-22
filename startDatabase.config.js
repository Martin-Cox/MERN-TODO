const path = require("path");

module.exports = {
	context: path.resolve(__dirname, "./src/tools"),
	devtool: "cheap-module-eval-source-map",
	entry: {
		setup: "./Start.ts",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, "./src/tools/*"),
				use: [{
					loader: "babel-loader",
					options: {
						"presets": ["@babel/preset-env"]
					}
				}]
			}, {
				enforce: "pre",
				test: /\.js(x)?$/,
				include: path.resolve(__dirname, "./src/tools/*"),
				use: [{
					loader: "source-map-loader"
				}]
			}
		]
	},
	output: {
		filename: "start.js",
		path: path.resolve(__dirname, "build")
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	target: "node"
};