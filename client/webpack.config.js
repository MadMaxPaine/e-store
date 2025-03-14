const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Додаємо кеш-бастинг
    clean: true, // Очищення dist перед новою збіркою
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      process: require.resolve('process/browser'), // Фікс process is not defined
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: 'gzip',
    }),
    new BundleAnalyzerPlugin(), // Аналізатор бандлу
    new Dotenv(), // Завантаження змінних оточення з .env
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // Увімкнення Code Splitting
    },
    minimize: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    historyApiFallback: true, // Для SPA
  },
  mode: 'production', // Встановлюємо production mode
  target: 'browserslist', // Забезпечує кращу підтримку браузерів
};
