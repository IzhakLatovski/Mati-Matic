const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route	GET api/auth
// @desc	Authenticating users		
// @access	Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
});

// POST api/auth
// Authenticate user for login
// Public
router.post("/", [
    check("username", "Please include username").exists(),
    check("password", "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password} = req.body;

    try {
        let user = await User.findOne({username: username});

        if(!user) {
            return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"),
        {expiresIn: 3600},
        (err, token) => {
            if(err) {
                throw (err);
            }
            res.json({token});
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
);

module.exports = router;