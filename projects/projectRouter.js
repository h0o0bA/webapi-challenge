const express = require("express");
const projectsDb = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  projectsDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateBody, (req, res) => {
  projectsDb
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", validateId, (req, res) => {
  projectsDb
    .remove(req.params.id)
    .then(project => {
      res
        .status(200)
        .json({ message: "The project has been removed", project });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", validateId, validateBody, (req, res) => {
  projectsDb
    .update(req.params.id, req.body)
    .then(project => {
      res.status(201).json({ project });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id/actions", validateId, (req, res) => {
  projectsDb
    .getProjectActions(req.params.id)
    .then(allActions => {
      if (allActions.length > 0) {
        res.status(200).json(allActions);
      } else {
        res.status(404).json({
          message: "There are no any actions for this specified project Id"
        });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function validateId(req, res, next) {
  projectsDb
    .get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        console.log(req.project);
        next();
      } else {
        res.status(400).json({ message: "Id not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function validateBody(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required fields" });
  } else {
    next();
  }
}

module.exports = router;
