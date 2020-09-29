const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect database
connectDB();

// Init middleware (for body-parser)
app.use(express.json({extended: false}));


app.get("/", (req, res) => res.send("API running !!!"));

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/game", require("./routes/api/game"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));