const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: {
      main: './src/js/index.js',
      style: './src/style/style.scss',
   },

   output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
   },

   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
         watch: true,
      },
      watchFiles: [
         path.join(__dirname, 'src/js/index.js'),
         path.join(__dirname, 'src/css/style.css'),
         path.join(__dirname, 'src/index.html')
      ],
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

   optimization: {
      minimize: true,
      minimizer: [
         new TerserPlugin({
            extractComments: false,
         }),
         new CssMinimizerPlugin(),
      ],
   },

   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/[name].css',
      }),

      new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html',
         inject: true,
      }),

      new CopyWebpackPlugin({
         patterns: [{
            from: 'src/assets',
            to: 'assets'
         }]
      })
   ],
};