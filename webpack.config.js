const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = { environment:'development'}) => {
  return (
    {
      entry: './src/index.jsx',
      output: {
        filename: (() => {
          if(env.environment === 'production') {
            return 'bundle.[hash].js'
          } else {
            return 'bundle.js'
          }
        })(),
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
      },
      devtool: (() => {
        if (env.environment === 'production') {
          return false
        } else {
          return 'cheap-eval-source-map'
        }
      })(),
      devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
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
          },
          {
            test: /\.ico$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'public/assets/img/'
              }
            }]
          }
        ]
      },
      resolve: {
        modules: [path.resolve(__dirname, "./"), "node_modules"],
        extensions: [".js", ".jsx"]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html'
        }),
        new webpack.DefinePlugin({
          environment: JSON.stringify(env.environment)
        })
      ]
    }
  )
}
