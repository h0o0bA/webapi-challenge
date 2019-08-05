const express = require("express");
const projectsRouter = require("./projects/projectRouter");
const actionsRouter = require("./actions/actionRouter");
const server = express();

server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("<h1>Web API - Sprint Challenge!</h1>");
});

module.exports = server;
