## 简介

[webpack4-vue-typescript-cli](https://github.com/hgchenhao/webpack4-vue-typescript-cli) 是一个不基于第三方脚手架的前端单页面构建方案，它基于webpack4、typescript、vue、vue-router、vuex、es6、vant、axios，路由支持按需加载或按模块加载，ui库默认是vant，支持按需加载组件，它可以帮助你快速搭建一个项目的基础架构。

## 开发

```bash
# 克隆项目
git clone 

# 进入项目目录
cd webpack4-vue-typescript-cli

# 请求代理
cp build/env.js.dist build/env.js

# 安装依赖
npm install

# 启动服务
npm run start 

or

npm run start port:9099  //指定端口号
```

浏览器访问 http://localhost:9099

## 发布

```bash
# 构建生产环境
npm run compile
```

## 其它

```bash

# 静态资源分析
npm run analyzer

# 自动生成vue文件 
npm run generate:vue   //默认在src/containers下

or

npm run generate:vue path:src/demo  // 可指定目录
```

### 目录结构

```
├── README.md
├── build ----------------- webapck构建
├── dist  ----------------- 打包文件
├── public
│   └── index.html
├── src
│   ├── api ----------------- 接口配置
│   ├── containers ----------------- 视图层
│   ├── directives ----------------- 指令
│   ├── filters ----------------- 过滤器
│   ├── index.ts ----------------- 入口文件
│   ├── less ----------------- less文件
│   ├── mixins ----------------- mixins复用
│   ├── plugins ----------------- 插件
│   ├── request ----------------- 拦截器
│   ├── router ----------------- vue-router
│   └── store ----------------- vuex
└── tsconfig.json ----------------- ts配置

```
#### TODO
- 添加单元测试
- 配置ESLint
- 配置husky
- splitChunks抽离公共业务代码
- 持续优化