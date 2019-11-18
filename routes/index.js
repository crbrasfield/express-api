var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/products', function (req, res, next) {
  const products = db.getProducts();
  res.send(products);
})

router.get('/my-cart', function (req, res, next) {
  const cart = db.getCart();
  res.send(cart)
})

router.post('/my-cart', function (req, res, next) {
  const items = req.body
  try {
    db.addItemsToCart(items)
  } catch (error) {
    res.status(500).send(error)
  }

  const cart = db.getCart();
  res.send(cart);
});

router.delete('/my-cart/:id', function (req, res, next) {
  const id = req.params.id
  db.removeItemFromCart(id)
  const cart = db.getCart()
  res.send(cart)
})

router.post('purchase', function (req, res, next) {
  res.sendStatus(200);
})

module.exports = router;
