const express = require("express");
const filmRouter = express.Router()

const createError = require('http-errors');
const { load, add, loadReview } = require("../controller/film.controller");
const { login, logout, home } = require("../controller/home.controller");



// homeRouter.get("/load", home)
filmRouter.get("/", load)
filmRouter.get("/add", add)
filmRouter.post("/loadReview", loadReview)



module.exports = filmRouter;