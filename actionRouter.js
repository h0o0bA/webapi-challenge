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

router.get("/:id", (req, res) => {
  res.status(200).json(req.action);
});

router.delete("/:id", (req, res) => {
  actionDb
    .remove(req.params.id)
    .then(action => {
      res.status(200).json({ message: "The action has been removed", action });
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  actionDb
    .update(req.params.id, req.body) // don't have to validate req.body as it gets ald info if there is no changes
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
