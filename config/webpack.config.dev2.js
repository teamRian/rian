var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');


module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './src/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: 'http://0.0.0.0:8000/',
  },


  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node-modules/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.svg$/,
        use: 'url-loader'
      },
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true, //cache directory = node_modules/.cache
          presets: ['es2015', 'react'],
        }
      }, 
      {
        test: /\.png$/,
        use: { loader: 'url-loader', options: {limit: 100000} },
      },
      {
        test: /\.jpg$/,
        use: 'file-loader',
      }, 
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      { test: /\.(woff|woff2|ttf|eot)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/, 
        use: 'url-loader?limit=100000' 
      }
    ],
  },

  plugins: [
    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['manifest'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ],

  
};
