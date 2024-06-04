
require('dotenv').config();
const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
// helps in creating re-usable layouts //

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, 'public')))

// templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//---*********** routes ***********----//
app.use('/', require('./server/routes/index'));// ye index js hai bhai //
app.use('/dashboard', require('./server/routes/dashboard'));


// handle**** 404 **** 
app.get('*', function (req, res) {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`App is active on port : ${port}`)
})