

const app = require("express");
const { ExpressHandlebars } = require("express-handlebars");
const db = require('../configs/config.database');
const { encode, decode, checkPass } = require("../helpers");
const User = require('../models/User.model')
const { findUserByID } = require('../services');
const { saveUser, findID, findUserByUsername } = require("../services/userService");
const CryptoJS = require("crypto-js");

const hashLength = 64
const login = async (req, res, next) => {
    let { username, password, rememberme } = req.body;

    try {

        let user = await findUserByUsername(username)
        if (user) {


            let passDB = user.passWord;
            let salt = passDB.slice(hashLength);
            let pwSalt = password + salt
            const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
            if (passDB == (pwHashed + salt)) {
                // req.session.user = user.id;
                res.redirect("http://localhost:3000/home")
                return
            }

        }

        // res.redirect("http://localhost:3000")
        let error = "Đăng nhập không thành công"

        res.render("login.handlebars", { error })

    } catch (error) {
        console.log(error);

    }

}




const logout = (req, res, next) => {

    try {


        if (req.session.user)
            req.session.destroy();

        res.render('login.handlebars');

    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {

    let { username, password, name } = req.body;

    let check = await findUserByUsername(username);
    if (check != null) {
        let error = "Tài khoản đã tồn tại"

        res.render("login.handlebars", { error })
        return
    }
    let id = await findID()

    newPass = encode(password)

    let user = new User(id, username, newPass, name, "")
    try {
        let save = await saveUser(user).then(() => {

            let error = "Tạo tài khoản thành công !!!"

            res.render("login.handlebars", { error })

        }

        ).catch(e => console.log(e))

    } catch (error) {
        console.log(error);
    }

}



module.exports = {
    login,
    logout,
    register
}