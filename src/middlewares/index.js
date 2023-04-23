const auth = (req, res, next) => {

    if (!req.session.user) res.redirect("http://localhost:3000/")
    else next()
}

module.exports = {
    auth
}