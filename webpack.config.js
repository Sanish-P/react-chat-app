const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    publicPath: '/public/',
    port: 9000,
    historyApiFallback: true
  },
  module : {
    rules : [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIndentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules:[path.resolve(__dirname, "./"), "node_modules"]
  }
};
