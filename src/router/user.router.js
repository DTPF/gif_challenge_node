const express = require('express')
const controller = require('../controllers/user.controller')
const md_auth = require('../middlewares/auth.middleware')
const api = express.Router()

api
  .post('/register-login-user', md_auth.ensureAuth, controller.registerLoginUser)

module.exports = api;