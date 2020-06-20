module.exports = {
  publicPath: {
    dev: './',
    development: '/',
    production: './',
  },
  isDev: {
    dev: true,
    development: true,
    production: false,
  },
  devtool: {
    dev: 'cheap-eval-source-map',
    development: 'cheap-eval-source-map',
    production: 'source-map',
  }
}