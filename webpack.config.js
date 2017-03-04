

var config = {
    devtool : 'source-map',
    entry: './mui.js',

   output: {
     path: '/',
     filename: 'index.js'
   },

  

   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
