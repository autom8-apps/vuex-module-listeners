const path = require('path');

module.exports = {
  entry: path.resolve(__dirname) + '/src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ],
  },
  output: {
    path: path.resolve(__dirname) + "/dist",
    library: 'VuexModuleListeners',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './'
  },
  watch: true
};