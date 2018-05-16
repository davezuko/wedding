const path = require('path')
const webpack = require('webpack')
const convertToKoaMiddleware = require('koa-connect')
const historyApiFallback = require('connect-history-api-fallback')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: BUILD_ENV,
  entry: path.resolve(__dirname, 'src/main'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  ...(BUILD_ENV === 'development' && {
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
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
  ],
}
