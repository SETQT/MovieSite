const express = require("express");
const authRouter = express.Router()

const createError = require('http-errors');
const { login, logout, register } = require("../controller/auth.controller.js");



// homeRouter.get("/load", home)
authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.get("/logout", logout)



module.exports = authRouter;