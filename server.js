const express = require("express");

const db = require("./config/db");

const app = express();

const PORT = 3000;

const homeRoutes = require("./routes/homeRoutes");
app.use("/", homeRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Smart Daycare Management System!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
