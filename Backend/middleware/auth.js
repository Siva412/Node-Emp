const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    const receivedTkn = req.headers.authorization;
    if(receivedTkn){
        try{
            jwt.verify(receivedTkn, 'this_is_super_long_key');
            next();
        }
        catch{
            res.status(200).json({
                rc: '2',
                message: 'Invalid token'
            });
        }
    }
    else{
        res.status(200).json({
            rc: '2',
            message: 'You are not authorised'
        })
    }
}

module.exports = authUser;