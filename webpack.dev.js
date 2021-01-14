const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');

const smp = new SpeedMeasurePlugin();

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: 'errors-only',
  devServer: {
    hot: true,
    port: '3000', //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    overlay: false, //默认不启用
    clientLogLevel: 'silent', //日志等级
    compress: true, //是否启用 gzip 压缩
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('开发版本'),
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
});

module.exports = smp.wrap(config);
