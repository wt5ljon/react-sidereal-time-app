const path = require('path');
const webpack = require('webpack');

require('dotenv').config({ path: '.env.development' });

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GEOCODE_API_KEY': JSON.stringify(process.env.GEOCODE_API_KEY)
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};