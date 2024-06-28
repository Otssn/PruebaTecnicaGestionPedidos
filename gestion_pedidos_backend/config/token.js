const jwt = require('jsonwebtoken');

function validateToken(req, res, next){
    const token = req.headers['authorization'];
    if(!token) res.status(401).json({error: 'Acceso denegado'});

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            res.status(401).json({error: 'Acceso denegado'});
        }else{
            next();
        }
    });
}

module.exports = validateToken;