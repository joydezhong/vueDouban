let config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let path = require('path')

let webpack = require("webpack");
let webpackDevServer = require("webpack-dev-server");
let webpackConfig = require('./webpack.dev.conf')

let compiler = webpack(webpackConfig);


//init server
let app = new webpackDevServer(compiler, {
  //注意此处publicPath必填
  publicPath: webpackConfig.output.publicPath,
  //HMR配置
  hot:true,
});


app.listen(config.dev.port, "localhost", function (err) {
  if (err) {
    console.log(err);
  }
});

console.log(`listen at http://localhost:${config.dev.port}`);
