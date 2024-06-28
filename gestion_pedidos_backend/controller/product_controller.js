const product_model = require('../model/product_model');

exports.create_product = async (req, res) => {
    try {
        const product = await product_model.create_product(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.list_products = async (req, res) => {
    try {        
        const products = await product_model.list_products();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.list_products_id = async (req, res) => {
    try {
        const ids = req.body.id.join();
        const products = await product_model.list_products_id(ids);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.search_product_id = async (req, res) => {
    try {
        const products = await product_model.search_product_id(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.update_product_id = async (req, res) => {
    try {
        const products = await product_model.update_product_id(req.params.id,req.body);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.delete_product_id = async (req, res) => {
    try {
        const products = await product_model.delete_product_id(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};