const db = require('../config/db');

const product = {
    create_product: async (body) => {
        const [result] = await db.promise().query("INSERT INTO product SET ?", [body]);
        return {id: result.insertId};
    },
    list_products: async () => {
        const [rows] = await db.promise().query("SELECT * FROM product");
        return rows
    },
    list_products_id: async (body) => {
        const [rows] = await db.promise().query(`SELECT * FROM product WHERE id in (${body})`);
        return rows
    },
    search_product_id: async (id) => {
        const [rows] = await db.promise().query("SELECT * FROM product WHERE id = ?", [id]);
        return rows[0]
    },
    update_product_id: async (id,body) => {
        const [rows] = await db.promise().query("UPDATE product SET ? WHERE id = ?", [body,id]);
        return rows[0]
    },
    delete_product_id: async (id) => {
        const [rows] = await db.promise().query("DELETE FROM product WHERE id = ?", [id]);
        return rows[0]
    }
};

module.exports = product;