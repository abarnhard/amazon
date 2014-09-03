'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    security       = require('../lib/security'),
    debug          = require('../lib/debug'),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    passportConfig = require('../lib/passport/config'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'this app is awesome', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  app.use(flash());
  passportConfig(passport, app);

  app.use(security.locals);
  app.use(debug.info);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);

  app.get('/login',                 users.login);
  app.post('/login',                passport.authenticate('local',     {successRedirect:'/profile', failureRedirect:'/login', failureFlash:'Login failed'}));
  app.get('/auth/twitter',          passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter',   {successRedirect:'/profile', failureRedirect:'/', failureFlash:'Twitter Login failed'}));
  app.get('/auth/github',          passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github',     {successRedirect:'/profile', failureRedirect:'/', failureFlash:'GitHub Login failed'}));
  app.get('/auth/google',           passport.authenticate('google',    {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback', passport.authenticate('google',     {successRedirect:'/profile', failureRedirect:'/', failureFlash:'GitHub Login failed'}));
  app.get('/auth/facebook',          passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/', failureFlash:'GitHub Login failed'}));
  app.get('/auth/meetup',          passport.authenticate('meetup'));
  app.get('/auth/meetup/callback', passport.authenticate('meetup',     {successRedirect:'/profile', failureRedirect:'/', failureFlash:'GitHub Login failed'}));

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.get('/profile', users.profile);
  app.get('/profile/edit', users.edit);
  app.put('/profile', users.update);

  console.log('Express: Routes Loaded');
};

