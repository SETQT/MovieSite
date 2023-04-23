const db = require("../configs/config.database");
const User = require("../models/User.model");





const findUserByID = async (id) => {
    let result;
    try {
        const data = await db.oneOrNone('SELECT * FROM public."User" WHERE "id"=$1', [id])
        // let user = new User(data[0].f_ID, data[0].f_Username, data[0].f_Password, data[0].f_Email, data[0].f_Name, data[0].f_DOB, 1)
        // success
        // console.log(user.id);
        return data
    }
    catch (e) {
        // error
    }

}
const findUserByUsername = async (name) => {
    let result;

    try {
        const data = await db.oneOrNone('SELECT * FROM public."User" WHERE "userName"=$1', [name])
        // console.log(data);
        if (data) {

            // let user = new User(data.id, data.userName, data.passWord, data.fullName, data.myFilm)
            // success
            // console.log(user.id);
            // return user
            return data
        }

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

const saveUser = async (User) => {


    try {
        const data = await db.one('INSERT INTO  "User" VALUES($1, $2,$3, $4, $5) returning *',
            [User.id, User.userName, User.password, User.fullName, User.myFilm])

    }
    catch (e) {

        // return fals

    }

}

const update = async (id, film) => {


    try {
        let user = await findUserByID(id);

        let datas = user.myFilm
        datas = datas.replace(/\s+/g, "");
        let list = datas.split(",")


        let listfavorist = ""
        for (const key in list) {
            // console.log(list[key]);
            if (list[key] == film && list[key] != null)

                return
        }


        if (user.myFilm != null)
            film += "," + user.myFilm
        const data = await db.one('UPDATE  public."User" SET "myFilm"=$1 WHERE "id"=$2', [film, id])
        // const data = await db.one('INSERT INTO  "User" VALUES($1, $2,$3, $4, $5) returning *',
        // [User.id, User.userName, User.password, User.fullName, User.myFilm])

    }
    catch (e) {
        // console.log(e);
        // return fals

    }

}
const deleteMyFilm = async (id, film) => {


    try {
        let user = await findUserByID(id);
        let datas = user.myFilm
        datas = datas.replace(/\s+/g, "");
        let list = datas.split(",")


        let listfavorist = ""
        for (const key in list) {
            // console.log(list[key]);
            if (list[key] != film && list[key] != null)

                listfavorist += list[key] + ","
        }


        const data = await db.one('UPDATE  public."User" SET "myFilm"=$1 WHERE "id"=$2', [listfavorist, id])
        // const data = await db.one('INSERT INTO  "User" VALUES($1, $2,$3, $4, $5) returning *',
        // [User.id, User.userName, User.password, User.fullName, User.myFilm])

    }
    catch (e) {
        // console.log(e);
        // return fals

    }

}

module.exports = {
    deleteMyFilm,
    findUserByID,
    findUserByUsername,
    saveUser,
    findID,
    update,
}