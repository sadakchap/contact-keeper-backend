const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const { generateJWTToken } = require("../utlis/auth");
const { requireAuth } = require("../middleware/authMiddleware");


/**
 * @route       GET /api/auth
 * @description Get logged in User
 * @access      Private
 */
router.get('/login', requireAuth, async (req, res) => {
    try {
        const user = await User.findOne(req.user).select("-password");
        res.status(200).json({
            user
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


/**
 * @route       POST /api/auth
 * @description Auth user & get TOKEN
 * @access      Public
 */
router.post('/login',  [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please include password').exists()
],async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            error: errors.array()
        });
    }

    const { email, password } = req.body;
    console.log(email, password);

    try {
        let user = await User.findOne({ email });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = await generateJWTToken(user._id);
                res.status(200).json({
                    token
                });
            }else{
                res.status(400).json({
                    error: 'Password Incorrect'
                });
            }
        }else{
            res.status(400).json({
                error: 'email is not yet registered!'
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
    res.send('log in user')
});

module.exports = router;