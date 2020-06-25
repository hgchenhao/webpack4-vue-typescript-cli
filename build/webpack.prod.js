const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const WebpackMerge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js,多线程
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 分析

const variablePluginsMap = {
  analyzer: new BundleAnalyzerPlugin()
}

const filterPlugins = (env) => {
  const { dev } = env;

  if(!Array.isArray(dev)) {
    return [];
  }

  return dev.reduce((prev, current)=> {
    const variablePlugin = variablePluginsMap[current];

    if(typeof variablePlugin !== 'undefined') {
      prev.push(variablePlugin);
    }

    return prev; 

  },[])
}

module.exports = (env, argv) => {

  return WebpackMerge(webpackConfig(env, argv), {
    stats: 'errors-warnings',  // 编译时 只提示错误和警告
    performance: {
      hints: false
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: false,
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
              pure_funcs: ['console.log']
            },
          },
        }),
      ],
      concatenateModules: false, //可能会合并webpack-bundle-analyzer 输出中的模块的一部分, 需要关闭
    },

    plugins: filterPlugins(env).concat([
      new OptimizeCssAssetsPlugin(),
      new DllReferencePlugin({
        context: __dirname,
        manifest: require('../dll/vendor-manifest.json'),
      }),
    ]),
  })
}
