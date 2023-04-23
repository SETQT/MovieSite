


const CryptoJS = require("crypto-js");
const hashLength = 64;


const encode = (pass) => {
    let saw = Date.now().toString(16);
    let passSaw = pass + saw;
    let passHash = CryptoJS.SHA3(passSaw, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
    return (passHash + saw)
}

const checkPass = (passClient, pass) => {
    let salt = pass.slice(hashLength);
    let passSalt = passClient + salt;
    let passHashed = CryptoJS.SHA3(passSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
    console.log("pass has+sow:  " + passHashed + salt);
    console.log("pass  db:  " + pass);
    console.log("pass  client2:  " + passClient);
    if (pass === (passHashed + salt))
        return true
    return false
}
const decode = (pass) => {
    let salt = pass.slice(hashLength);
    let passSalt = pass + salt;
    let passHashed = CryptoJS.SHA3(passSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
    return passHashed + salt
}



module.exports = {
    encode,
    decode,
    checkPass
}