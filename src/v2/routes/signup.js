/* const express = require("express");
const router = express.Router();
const { bodyParserJson } = require("../../helpers/jsonBodyParser.js");
bodyParserJson(router);
 const {
  signupForm,
  signupAction,
} = require("../../controllers/signupController.js"); 
const validationErrorHandler = require("../../middleware/validationMiddleware");
const validations = require("../../validators/authValidator");

router.post("/", validations, validationErrorHandler, signupAction);

router.get("/", signupForm);

module.exports = router;
 */