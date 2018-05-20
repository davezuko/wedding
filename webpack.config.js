const path = require('path')
const webpack = require('webpack')
const convertToKoaMiddleware = require('koa-connect')
const historyApiFallback = require('connect-history-api-fallback')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const BUILD_ENV = process.env.NODE_ENV || 'development'
const __DEV__ = BUILD_ENV === 'development'

module.exports = {
  mode: BUILD_ENV,
  entry: path.resolve(__dirname, 'src/main'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  ...(__DEV__ && {
    serve: {
      port: 3000,
      content: path.resolve(__dirname, 'public'),
      add: (app, middleware, options) => {
        app.use(convertToKoaMiddleware(historyApiFallback()))
      },
    },
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      minify: true,
    }),
    new webpack.DefinePlugin({
      __DEV__: BUILD_ENV === 'development',
    }),
    new MiniCssExtractPlugin({
      filename: __DEV__ ? '[name].css' : '[name].[hash].css',
      chunkFilename: __DEV__ ? '[id].css' : '[id].[hash].css',
    }),
  ],
}
