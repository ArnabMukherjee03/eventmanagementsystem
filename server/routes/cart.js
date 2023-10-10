const express = require('express');

const router = express.Router();

const {addToCart, fetchCartItem, deleteFromCart, updateCart} = require("../controllers/cart")

router.post('/addtocart',addToCart)
      .get('/fetchcartitems',fetchCartItem)
      .delete('/:id',deleteFromCart)
      .patch('/:id',updateCart)

exports.router = router;