const express = require('express');
const { newproduct, fetchProducts, fetchProductsbyId, updateProduct, deleteProduct } = require('../controllers/product');
const { fetchVendors } = require('../controllers/vendor');

const router = express.Router();

router.post('/newproduct',newproduct)
      .get('/getproducts/:id',fetchProducts)
      .put('/update/:id',updateProduct)
      .delete('/delete/:id',deleteProduct) 
      .get('/vendors',fetchVendors)     

exports.router = router;


