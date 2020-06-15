const configWare = require("./server-config");
const express = require("express");
const server = express();
const apiRouter = require("./api-router.js");
configWare(server);

server.get("/", (req, res) => {
  res.json({ api: "Server Online" });
});

server.use("/api", apiRouter);

module.exports = server;
