import express from 'express';
import User from '../models/userModel'
import {getToken} from '../util'
const router = express.Router();

router.get('logout', async (req, res) => {
    res.clearCookie('userInfo')
    res.redirect('/')
})

router.get('/createadmins', async (req, res) => {
try {
    const user = new User({
        name: "Alan",
        email: "alannoun@hotmail.com",
        password: "1234",
        isAdmin: true
    });

    const newUser = user.save();
    res.send(user)
    
} catch (error) {
    res.send({msg: error.message})
}

    
})



router.post('/signin', async (req, res) => {

        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if (user) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: getToken(user)//identifier to see if next req is authenticated or not
            })
            

        } else {
            res.status(401).send({msg: "Invalid" });
        }
     
})

router.post('/register', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        const newUser = await user.save();

        if (newUser) {
            res.send({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)//identifier to see if next req is authenticated or not
            })
        }
        
        
    } catch (error) {
        res.status(401).send({msg: "Invalid user data" })
    }
 
})

export default router;