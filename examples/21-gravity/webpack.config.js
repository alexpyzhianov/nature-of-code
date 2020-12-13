const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        hot: true,
        open: true,
        port: 3001,
        stats: "minimal",
        contentBase: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
