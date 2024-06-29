const db = require('../config/db');

const order = {
    create_order: async (body) => {
        const [result] = await db.promise().query("INSERT INTO orders SET ?", [body]);
        return {id: result.insertId};
    },
    list_order: async () => {
        const [rows] = await db.promise().query("SELECT id, DATE_FORMAT(date_order, '%d/%m/%Y') as date_order, client_name, list_products,total FROM orders");
        return rows;
    },
    search_order_id: async (id) => {
        const [rows] = await db.promise().query("SELECT * FROM orders WHERE id = ?", [id]);
        return rows[0];
    },
    update_order_id: async (id,body) => {
        const [rows] = await db.promise().query("UPDATE orders SET ? WHERE id = ?", [body,id]);
        return rows[0];
    },
    delete_order_id: async (id) => {
        const [rows] = await db.promise().query("DELETE FROM orders WHERE id = ?", [id]);
        return rows[0];
    },
    count_order: async () => {
        const [rows] = await db.promise().query("SELECT count(*) as count_order FROM orders");
        return rows[0];
    },
    getOrderByMonth: async () => {
        const [rows] = await db.promise().query("SELECT DATE_FORMAT(date_order, '%Y-%m') AS month, COUNT(*) AS order_count FROM orders GROUP BY month ORDER BY month");
        return rows;
    }
};

module.exports = order;