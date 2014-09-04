'use strict';

var Product = require('../models/product');

exports.index = function(req, res){
  Product.all(function(err, products){
    res.render('products/index', {products:products});
  });
};

