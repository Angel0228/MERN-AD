const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");

//Load Input Validation
const validateAdvertInput = require("../../validation/advert");
const validateCommentInput = require("../../validation/comment");

//Load Advert Model
const Advert = require("../../models/Advert");
//Load Belong Model
const Belong = require("../../models/Belong");

// @route   GET api/adverts
// @desc    GET adverts route
// @Access  Public
router.get("/", (req, res) => {
  Advert.find()
    .populate("creator", ["username"])
    .sort({ creationdate: -1 })
    .then(adverts => res.json(adverts))
    .catch(err => res.status(404).jjson({ noadfound: "No adverts found" }));
});

// @route   GET api/adverts/:id
// @desc    GET adverts by id
// @Access  Public
router.get("/:id", (req, res) => {
  Advert.findById(req.params.id)
    .populate("creator", ["username"])
    .sort({ "comments.creationdate": 1 })
    .then(advert => res.json(advert))
    .catch(err =>
      res.status(404).json({ noadfound: "No advert found with that ID" })
    );
});

// @route   POST api/adverts/create
// @desc    Creating Advert route
// @Access  Public
router.post("/create", (req, res) => {
  const { errors, isValid } = validateAdvertInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Advert.findOne({ title: req.body.title })
    .then(advert => {
      if (advert) {
        errors.title = "Title already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });

        let creator = "5c4db39a1c9d4400004af1d0";

        const newAdvert = new Advert({
          title: req.body.title,
          description: req.body.description,
          avatar,
          price: req.body.price,
          creator
        });

        newAdvert
          .save()
          .then(advert => {
            let advertID = advert._id;
            let categoryTypes = req.body.categoryTypes.split(",");
            for (var i = 0; i < categoryTypes.length; i++) {
              const newBelong = new Belong({
                advertID,
                categoryType: categoryTypes[i]
              });

              newBelong
                .save()
                .then(belong => res.json(belong))
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

// @route   PUT api/adverts/update/:ad_id
// @desc    Update Advert route
// @Access  Public

router.put("/update/:ad_id", (req, res) => {
  const { errors, isValid } = validateAdvertInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get advertData for Updating
  const advertData = {};

  if (req.body.title) advertData.title = req.body.title;
  if (req.body.description) advertData.description = req.body.description;
  if (req.body.price) advertData.price = req.body.price;

  Advert.findOneAndUpdate(
    { _id: req.params.ad_id },
    { $set: advertData },
    { new: true }
  )
    .then(advert => {
      Belong.deleteMany({ advertID: advert._id })
        .then(() => {
          let categoryTypes = req.body.categoryTypes.split(",");
          for (var i = 0; i < categoryTypes.length; i++) {
            const newBelong = new Belong({
              advertID: advert._id,
              categoryType: categoryTypes[i]
            });

            newBelong
              .save()
              .then(belong => res.json(belong))
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @route   PUT api/adverts/status/:ad_id
// @desc    Update Advert Status to Sold out route
// @Access  Public

router.put("/status/:ad_id", (req, res) => {
  //Get advertData for Updating
  const advertData = {};

  advertData.status = "soldout";

  Advert.findOneAndUpdate(
    { _id: req.params.ad_id },
    { $set: advertData },
    { new: true }
  )
    .then(advert => {
      res.json(advert);
    })
    .catch(err => console.log(err));
});

// @route   POST api/adverts/comment/:username
// @desc    Creating Advert comment route
// @Access  Public
router.post("/comment/:id", (req, res) => {
  let userName = "John001";

  const { errors, isValid } = validateCommentInput(req.body);

  //Check Validation
  if (!isValid) {
    //If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Advert.findById(req.params.id)
    .then(advert => {
      const newComment = {
        text: req.body.comment,
        userName
      };

      //Add to comments array
      advert.comments.unshift(newComment);

      //Save
      advert.save().then(advert => res.json(advert));
    })
    .catch(err => res.status(404).json({ advertnotfound: "No advert found" }));
});

// @route   DELETE api/adverts/delete/:id
// @desc    Delete advert by Id
// @Access  Private
router.delete("/delete/:id", (req, res) => {
  Advert.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
