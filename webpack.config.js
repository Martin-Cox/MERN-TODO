const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "./src"),
	devtool: "cheap-module-source-map",
	entry: {
		client: "./client/main/index.tsx",
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, "./src/*"),
				use: [{
					loader: "babel-loader",
					options: {
						"presets": ["@babel/preset-env", "@babel/preset-react"]
					}
				}]
			}, {
				enforce: "pre",
				test: /\.ts(x)?$/,
				include: path.resolve(__dirname, "./src/*"),
				use: [{
					loader: "source-map-loader"
				}]
			}
		]
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "build")
	},
	
	plugins: [
		new CopyPlugin([
			{ from: "client/main/index.html", to: "../build" },
		]),
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
};