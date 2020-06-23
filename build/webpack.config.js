const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 从js抽离css模块
const HappyPack = require('happypack'); // webpack4 已经做了优化了，可以不用使用HappyPack
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });// 构造出共享进程池
const vueLoaderPlugin = require('vue-loader/lib/plugin'); // 解析vue文件
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 动态注入js(如: dll.js)
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 编译的提示插件
const { publicPath, isDev, devtool } = require('./options.js');

module.exports = (env, argv) => {
  const NODE_ENV = env.dev; // 环境变量：https://www.webpackjs.com/guides/environment-variables/

  return {
    mode: publicPath[NODE_ENV], // 开发环境
    entry: [path.resolve(__dirname, '../src/index.ts')], // 入口文件， @babel/polyfill
    devtool: devtool[NODE_ENV],
    output: {
      filename: 'js/[name].[hash].js', // 「入口分块(entry chunk)」的文件名模板
      path: path.resolve(__dirname, '../dist'),  // 打包后的目录
      publicPath: publicPath[NODE_ENV], // 输出解析文件的目录，url 相对于 HTML 页面
      chunkFilename: '[name][chunkhash].js', //按需加载名称
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve(__dirname, '../src'),
      }
    },
    plugins: [
      new HappyPack({
        id: 'happybabel',
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory=true']
      }),
      new HappyPack({
        id: 'happycss',
        threadPool: happyThreadPool,
        loaders: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev[NODE_ENV], // 只在开发模式中启用热更新
          }
        }, 'css-loader']
      }),
      new vueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev[NODE_ENV] ? "css/[name].css" : "css/[name].[contenthash].css",
        chunkFilename: isDev[NODE_ENV] ? '[id].css' : '[id].[contenthash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'dll', to: 'dll' }
        ]
      }),
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, '../dll/*.js'),
        outputPath: 'dll',
        publicPath: `${publicPath[NODE_ENV]}dll`
      }),
      new HtmlWebpackPlugin({
        title: 'template',
        template: path.resolve(__dirname, '../public/index.html'), //源html
        filename: 'index.html', // index.[contenthash].html  // hash
        hash: false, //BOOLEN,为静态资源生成hash值
        inject: 'body', // 注入到html
        showErrors: true, //展示错误
        minify: true, //压缩html
      }),
      new FriendlyErrorsWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,  // html src 属性不能为空
          use: [
            {
              loader: 'html-loader',
              options: {
                attributes: {
                  list: [
                    {
                      // Tag name
                      tag: 'img',
                      attribute: 'src',
                      type: 'src',
                    },
                  ]
                },
                minimize: true,
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'happypack/loader?id=happycss',
            },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev[NODE_ENV], // 只在开发模式中启用热更新，https://webpack.js.org/plugins/mini-css-extract-plugin/
              }
            },
            'css-loader',
            'postcss-loader',
          ],
          exclude: path.resolve(__dirname, '../node_modules'), // 排除 node_modules 目录下的文件
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,  // 替换style-loader, js里的css 会抽离出来，html 会使用link标签路径
              options: {
                hmr: isDev[NODE_ENV], // 只在开发模式中启用热更新
              }
            },
            'css-loader',
            'postcss-loader',
            'less-loader'
          ], // 从右向左解析原则
          exclude: path.resolve(__dirname, '../node_modules'), // 排除 node_modules 目录下的文件
        },
        {
          test: /\.(jpe?g|png|gif)$/i, //图片文件
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'imgs/[name].[contenthash:8].[ext]'
                  },
                }
              }
            }
          ],
          exclude: path.resolve(__dirname, '../node_modules'), 
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'happypack/loader?id=happybabel',
            },
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }],
            exclude: path.resolve(__dirname, '../node_modules'),
          },
        {
          test: /\.(ts||tsx)?$/,
          exclude: path.resolve(__dirname, '../node_modules'), 
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
          exclude: path.resolve(__dirname, '../node_modules'),
        }
      ]
    },
  }
}