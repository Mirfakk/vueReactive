const path = require('path') // 引用path模块

module.exports = {  // 这里是commrnt.js语法
  // 使用开发模式打包
  mode: "development",
  // 入口文件
  entry: "./src/index.js",
  // 打包后的出口文件
  output: {
    // 输出的文件名称
    filename: 'bundle.js',
    // 输出的路径  是绝对路径(导入path模块) 这里是用node来做的
    path: path.resolve(__dirname, 'build'),
  },
  //配置webpack-dev-server
  devServer: {
    //静态文件根目录
    contentBase: path.join(__dirname, "www"),
    //不压缩
    compress: false,
    //端口号
    port: 8080,
    //虚拟打包的路径，bundle.js文件没有真正的生成
    publicPath: "/xuni/"
  }
}
