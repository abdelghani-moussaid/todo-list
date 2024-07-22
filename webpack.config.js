const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', 
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ]
};