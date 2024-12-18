const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
});

app.get("/test", (req, res) => {
  res.send("Test route working!");
});

module.exports = app;
