const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretKey = "Chinu";
router.post("/createuser", [
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            location: req.body.location
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/loginuser", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "try login with correct email" });
            }
            const compare = await bcrypt.compare(req.body.password, userData.password)
            if (!compare) {
                return res.status(400).json({ errors: "try login with correct password" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, secretKey)

            res.status(200).json({ success: true, authToken: authToken });
        } catch (error) {
            console.log("error while login", error)
            res.status(500).json({ success: false, error: error.message });
        }
    })
module.exports = router;
