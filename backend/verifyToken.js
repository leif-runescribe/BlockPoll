const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers);
    if(!req.headers.authorization) return res.status(404).json({msg: "Not authorized, No token"});

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(' ')[1];
        console.log("token----");
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) return res.status(403).json({msg: "Wrong or expired token"});
            else{
                req.user = data;
                next();
            }
        })
    }
}

module.exports = verifyToken;