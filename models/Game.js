const mongoose= require("mongoose");

const GameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    level: {
        type: Number
    },
    points: {
        type: Number
    }
});

module.exports = Game = mongoose.model("game", GameSchema);