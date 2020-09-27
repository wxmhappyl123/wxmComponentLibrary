module.exports = {
  lintOnSave: false,
  runtimeCompiler:true,
  // devServer: {
  //   port: 8080,
  //   open: false,
  //   public: '0.0.0.0',
  //   overlay: {
  //     warnings: false,
  //     errors: true
  //   },
  //   proxy: {
  //     '/api': {
  //       // target: 'http://116.63.164.105:8088',
  //       target: 'http://116.63.164.105:8288',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
  //       }
  //     }
  //   },
  // },
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
        .rule('js')
        .include
        .add('/packages')
        .end()
        .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
