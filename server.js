/**
 * @author: Emre Ekiz
 * @copyright: Copyright (c) 2021
 * @license: GPL-3.0 license
 * @description: Mev College Model United Nations' web site
 */
"use strict";

// default packages
let express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser');

// Load the configs
require('dotenv').config();

// Translators router
let translatorRouter = require('./routes/lang');

// Include the routers
let mainRouter = require('./routes/main'),
    aboutRouter = require('./routes/about-us'),
    meetRouter = require('./routes/meet-team'),
    conferenceRouter = require('./routes/conference'),
    committeesRouter = require('./routes/committees');

// Include the functions that handle page datas
let { getData, getCommitteeData } = require(path.join(__dirname, 'models/pageDatas.js')),
    Counter = require('./models/Counter');

// Create a express variable 
var app = express();

// Defining functions that handle page datas
app.locals.getData = getData;
app.locals.getCommitteeData = getCommitteeData;

// Checking the production configuration
app.locals.isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'Production';

app.locals.cookieOptions = {
    maxAge: 7776000000,
    httpOnly: true
}

app.use(cookieParser());

app.use((req, res, next) => {
    if (req.cookies.language === undefined) { 
        res.cookie('language', 'english', req.app.locals.cookieOptions);
    }
    next();
});

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// if configs are not production set the dev configuration
if (!app.locals.isProduction) {
    app.use(require('morgan')('dev'));
    mongoose.set('debug', true);
}

app.locals.Counter = Counter;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname + '/public')));

app.use('/', translatorRouter);
app.use('/', mainRouter);
app.use('/c', committeesRouter);
app.use('/about-us', aboutRouter);
app.use('/meet-the-team', meetRouter);
app.use('/conference', conferenceRouter);

//app.use('*', (req, res) => res.redirect('/404'));

app.listen(process.env.PORT || 8080);