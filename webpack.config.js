const path = require('path');

module.exports = {
  mode: 'production',
  entry: './TrinDB.js',
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    library: 'TrinDB',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.(aff|dic)$/i,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
