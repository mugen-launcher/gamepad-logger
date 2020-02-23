const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, { mode = "development" }) => {
  process.env.NODE_ENV = mode;

  return {
    target: "electron-renderer",
    entry: "./src/index.jsx",
    devtool: "source-map",
    mode,
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "app.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      new CopyPlugin([
        { from: "src/index.html", to: "index.html" }
      ]),
      new MiniCssExtractPlugin({
        filename: "style.css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.jsx?$/,
          loader: require.resolve("babel-loader"),
          exclude: /node_modules/
        }
      ]
    }
  };
};
