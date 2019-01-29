const express = require("express");
const router = express.Router();

//Load User Model
const Category = require("../../models/Category");
const Belong = require("../../models/Belong");

// @route   GET api/category
// @desc    GET categories route
// @Access  Public
router.get("/", (req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err =>
      res.status(404).jjson({ nocategoryfound: "No categories found" })
    );
});

// @route   GET api/category/:id
// @desc    GET categories by id route
// @Access  Public
router.get("/:id", (req, res) => {
  Belong.find({ advertID: req.params.id })
    .then(categories => res.json(categories))
    .catch(err =>
      res.status(404).json({ nocategoryfound: "No categories found" })
    );
});
module.exports = router;
