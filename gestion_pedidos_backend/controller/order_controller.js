const order_model = require('../model/order_model');

exports.create_order = async (req, res) => {
    try {
        const order = await order_model.create_order(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.list_order = async (req, res) => {
    try {
        const products = await order_model.list_order();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.search_order_id = async (req, res) => {
    try {
        const products = await order_model.search_order_id(req.params.id);
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.update_order_id = async (req, res) => {
    try {
        const products = await order_model.update_order_id(req.params.id,req.body);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.delete_order_id = async (req, res) => {
    try {
        const products = await order_model.delete_order_id(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};