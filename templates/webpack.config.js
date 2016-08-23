const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const NODEMODULES = path.resolve(__dirname, 'node_modules');

const config = {
   entry: path.resolve(__dirname, './src/main.js'),
	
   output: {
      filename: path.resolve(__dirname, 'src/build/bundle.js'),
   },
	
   devServer: {
      inline: true,
      publicPath: '/src/',
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: NODEMODULES,
            loader: 'babel',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
   watch: true
}

module.exports = config;