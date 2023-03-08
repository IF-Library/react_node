const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

app.use(express.json());

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB Connection
const conn = require("./db/conn");

conn();

// Routes
const routes = require("./routes/router");

app.use("/api", routes);

app.listen(5000, function () {
    console.log("Servidor Online!");
})