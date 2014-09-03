'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.logout();
  req.flash('notice', 'See you later');
  res.redirect('/');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.profile = function(req, res){
  res.render('users/show-profile');
};

exports.edit = function(req, res){
  res.render('users/edit-profile');
};

exports.update = function(req, res){
  User.update(req.user, req.body, function(){
    res.redirect('/profile');
  })
};
