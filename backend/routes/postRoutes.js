const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, content, user } = req.body;

        const post = new Post({
            title,
            content,
            user
        });

        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Error creating post"
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("user");

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error getting posts"
        });
    }
});

module.exports = router;