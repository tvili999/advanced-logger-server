const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    resolve:{
		alias: {
			"react$": path.resolve(__dirname, "node_modules/react"),
			"core": path.resolve(__dirname, 'src/core'), // eslint-disable-line
     		"components": path.resolve(__dirname, 'src/components'), // eslint-disable-line
     		"contexts": path.resolve(__dirname, 'src/contexts'), // eslint-disable-line
		}
    },
    module: {
        rules: [
            { test: /\.styl$/, use: [ "style-loader", "css-loader", "stylus-loader" ] },
            { test: /\.js$/, use: [ "babel-loader" ] },
        ]
    },
	devServer: {
		host: "0.0.0.0",
		port: 8900,
		proxy: {
			'/api': {
				target: 'http://localhost:9000',
				secure: false
			}
		}
	},
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}