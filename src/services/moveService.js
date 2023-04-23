const db = require("../configs/config.database");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");






const findMoveByName = async (name) => {
    let result;

    try {
        const data = await db.oneOrNone('SELECT * FROM public."Movie" WHERE "title"=$1', [name])
        // console.log(data);
        if (data) {

            let movie = new Movie(data.id, data.img, data.title, data.year, data.topRank
                , data.rating, data.ratingCount, data.genres, data.reviews, data.synopses, data.casts)
            // success
            // console.log(user.id);
            return movie
        }
        return data

    }
    catch (e) {
        // error
        // console.log(e);
        return false

    }

}
const findMoveByID = async (name) => {
    let result;

    try {
        const data = await db.oneOrNone('SELECT * FROM public."Movie" WHERE "id"=$1', [name])

        return data

    }
    catch (e) {
        // error
        // console.log(e);
        return false

    }

}
const findActorOfIDFilm = async (name) => {
    let result;

    try {
        const data = await db.any('SELECT * FROM public."CastFilm" WHERE "filmID"=$1', [name])

        return data

    }
    catch (e) {
        // error
        // console.log(e);
        return false

    }

}

const findTopMove = async () => {
    let result;

    try {
        const data = await db.many('select * from public."Movie" where rating is not null order by "rating" DESC limit 9')
        return data

    }
    catch (e) {
        // error
        // console.log(e);
        return false

    }

}
const findTMoveLikeName = async (name) => {
    let result;

    try {
        const data = await db.manyOrNone('select * from public."Movie" where (Lower(title) LIKE $1) ', [`%${name}%`])
        return data

    }
    catch (e) {
        // error
        // console.log(e);
        return false

    }

}


const findID = async () => {
    let result;
    try {
        const data = await db.any('SELECT MAX(id) FROM "Movie"')
        return data[0].max + 1
    }
    catch (e) {

    }

}


const findALL = async () => {
    let result;
    try {
        const data = await db.any('SELECT * FROM "Movie"')
        return data
    }
    catch (e) {
        // console.log(e);
        return false
    }

}

const saveMove = async (datas) => {


    try {
        const data = await db.one('INSERT INTO  "Movie" VALUES($1, $2,$3, $4, $5,$6, $7,$8, $9, $10,$11) returning *',
            [datas.id, datas.img, datas.title, datas.year, datas.topRank
                , datas.rating, datas.ratingCount, datas.gentres, datas.reviews, datas.synopses, datas.casts])

    }

    catch (e) {
        // console.log(e);
        // return fals

    }

}

const saveCharacter = async (film, name, character) => {


    try {
        const data = await db.one('INSERT INTO  "CastFilm" VALUES($1, $2,$3) returning *',
            [film, name, character])

    }
    catch (e) {

        // return fals

    }

}

module.exports = {
    saveCharacter,
    findTMoveLikeName,
    // findUserByID,
    findMoveByName,
    saveMove,
    findMoveByID,
    findID,
    findActorOfIDFilm,
    findTopMove,
    findALL
}