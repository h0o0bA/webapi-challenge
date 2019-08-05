const express = require("express");
const projectsDb = require("./data/helpers/projectModel");

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

router.get("/:id", (req, res) => {
  projectsDb
    .get(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  projectsDb
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  projectsDb
    .update(req.params.id, req.body)
    .then(project => {
      res.status(201).json({ project });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
