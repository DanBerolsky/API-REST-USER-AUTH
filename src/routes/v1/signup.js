const express = require("express");
const router = express.Router();
const { bodyParserJson } = require("../../helpers/jsonBodyParser.js");
bodyParserJson(router);
 const {
  signupForm,
  signupAction,
} = require("./controllers/signupController.js");
const validationErrorHandler = require("../../middlewares/validationMiddleware.js");
const {validations} = require("../../validators/authValidator.js");

router.post("/", validations, validationErrorHandler, signupAction);

router.get("/", signupForm);

module.exports = router;
