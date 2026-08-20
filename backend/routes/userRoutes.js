const express = require("express");
const User = require("../models/User");
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email});
        await user.save();
        res.status(201).json(user);
    } 
    catch (error) {
        res.status(500).json({
            message: "Error creating user"
        });
    }
});

module.exports = router;