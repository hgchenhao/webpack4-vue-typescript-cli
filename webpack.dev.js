const path = require('path');
const WebpackMerge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');

module.exports = (env, argv) => {

  return WebpackMerge(webpackConfig(env, argv), {
    devServer: {
      port: 8099,
      compress: true,
      hot: true,
      hotOnly: true,
      contentBase: path.join(__dirname, 'dist'),
      overlay: {  // webpack 编译警告或出错时，是否在浏览器显示
        warnings: true, // 显示警告
        errors: true // 显示错误
      },
      historyApiFallback: true,
    },
  })
}