const login_model = require('../model/login_model');
const jwt = require('jsonwebtoken');

exports.get_user = async (req, res) => {
    try {
        user = req.body.user;
        password = req.body.password;
        const userLog = await login_model.get_user(user,password);
        if(userLog){
            const { id: id, name } = userLog 
            const token = jwt.sign({
                id,
                name,
                exp: Date.now() + 300 * 1000
            }, process.env.JWT_SECRET)
            res.status(200).json({userLog,token});
        }else{
            res.status(401).json({error: "Usuario o contraseña incorrecta"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
