const express = require('express'),
      path = require('path'),
      config = require('dotenv').config(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      cookieParser = require('cookie-parser'),
      csrf = require('csurf'),
      flash = require('connect-flash'),
      app = express(),
      port = process.env.PORT || 3000,
      env = process.env.ENV || 'development',
      
      User = require('./server/api/user/user.model');
      Conversation = require('./server/api/conversation/conversation.model');


class Server {

  /**
   * Represents a server.
   * @constructor
   */
  constructor() {
    this.initExpressMiddleware();
    this.initAuthentication();
    this.initDatabase();
    this.initRoutes();
    this.start();
  }

  /**
   * Initializes middleware to be used for serving static files and setting server configuration.
   */
  initExpressMiddleware() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(express.static(path.join(__dirname, '/dist')));
    app.use(flash());
    app.set('port', port);
  }

  initAuthentication() {
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    require('./server/auth/auth.controller')(passport);
  }

  /**
   * Connects to the environment's database.
   */
  initDatabase() {
    const db = mongoose.connect(process.env.DB_URI, {dbName: process.env.DB, useNewUrlParser: true }, (err) => {
      if (err) {
        console.log(`mongoose.connect() failed with error: ${err}`);
      }
      else {
        console.log('Connected to the DB.');
      }
    });
  }

  /**
   * Initializes the routers for the API, auth, and passes app routing off to the client-side router.
   */
  initRoutes() {
    const authRouter = require('./server/auth/auth.routes')
    app.use('/auth', authRouter);

    const userRouter = require('./server/api/user/user.routes')(User);
    app.use('/api/v1/users', userRouter);

    const conversationRouter = require('./server/api/conversation/conversation.routes')(Conversation);
    app.use('/api/v1/conversations', conversationRouter);

    //TODO - Remove
    app.get('/conversations', (req, res) => {
      res.send('Conversations works');
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/dist/index.html'));
    });  
  }

  /**
   * Starts the server.
   */
  start() {
    app.listen(port, function() {
      console.log(`Running in: ${process.env.ENV} mode.`);
      console.log(`Running on PORT: ${process.env.PORT}`);
    });
  }
}

var server = new Server();