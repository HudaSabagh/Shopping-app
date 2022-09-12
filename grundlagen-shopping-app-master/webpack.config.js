const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/frontend/main.js',
  output: {
    path: path.join(__dirname, 'dist', 'frontend'),
    filename: 'assets/bundle.js'
  },
  devServer: {
    port: 4200,
    watchFiles: ['src/frontend/**/*']
  },
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/frontend/index.html',
      cache: false
    })
  ]
}
