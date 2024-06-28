const db = require('../config/db');

const order = {
    create_order: async (body) => {
        const [result] = await db.promise().query("INSERT INTO orders SET ?", [body]);
        return {id: result.insertId};
    },
    list_order: async () => {
        const [rows] = await db.promise().query("SELECT * FROM orders");
        return rows
    },
    search_order_id: async (id) => {
        const [rows] = await db.promise().query("SELECT * FROM orders WHERE id = ?", [id]);
        return rows[0]
    },
    update_order_id: async (id,body) => {
        const [rows] = await db.promise().query("UPDATE orders SET ? WHERE id = ?", [body,id]);
        return rows[0]
    },
    delete_order_id: async (id) => {
        const [rows] = await db.promise().query("DELETE FROM orders WHERE id = ?", [id]);
        return rows[0]
    }
};

module.exports = order;