const path = require('path')

module.exports = {
    devServer: {
        open: true,
        port: 8005,
        proxy: {
            '/dev': {
                target: 'http://192.168.1.2:30056'
            }
        }
    },
    publicPath: '/webDemo',
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
