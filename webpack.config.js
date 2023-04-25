const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
    ],
  },
  optimization: {
    minimizer: [
        "...",
        new CssMinimizerPlugin({
            test: /\.css$/i,
            minimizerOptions: {
                preset: [
                    "default",
                    {
                        discardComments: { removeAll: true }
                    }
                ],
            },
        }),
    ],
  },
};