import express from 'express';
import User from '../models/userModel'
const router = express.Router();

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

export default router;