const express = require('express');
const router =  express.Router();
const product_controller = require('../controller/product_controller');
const token_function = require('../config/token');

router.post('/saveproduct',token_function, product_controller.create_product);
router.get('/listproducts',token_function, product_controller.list_products);
router.get('/countproduct',token_function, product_controller.count_product);
router.get('/listproductsid/:id',token_function, product_controller.list_products_id);
router.get('/searchproduct/:id',token_function, product_controller.search_product_id);
router.put('/updateproduct/:id',token_function, product_controller.update_product_id);
router.delete('/deleteproduct/:id',token_function, product_controller.delete_product_id);

module.exports = router;