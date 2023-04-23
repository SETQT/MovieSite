// const { Router } = require('express')
const express = require('express')
const session = require('express-session')
const app = express()
const createError = require('http-errors')
const port = 3000
const router = require('./src/routers/home.router.js')

const handlebars = require("express-handlebars");

const cookieParser = require("cookie-parser");
const authRouter = require('./src/routers/auth.router.js')
const filmRouter = require('./src/routers/film.router.js')
const { auth } = require('./src/middlewares/index.js')
const { initDATA } = require('./src/controller/home.controller.js')

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'test',
    cookie: { maxAge: 60000 }
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))



app.set('trust proxy', 1)


app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main.handlebars',

}));

app.set('view engine', 'handlebars');
app.set('views', './src/views/');


initDATA()

app.get('/', (req, res, next) => {


    res.render("login.handlebars")
})

app.use('/auth', authRouter)
// app.use("/", auth)
app.use('/home', router)
app.use('/film', filmRouter)

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        mesage: "not foundss"
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

