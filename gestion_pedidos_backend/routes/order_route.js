const express = require('express');
const router =  express.Router();
const order_controller = require('../controller/order_controller');
const token_function = require('../config/token');

router.post('/saveorder',token_function, order_controller.create_order);
router.get('/listorder',token_function, order_controller.list_order);
router.get('/searchorder/:id',token_function, order_controller.search_order_id);
router.put('/updateorder/:id',token_function, order_controller.update_order_id);
router.delete('/deleteorder/:id',token_function, order_controller.delete_order_id);

module.exports = router;