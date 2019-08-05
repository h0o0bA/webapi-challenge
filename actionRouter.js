const express = require("express");

const router = express.Router();
const actionDb = require("./data/helpers/actionModel");

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/:id");

module.exports = router;
