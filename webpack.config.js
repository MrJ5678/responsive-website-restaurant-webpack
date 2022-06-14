const path = require("path") //调用路径
const HtmlWebpackPlugin = require('html-webpack-plugin')  //引入打包html的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production", //开发模式

  entry: {'js/bundle':'./src/index.js'}, //入口文件

  output: {
    filename: "[name].js", //输出文件名
    path: path.resolve(__dirname, "./dist"),
  },

  module: {
    rules: [
      {
        test:/\.css$/,    //css配置
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },

  plugins: [
    // html
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, './src/pages/index.html'), //文件模板
      filename:'index.html',  //输出文件名
    }),

    // css 分离
    new MiniCssExtractPlugin({
      filename: "css/index.css"
    }),

    new CopyPlugin({
      patterns: [
        {
          from: './src/static',  //原始位置
          to: './assets'  //打包到的位置
        }
      ]
    })
  ]
}
