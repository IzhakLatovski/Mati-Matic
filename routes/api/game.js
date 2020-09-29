const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");

const User = require("../../models/User");
const Game = require("../../models/Game");

// @route	GET api/game/me
// @desc	Get current users game		
// @access	Private
router.get("/me", auth, async (req, res) => {
    try {
        const game = await Game.findOne({user: req.user.id}).populate("user", ["name"]);
    
        if(!game) {
            return res.status(400).json({msg: "There is no game for this user"});
        }

        res.json(game);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
});

// @route	POST api/game
// @desc	Create or update game	
// @access	Private
router.post("/", [
    auth, 
    [
        check("level", "Please include level").not().isEmpty(),
        check("points", "Please include points").not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {level, points} = req.body;

    // Build game object
    const gameFields = {};
    gameFields.user = req.user.id;
    if(level) gameFields.level = level;
    if(points) gameFields.points = points;

    try {
        let game = await Game.findOne({user: req.user.id});

        if(game) {
            // Update
            game = await Game.findOneAndUpdate(
                {user: req.user.id},
                {$set: gameFields},
                {new: true}
            );

            return res.json(game);
        }

        // Create
        game = new Game(gameFields);
        await game.save();
        res.json(game);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
);

// @route	DELETE api/game
// @desc	Delete current users game		
// @access	Private
router.delete("/", auth, async (req, res) => {
    try {
        await Game.findOneAndRemove({user: req.user.id});

        res.json({msg: "Game deleted"});
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
});

module.exports = router;