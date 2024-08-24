const express = require('express')
const router = express.Router()
const profileController = require('./controllers/profileController')
const authenticateToken = require('../../middlewares/authenticateToken')


router.get('/',authenticateToken, profileController.getProfile)

module.exports=router