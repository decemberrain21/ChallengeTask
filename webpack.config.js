var path = require('path');
var webpack = require('webpack');
  module.exports = [{
   entry: {
    'bundle': path.join(__dirname,'js/index.js' )
  },
 
  output: {  
    path: path.join(__dirname, 'public'), 
    filename: '[name].js'
  },
  module: {    
    
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
            
          query: {
            presets: ['es2015', 'react']
          }
        }
    ]
  }
}
]

