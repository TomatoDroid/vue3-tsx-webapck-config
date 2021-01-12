const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');

const smp = new SpeedMeasurePlugin();
const baseConfig = require('./webpack.base');

const config = merge(baseConfig, {
  mode: 'production',
  plugins: [new OptimizeCssPlugin(), new BundleAnalyzerPlugin()],
});

module.exports = smp.wrap(config);
