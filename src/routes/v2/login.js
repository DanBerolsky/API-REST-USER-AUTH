const express = require("express");
const router = express.Router();
const loginController = require("./controllers/loginController");
const { bodyParserJson } = require("../../helpers/jsonBodyParser");
const validationErrorHandler = require("../../middlewares/validationMiddleware");
const {validations} = require("../../validators/authValidator")
bodyParserJson(router);

router.post("/", validations, validationErrorHandler, loginController.login);

router.get("/", loginController.getLogin);

module.exports = router;
