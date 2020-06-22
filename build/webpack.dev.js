const path = require('path');
const WebpackMerge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');

const getDevPort = (argv, port = 8099) => {
  if (argv.parameters && typeof argv.parameters.split === 'function') {
    const tempArr = argv.parameters.split(':');

    return tempArr[0] === 'port' ? tempArr[1] : port
  }

  return port;
}

module.exports = (env, argv) => {

  return WebpackMerge(webpackConfig(env, argv), {
    devServer: {
      port: getDevPort(argv),
      compress: true,
      hot: true,
      hotOnly: true,
      quiet: true, //禁止显示devServer的console信息
      contentBase: path.join(__dirname, '../dist'),
      overlay: {  // webpack 编译警告或出错时，是否在浏览器显示
        warnings: true, // 显示警告
        errors: true // 显示错误
      },
      historyApiFallback: true,
    },
  })
}