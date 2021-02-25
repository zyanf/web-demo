const path = require('path')

module.exports = {
    devServer: {
        open: true,
        port: 8005,
        proxy: {
            '/org': {
                target: 'http://192.168.1.2:30056'
            },
            '/user': {
                target: 'http://192.168.1.2:30056'
            },
            '/base': {
                target: 'http://192.168.1.2:30056'
            },
            '/access': {
                target: 'http://192.168.1.2:30056'
            },
            '/system': {
                target: 'http://192.168.1.2:30056'
            }
        }
    },
    publicPath: '/sceneMonitor',
    runtimeCompiler: true,
    chainWebpack: config => {
        config.node
            .set('__dirname', true) // 同理
            .set('__filename', true)

        config.resolve.alias.set('@', path.join(__dirname, 'src'))

        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
}
