const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAvatarInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 10, max: 200 })) {
    errors.description = "Description must be between 10 and 200 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
