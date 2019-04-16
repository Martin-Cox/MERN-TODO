const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "./src/client"),
	devtool: "cheap-module-source-map",
	entry: {
		client: "./main/Index.tsx",
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
				include: path.resolve(__dirname, "./src/client/*"),
				use: [{
					loader: "babel-loader",
					options: {
						"presets": ["@babel/preset-env", "@babel/preset-react"]
					}
				}]
			}, {
				enforce: "pre",
				test: /\.ts(x)?$/,
				include: path.resolve(__dirname, "./src/client/*"),
				use: [{
					loader: "source-map-loader"
				}]
			}
		]
	},
	output: {
		filename: "client.js",
		path: path.resolve(__dirname, "build")
	},
	plugins: [
		new CopyPlugin([
			{ from: "main/index.html", to: "../build" },
		]),
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	}
};