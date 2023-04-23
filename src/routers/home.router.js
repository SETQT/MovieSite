const express = require("express");
const homeRouter = express.Router()

const createError = require('http-errors');
const { login, logout, home, searchMovie, myfilm } = require("../controller/home.controller");



// homeRouter.get("/load", home)
homeRouter.get("/", home)
homeRouter.get("/logout", logout)
homeRouter.get("/search", searchMovie)
homeRouter.get("/myFilm", myfilm)



module.exports = homeRouter;