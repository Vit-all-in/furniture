const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: {
      main: './src/js/index.js',
      style: './src/style/style.scss',
   },

   output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
   },

   devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hot: true,
      open: true,
      historyApiFallback: true,
   },

   module: {
      rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader'
            ]
         }
      ]
   },

   plugins: [

      new MiniCssExtractPlugin({
         filename: 'css/[name].css'
      }),
      new HtmlWebpackPlugin({
         template: './src/index.html'
      }),
      new CopyWebpackPlugin({
         patterns: [{
            from: 'src/assets',
            to: 'assets'
         }]
      })
   ],

   optimization: {
      minimizer: [
         new TerserPlugin({
            extractComments: true,
         }),
      ],
   },
};