import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';


// Webpack Requirements
import webpack from 'webpack';
import config from '../config/webpack.config.dev2';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();




// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
// import { configureStore } from '../client/store';
import { configureStore } from '../src/store/configureStore';

import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
// import Helmet from 'react-helmet';

// Import required modules
//import routes from '../src/routes';
import { fetchComponentData } from './util/fetchData';
//import posts from './routes/post.routes';
import plans from './routes/plan.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
//app.use('/api', posts);
app.use('/plan', plans);
app.get('/', function(req, res, next){

  // const head = Helmet.rewind();
  res.status(200).end(

`
    <!doctype html>
    <html>
      <head>
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      </head>
      <body>
        <div id="root"></div>
        
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/manifest.js'] : '/manifest.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
                 
      </body>
    </html>
  `


    );
})

app.get('/calendar', (req,res)=>{
  res.redirect('/#/calendar');
})
app.get('/todolist', (req,res)=>{
  res.redirect('/#/todolist');
})
app.get('/editor', (req,res)=>{
  res.redirect('/#/editor');
})
app.get('/chat', (req,res)=>{
  res.redirect('/#/chat')
})


// Socketio Chat
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const socket = require('./routes/socket');

io.on('connection', socket.bind(io))
// start app
server.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
