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
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.action);
});

router.delete("/:id", validateId, (req, res) => {
  actionDb
    .remove(req.params.id)
    .then(action => {
      res.status(200).json({ message: "The action has been removed", action });
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", validateId, (req, res) => {
  actionDb
    .update(req.params.id, req.body) // don't have to validate req.body as it gets ald info if there is no changes
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => res.status(500).json(err));
});

function validateId(req, res, next) {
  actionDb
    .get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "Id not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
