const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  watch: process.env.NODE_ENV === 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
