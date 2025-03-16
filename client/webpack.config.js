const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        use: [
          MiniCssExtractPlugin.loader, // Витягнути CSS у окремі файли
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource', // Встановлено для Webpack 5
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        type: 'asset/resource', // Встановлено для Webpack 5
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
        use: [
          'image-webpack-loader', // Оптимізація зображень
        ],
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Кешування CSS
    }),
    new Dotenv(), // Завантаження змінних оточення з .env
    new CleanWebpackPlugin(), // Очищення dist перед новою збіркою
    process.env.NODE_ENV === 'development' && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all', // Увімкнення Code Splitting
      maxSize: 250000, // Лімітуємо максимальний розмір бандлів для кожного файлу
    },
    minimize: true, // Мінімізація JS
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Видалити console.log для продакшн
          },
        },
      }),
    ],
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
