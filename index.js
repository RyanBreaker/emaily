const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there", version: process.version });
});

const PORT = process.env.PORT || 5000;
console.log("Port:", PORT);

app.listen(PORT);
