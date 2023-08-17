const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const validateFormData = require("./validateFormData");
const upload = require("./upload");
const validateFields = require("./validateFields");
const checkUser = require("./checkUser")

module.exports = {
  validateBody,
  authenticate,
  upload,
  validateFormData,
  validateFields,
  checkUser
};
