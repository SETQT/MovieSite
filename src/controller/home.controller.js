

const app = require("express");
const { ExpressHandlebars } = require("express-handlebars");
const db = require('../configs/config.database')
const User = require('../models/User.model')
// const { findUserByID } = require('../services')
let Data = []
let CASTDATA = []
try {
    Data = require("../../dataFILEJson/movies.json");
    CASTDATA = require("../../dataFILEJson/casts.json");
} catch (error) {

}

const { saveMove, findTopMove, saveCharacter, findTMoveLikeName, findMoveByID, findALL } = require("../services/moveService");
const Movie = require("../models/Movie.model");
const { saveReview } = require("../services/reviewServive");
const { saveCast } = require("../services/castService");
const Cast = require("../models/Cast.model");
const { findUserByID, deleteMyFilm } = require("../services/userService");
const login = async (req, res, next) => {



    let user;
    user = await findUserByID(5)

    console.log(user.id);
    res.send("oksk")
}




const logout = (req, res, next) => {

    res.send("okk out")
}


const searchMovie = async (req, res, next) => {
    let name = req.query.name
    let page = req.query.page
    try {

        let film = await findTMoveLikeName(name)


        if (!page) page = 1


        let temp = []
        let data = []
        for (let i = 0; i < 6; i++) {
            data.push(film[page * 6 + i])

        }
        length = film.length / 6;
        console.log(length);
        for (let i = 0; i < length - 1; i++) {
            temp.push(i + 1)


        }

        res.render("search.handlebars", { film: data, page: temp, remember: name })

    } catch (error) {

    }

}
const myfilm = async (req, res, next) => {

    let del = req.query.del



    try {
        id = req.session.user;
        if (del) {

            await deleteMyFilm(id, del)
        }


        let user = await findUserByID(id)
        let data = user.myFilm

        if (data != null) {

            data = data.replace(/\s+/g, "");
            let list = data.split(",")


            let listfavorist = []
            for (const key in list) {

                if (list[key] != '') {

                    let film = await findMoveByID(list[key])
                    listfavorist.push(film)
                }
            }

            return res.render("profile.handlebars", { film: listfavorist })
        }
        return res.render("profile.handlebars")

    } catch (error) {

    }





}

const initDATA = async () => {

    let test = await findALL();
    if (test.length > 2) return
    const dataMovie = Data.map(async (item) => {
        if (item.reviews) {
            data = item.reviews
            let count = 0, page = 1
            data.forEach(async (element) => {
                count += 1
                if (count == 3) { page += 1; count = 0 }
                await saveReview(item.id, element.author, element.authorRating, element.reviewTitle,
                    element.reviewText, element.submissionDate, page)
            });
        }

        let gen = "";
        if (item.genres) {
            data = item.genres

            data.forEach(async (element) => {
                gen += element + ","
            });
        }
        if (item.casts) {
            data = item.casts

            data.forEach(async (element) => {

                let character = "";
                let data2 = element.characters

                for (let key in data2) {
                    character += data2[key] + ","
                }

                saveCharacter(item.id, element.id, character)
            });
        }


        let movie = new Movie(item.id, item.img, item.title, item.year, item.topRank, item.rating, item.ratingCount, gen, item.id, item.synopses?.text, item.casts.id)


        await saveMove(movie)
    });
    const dataCast = CASTDATA.map(async (item) => {

        let gen = "";
        if (item.nicknames) {
            data = item.nicknames

            data.forEach(async (element) => {
                gen += element + ","
            });
        }


        await saveCast(item.id, item.image, item.legacyNameText, item.name, item.birthDate, item.birthPlace,
            item.gender, gen, item.realName, item.heightCentimeters)
    });
}
const home = async (req, res, next) => {

    // initDATA()

    try {
        let film = await findTopMove();
        // console.log(film);

        res.render("home.handlebars", { film })

    } catch (error) {

    }

}



module.exports = {
    login,
    logout,
    home,
    myfilm,
    initDATA,
    searchMovie
}