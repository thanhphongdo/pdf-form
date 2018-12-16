module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: false,
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  }
}
