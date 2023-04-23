

const app = require("express");
const { ExpressHandlebars } = require("express-handlebars");
const db = require('../configs/config.database')
const User = require('../models/User.model')
const { findUserByID } = require('../services')
// const Data = require("../../dataFILEJson/movies.json");
const { saveMove, findTopMove, saveCharacter, findMoveByID, findActorOfIDFilm } = require("../services/moveService");
const Movie = require("../models/Movie.model");
const { saveReview, findUserReviewForMovie, findNumPage, findUserReviewByPage } = require("../services/reviewServive");
const { findCastByID } = require("../services/castService");
const { update } = require("../services/userService");
const load = async (req, res, next) => {


    let id = req.query.id;
    try {
        let film = await findMoveByID(id);
        let actor = []
        let list = await findActorOfIDFilm(id);
        list.forEach(async (element) => {
            // console.log("Asd");
            let person = await findCastByID(element.actorID)
            actor.push(person)
        });

        let review = await findUserReviewByPage(1, id)
        // console.log(review);
        let page = await findNumPage(id)
        let temp = []
        for (let i = 0; i < page.max; i++) {
            temp.push(i + 1)

        }
        // console.log(page);

        res.render("info.handlebars", { film, actor, page: temp, review })
    } catch (error) {

    }


}
const loadReview = async (req, res, next) => {

    const { page, film } = req.body

    try {

        let review = await findUserReviewByPage(page, film)
        res.json({
            data: review
        })


    } catch (error) {

    }


}

const add = async (req, res, next) => {


    let id = req.query.id;
    try {
        let film = await findMoveByID(id);
        let actor = []
        // let check=false;
        let list = await findActorOfIDFilm(id);
        list.forEach(async (element) => {
            // console.log("Asd");
            let person = await findCastByID(element.actorID)

            actor.push(person)
        });
        // req.session.user = user.id;
        await update(req.session.user, id)

        res.render("info.handlebars", { film, actor })
    } catch (error) {

    }


}










module.exports = {

    load,
    add,
    loadReview
}