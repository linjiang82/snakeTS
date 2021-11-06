import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const CURRENT_WORKING_DIR = process.cwd();
console.log(CURRENT_WORKING_DIR);
const config = {
  entry: path.join(CURRENT_WORKING_DIR, "/src/index.ts"),
  mode: "development",
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist/"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(CURRENT_WORKING_DIR, "/dist/"),
    },
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: [/node_modules/],
        use: "ts-loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};

//export in js
//module.exports = config;
export default config;
