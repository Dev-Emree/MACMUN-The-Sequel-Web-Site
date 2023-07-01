let express = require('express'),
    router = express.Router(),
    updateCounter = require('../controllers/counter'),
    mailbot = require('../controllers/mailbot');

router.get('/', (req, res) => {
    data = req.app.locals.getData('home');
    data.lang = req.cookies.language===undefined?'english':req.cookies.language;
    data.counter = data.counter[data.lang];
    res.render('home.ejs', data);

    mailbot();
    updateCounter(req.app.locals.Counter, "home");
});

router.get('/apply-now', (req, res) => {
    res.render('app.ejs', req.app.locals.getData('app'));
});

router.get('/contact-us', (req, res) => {
    var data = req.app.locals.getData('contact');
    data.lang = req.cookies.language;
    data.data = data.data[data.lang];
    res.render('contact.ejs', data);
});

router.get('/coming-soon', (req, res) => {
    res.sendfile('views/coming-soon.html');
});

router.get('/404', (req, res) => {
    res.sendfile('views/404.html');
});

module.exports = router;