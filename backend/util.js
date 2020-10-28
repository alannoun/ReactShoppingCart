import jwt from 'jsonwebtoken'
import config from './config'

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

const isAuth = (req, res, next) => { //Authentication middlewear
    console.log("req.user")
    const token = req.headers.authorization;
    if (token) {
        console.log("req.user")
        const tokenOnly = token.slice(7, token.length);
        jwt.verify(tokenOnly, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({msg: 'Invalid token'})
            }
            req.user = decode;
            next();
            return
        })
    }
    else {return res.status(401).send({msg: "Token is not supplied"}) }

}

const isAdmin = (req, res, next) => { 
    console.log(req.user)
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({msg: 'admin token is not valid'})

}

export {
    getToken,
    isAdmin,
    isAuth
}