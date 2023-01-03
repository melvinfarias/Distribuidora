var express = require('express');
var router = express.Router();
var productosModel = require('../models/productosModel');


/* GET home page. */
router.get('/', async function(req, res, next) {
  var productos = await productosModel.getProductos();
  res.render('index', {
    productos
   });
});

module.exports = router;
