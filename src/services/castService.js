const db = require("../configs/config.database");
const User = require("../models/User.model");





// const findUserByID = async (id) => {
//     let result;
//     try {
//         const data = await db.any('SELECT * FROM "User" WHERE "f_ID"=$1', id)
//         let user = new User(data[0].f_ID, data[0].f_Username, data[0].f_Password, data[0].f_Email, data[0].f_Name, data[0].f_DOB, 1)
//         // success
//         // console.log(user.id);
//         return user
//     }
//     catch (e) {
//         // error
//     }

// }
const findCastByID = async (name) => {
    let result;

    try {
        const data = await db.oneOrNone('SELECT * FROM public."Cast" WHERE "id"=$1', [name])
        // console.log(data);
        // if (data) {

        //     let user = new User(data.id, data.userName, data.passWord, data.fullName, data.myFilm)
        //     // success
        //     // console.log(user.id);
        //     return user
        // }
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
        const data = await db.any('SELECT MAX(id) FROM "User"')
        return data[0].max + 1
    }
    catch (e) {

    }

}

const saveCast = async (id, img, legacyNameText, name,
    birthDate, birthPlace, gender, nicknames, realName, heightCentimeters) => {


    try {
        const data = await db.one('INSERT INTO  "Cast" VALUES($1, $2,$3, $4, $5,$6,$7,$8 ,$9,$10) returning *',
            [id, img, legacyNameText, name, birthDate, birthPlace, gender, nicknames, realName, heightCentimeters])

    }
    catch (e) {

        // return fals

    }

}

module.exports = {
    // findUserByID,
    findCastByID,
    saveCast,
    findID
}