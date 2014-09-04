'use strict';

var Product = require('../models/product'),
    _       = require('lodash'),
    config  = require('../../config');

exports.add = function(req, res){
  Product.findById(req.body.productId, function(err, product){
    req.session.cart = req.session.cart || [];
    var i = _.findIndex(req.session.cart, {_id:product._id.toString()});
   // console.log('*****Index OF', i);
   // console.log('*****PRODUCT ID', product._id);
    if(i !== -1){
      req.session.cart[i].count += 1;
    }else{
      product.count = 1;
      req.session.cart.push(product);
    }
    req.session.save(function(){
      res.redirect('/cart');
    });
  });
};

exports.index = function(req, res){
  var total = 0;
  (req.session.cart || []).forEach(function(p){
    total += p.price * p.count;
  });
  var tax = total * 0.075;
  total = total + tax;

  req.session.totalCents = Math.round(total * 100);
  req.session.save(function(){
    res.render('cart/index', {cart:req.session.cart || [], key:config.stripe.apiKey, total:total, tax:tax});
  });
};

exports.destroy = function(req, res){
  req.session.cart = [];
  req.session.save(function(){
    res.redirect('/cart');
  });
};

exports.purchase = function(req, res){
  console.log(req.body);

  var stripe = require('stripe')(config.stripe.apiSecret),
      stripeToken = req.body.stripeToken;
  stripe.charges.create({
    amount: req.session.totalCents,
    currency: 'usd',
    card: stripeToken,
    description: req.user.email || 'anonymous'
  }, function(err, charge){
    req.session.cart = [];
    req.session.save(function(){
      res.redirect('/profile');
    });
  });
};
