/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        loader: 'awesome-typescript-loader',
        test: /\.tsx?$/,
      },
    ],
  },
  output: {
    filename: 'bundle.min.js',
    path: join(__dirname, '/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new DotenvPlugin({
      path: resolve(__dirname, '.env'),
      sample: resolve(__dirname, '.env.example'),
    }),
  ],
  resolve: {
    alias: {
      '@ze': resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}
