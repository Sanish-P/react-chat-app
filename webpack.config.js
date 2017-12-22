const path = require('path');

module.exports = {
  entry: './src/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/'
  },
  devtool: 'cheap-eval-source-map',
  module : {
    rules : [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }
    ]
  }
};
