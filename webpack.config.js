const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = (env) => {
    console.log(env.NODE_ENV);
    return {
        // entry: env.NODE_ENV==='serve'?'./text.js':'./index.js',
        entry:'./src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js'
        },
        module: {
            rules: [{
                    test: /\.css/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test:/\.vue/,
                    use:['vue-loader']
                },
                {
                    test:/\.(png|jpg)/,
                    use:['image-webpack-loader']
                },
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                // template: path.join(__dirname, env.NODE_ENV==='serve'?'text.html':"./index.html") // new一个这个插件的实例，并传入相关的参数
                template: path.join(__dirname, "./public/index.html") // new一个这个插件的实例，并传入相关的参数
            })
        ],
        devServer: {
            // contentBase: path.join(__dirname, 'dist'), //项目目录
            compress: true, // gzip 压缩
            port: 9000, //服务端口
            // host: '0.0.0.0', //ip地址
            hot: true, //热更新 需要webpack.HotModuleReplacementPlugin 插件
            // https: true,//开启https
            open: true, //启动后自动打开浏览器
            // proxy: {//代理
            //   '/api': {//'/api'开始的请求会被代理
            //     target: 'http://localhost:3000',//代理地址
            //     pathRewrite: {'^/api' : ''}//替换接口种'/api'字符串
            //   },
            //   '/http': {//'/api'开始的请求会被代理
            //     target: 'http://localhost:3001',//代理地址
            //     pathRewrite: {'^/http' : ''}//替换接口种'/api'字符串
            //   },

            // }
        }
    }
}