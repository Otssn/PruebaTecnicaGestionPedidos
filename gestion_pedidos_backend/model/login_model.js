const db = require('../config/db');

const user = {
    get_user: async(user,password) => {
        const [rows] = await db.promise().query("SELECT * FROM user WHERE user_name = ? AND password = ?", [user,password]);
        return rows[0];
    }
};

module.exports = user