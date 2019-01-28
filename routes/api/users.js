const express = require("express");
const router = express.Router();

//Load User Model
const User = require("../../models/Users");

// @route   GET api/users/:id
// @desc    GET selected user profile
// @Access  Private
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      Advert.find({ creator: req.params.id })
        .then(advert => {
          res.json({
            success: true,
            user: user,
            advert: advert
          });
        })
        .catch(err => res.json({ success: false }));
    })
    .catch(err =>
      res.status(404).json({ noadfound: "No user found with that ID" })
    );
});
module.exports = router;
