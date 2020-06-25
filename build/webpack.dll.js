const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清空

module.exports = {
  mode: "production",
  entry: {
    vendor: ['vue', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].[contenthash:6].dll.js', 
    library: '[name]_libraly',  // 必须与 DllPlugin的name 一致
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dll')]
    }),
    new DllPlugin({
      path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
      name: '[name]_libraly',
      context: __dirname,
    })
  ]
}