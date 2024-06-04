// const path = require('path')
require('dotenv').config();
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
// helps in creating re-usable layouts //
const connectDB = require('./server/config/db')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')



const app = express();
const port = 5000 || process.env.PORT;


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
    // Date.now() - 30 * 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// connect to database
connectDB()


//static files
app.use(express.static('public'));


// templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// app.get('/', (req, res) => { 
//     res.send("Hellow susu")
// })


//---*********** routes ***********----//
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));// ye index.js hai bhai //
app.use('/', require('./server/routes/dashboard'));// ye dashboard.js hai bhai //


// handle**** 404 **** 
app.get('*', function (req, res) {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`App is active on port : ${port}`)
})