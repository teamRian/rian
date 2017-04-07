import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import cors from 'cors';

// Webpack Requirements
import webpack from 'webpack';
import config from '../config/webpack.config.dev2';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new express();

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
import passport from 'passport';
// import Helmet from 'react-helmet';

// Import required modules
//import routes from '../src/routes';
//import posts from './routes/post.routes';
import users from './routes/User.routes';
import plans from './routes/Plan.routes';
import passportConfig from './passport';
import passportRoutes from './routes/Auth.routes';
import chatLogs from './routes/chatlogs.routes';
import projects from './routes/Project.routes';
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

passportConfig(passport);

// Apply body Parser and server public assets and routes
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use(session({
  cookie : {
    maxAge: 1000 * 60 * 60 * 8 // see below
  },
  secret: 'mySecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use('/api', posts);
app.use('/user', users);
app.use('/plan', plans);

//GraphQL Server 
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionManager, PubSub } from 'graphql-subscriptions';
import { schema } from './qlSchema/schema.js';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { pubsub } from './pubsub/pubsub.js';

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub: pubsub,
  setupFunctions: {
    //어떤 서브스크립션에 대한 검증인가
    commentAdded: (options, args) => ({ //이렇게 리턴으로 서브스크립션 key를 가지고 있는 옵젝을 리턴해야함.
      commentAdded: {
        filter: comment => {
          //comment로 들어오는게 지금 pubsub으로 보내야되는 값
          //args는 최초에 서브스크립션을 찍었을때 들어온 variables들.
          console.log("Filter", comment.commentAdded.chatRoom === args.chatRoom, comment, args)
          if (comment.commentAdded.chatRoom === args.chatRoom) { 
            return true 
          } else {
            return false
          } 

        }
      }
    })
  }
});


// chatlogs endpoint
app.use('/chatLog', chatLogs);
app.use('/project', projects);

passportRoutes(app, passport);

app.get('/calendar', (req,res)=>{
  res.redirect('/#/calendar');
})
app.get('/editor', (req,res)=>{
  res.redirect('/#/editor');
})
app.get('/chat', (req,res)=>{
  res.redirect('/#/chat')
})
app.get('/whiteboard', (req,res)=>{
  res.redirect('/#/whiteboard')
})
app.get('/checkAuth', isLoggedIn, (req, res) => {
  res.status(200).send(req.session);
  // res.redirect('/');
})
// app.get('*', (req,res)=>{
//   res.redirect('/')
// })

app.get('*', function(req, res, next){
  // const head = Helmet.rewind();
  res.status(200).end(

`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <!-- Codemirror
         -->        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js"></script>
        
        <!-- Firepad Css-->
        <link rel="stylesheet" href="https://cdn.firebase.com/libs/firepad/1.4.0/firepad.css" />

        <style>
           html { height: 100%; }
           body { margin: 0; height: 100%; position: relative; }
            
           #firepad-container {
             width: 100%;
             height: 100%;
           }

          #userlist {
            position: absolute; left: 0; top: 0; bottom: 0; height: auto;
            width: 175px;
          }          

        </style>
        
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






// start app
const server = createServer(app);
server.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
  new SubscriptionServer({
      subscriptionManager: subscriptionManager,
      onConnect: () => {
        console.log('Subscription Connect Success')
      },
    }, {
      server: server,
      path: '/subscriptions',
    });

});



export default app;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      console.log('LOG IN CHECK')

      return next();
    } else {
      console.log('LOG IN FAILED')
      res.status(404).send('Not Logged In, FAIL');
    }

    // if they aren't redirect them to the home page
}




