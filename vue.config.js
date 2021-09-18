const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: isProduction ? './' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    lintOnSave: true,
    devServer: {
        port: '8080', // 开发模式的端口号
        open: true, //浏览器自动打开页面
        // proxy: {
        //   "/Api": {
        //     target: "http://10.101.20.41:8300", // 改成自己的目标服务器
        //     secure: true, // 接受对方是https的接口
        //     changeOrigin: true
        //   }
        // }
    },
    css: {
        requireModuleExtension: true,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                    }),
                ],
            },
        },
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/less/base.less')],
        },
    },
};
