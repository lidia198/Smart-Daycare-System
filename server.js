const express = require("express");

const db = require("./config/db");
const verifyToken = require("./middleware/authMiddleware");
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.get("/api/profile", verifyToken, (req, res) => {

    res.json({
        message: "Welcome!",
        user: req.user
    });

});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});