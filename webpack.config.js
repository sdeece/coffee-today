const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin= require('copy-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
    style: path.resolve(__dirname, './src/style/main.scss'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].bundle.js',
  },
  mode: 'development',
  devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s[ac]ss|css)/,
        use: [
          MiniCss.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'assets/images'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        use: ['url-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coffee toDay',
      template: path.resolve(__dirname, './src/template/main.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, './src/assets/images/favicon.ico')
    }),
    new MiniCss({
      filename: 'style.[hash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: './assets'
        }
      ]
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}