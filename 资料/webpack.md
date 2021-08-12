## webpack 4

**webpack** 是一个用于现代 JavaScript 应用程序的 **静态模块打包工具**。当 webpack 处理应用程序时，它会在内部构建一个 **依赖图**，此依赖图对应映射到项目所需的每个模块。

![img](https://img2018.cnblogs.com/blog/1033899/201909/1033899-20190910163825444-117071023.png)

从 v4.0.0 开始，**webpack 可以不用再引入一个配置文件**来打包项目，然而，它仍然有着**高度可配置性**，可以很好满足你的需



## 一、安装

### 1.**本地安装：**

安装最新版本或特定版本：

```bash
npm install --save-dev webpack@4.0.0
npm install --save-dev webpack@<version>
```

使用 webpack v4+ 版本，还需要安装 **CLI**

```bash
npm install --save-dev webpack-cli@3.3.12
```



### 2.**全局安装：** 

通过以下 NPM 安装方式，可以使 `webpack` 在全局环境下可用：

```bash
npm install --global webpack@4.0.0
```



### 3.初始化项目

首先我们创建一个目录，初始化 npm，安装 webpack-cli（此工具用于在命令行中运行 webpack）：

```bash
mkdir webpack-demo 
cd webpack-demo
npm init -y
npm install webpack@4.0.4 webpack-cli@3.3.12 --save-dev
```



### 4.打包

**不使用配置文件：**

```
npx webpack src/demo.js -o dist/index.js
```

- {entery file}:入口文件的路径，本文中就是src/entery.js的路径；
- {destination for bundled file}:填写打包后存放的路径。

**使用配置文件：**

```
npx webpack --config webpack.config.js
```



## 二、配置文件

1、根目录创建`webpack.config.js`文件

```js
const  path  =  require('path');
module.exports={
    //入口文件的配置项
    entry:{
        main:'./src/demo.js'
    },
    //出口文件的配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```

- **path：**Node.js Path 模块
- **path.resolve：**将文件转为绝对路径
- **__dirname：**nodeJs中的全局变量，指向当前文件所在的目录



## 三、入口、输出

**入口起点(entry point)** 指示 webpack 应该使用哪个模块，来作为构建其内部  **依赖图**的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认值是 `./src/index.js`，但你可以通过在` webpack.config.js`中配置 `entry` 属性，来指定一个（或多个）不同的入口起点。

### 1、单入口

```js
const  path  =  require('path');
module.exports = {
  entry: './src/index.js',
};
//或者赋值为对象的main属性
module.exports = {
  entry: {
      main:'./src/index.js'
  },
   output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index.js'
    }, 
};
```

### 2、多入口

添加多个entry对象，对象key作为最终输出文件名

修改output的filename为动态获取文件名

```js
const  path  =  require('path');
module.exports={
    //入口文件的配置项
    entry:{
         demo:'./src/demo.js',
         index:'./src/index.js',
    },
    //出口文件的配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```



## 四、模块

模块主要是运用各种**loader** 用于对模块的源代码进行转换，将lass\sass或者es6\TS编译转换为html能识别的css,js等等，或者进行一些代码压缩图片压缩等等得处理

#### **style-loader:**

处理css文件中的url()等

```
npm install --save-dev style-loader@0.23.1
```

#### **css-loader：**

将css插入到页面的style标签

```
npm install --save-dev css-loader@2.1.1
```

**loaders配置：**

修改webpack.config.js中module属性中的配置代码如下：

webpack.config.js

```js
module:{
        rules: [
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader']
            }
          ]
    },
```

loaders执行顺序是倒序，编译文件流会先流转到css-loader，依次到style-loader，直至完成这条loaders链

#### 常用API：

##### `noParse`：过滤不需要解析的文件

##### `rules`：设置解析规则数组

`{ test: xxx}`：匹配特定条件。一般是提供一个正则表达式或正则表达式的数组

`{ include: xxx}`：匹配特定条件。一般是提供一个字符串或者字符串数组

`{ exclude: xxx}`：排除特定条件。一般是提供一个字符串或字符串数组

`{ loader: [xxx]||xxx}`：解析需要的loader。一般是提供一个字符串或字符串数组



## 五、插件

​	webpack 提供了一个Plugin插件配置项，可以讲项目中的Js文件通过配置的插件进行解析

插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用



使用某个插件，需要通过`npm`进行安装，然后在`webpack.config.js`配置文件的`plugins`(是一个数组)配置项中添加该插件的实例

```js
//安装uglifyjs-webpack-plugin js代码压缩插件
npm install uglifyjs-webpack-plugin --save-dev
```

```js
//引入插件
const uglify = require('uglifyjs-webpack-plugin');


//配置插件
 plugins:[
        new uglify()
    ]
```

自动引入资源插件：

```js
//安装html-webpack-plugin插件
npm i html-webpack-plugin@^3.2.0 -D
```

```js
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
        new uglify(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/src/index.html")// new一个这个插件的实例，并传入相关的参数
        })
    ]
```



## 六、开发配置

通过webpack-dev-server的选项，能够用多种方式改变默认行为：

```
npm i webpack-dev-server@3.11.2 -D
```

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),//项目目录
    compress: true, // gzip 压缩
    port: 9000 //服务端口
    host: '0.0.0.0', //ip地址
    hot: true,//热更新 需要webpack.HotModuleReplacementPlugin 插件
    https: true,//开启https
    open: true,//启动后自动打开浏览器
    proxy: {//代理
      '/api': {//'/api'开始的请求会被代理
        target: 'http://localhost:3000',//代理地址
        pathRewrite: {'^/api' : ''}//替换接口种'/api'字符串
      }
    }
  }
};
```



## 七、环境变量

webpack 命令行 环境配置 的 `--env` 参数，可以允许你传入任意数量的环境变量。而在 `webpack.config.js` 中可以访问到这些环境变量。例如，`--env.production` 或 `--env.NODE_ENV=local`（`NODE_ENV` 通常约定用于定义环境类型）

```
webpack --env.NODE_ENV=local --env.production --progress
```

```js
const path = require('path');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
};
```



## 八、vue、webpack配置

```js
"dependencies": {
    "vue": "^2.6.14",
    "vue-loader": "^15.9.6",
    "vue-template-compiler": "^2.6.14",
    "webpack": "^4.0.0",
    "webpack-cli": "^3.3.12"
  },
  "devDependencies": {
    "css-loader": "^2.1.1",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "webpack-dev-server": "^3.11.2"
  },
```

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports={
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index.js'
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.vue/,
                use:['vue-loader']
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./index.html")// new一个这个插件的实例，并传入相关的参数
        })
    ],
    devServer:{
       port:9000,
       hot:true,
       open:true
    }
}
```

