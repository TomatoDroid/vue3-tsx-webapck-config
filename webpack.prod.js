const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const smp = new SpeedMeasurePlugin();
const baseConfig = require('./webpack.base');

const config = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new OptimizeCssPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css', //个人习惯将css文件放在单独目录下
      chunkFilename: 'chunk-[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('生产版本'),
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
});

module.exports = smp.wrap(config);
