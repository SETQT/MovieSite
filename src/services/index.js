const db = require("../configs/config.database");
const User = require("../models/User.model");





const findUserByID = async (id) => {
    let result;
    try {
        const data = await db.any('SELECT * FROM "User" WHERE "id"=$1', id)
        // let user = new User(data[0].f_ID, data[0].f_Username, data[0].f_Password, data[0].f_Email, data[0].f_Name, data[0].f_DOB, 1)
        // success
        // console.log(user.id);
        return data
    }
    catch (e) {
        // error
        return false
    }

}

module.exports = {
    findUserByID
}