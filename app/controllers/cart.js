'use strict';

var Product = require('../models/product'),
    _       = require('lodash');

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
  res.render('cart/index', {cart:req.session.cart || [], _:_});
};

exports.destroy = function(req, res){
  req.session.cart = [];
  req.session.save(function(){
    res.redirect('/cart');
  });
};
