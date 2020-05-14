
module.exports = {
  publicPath: '',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
    devServer: {
      disableHostCheck: true,
      host: '0.0.0.0',
      port:'10080',
      https:false,
      hotOnly: false,
    },
}