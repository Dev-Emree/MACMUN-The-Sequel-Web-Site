let express = require('express'),
    router = express.Router();

router.get('/', (req, res) => res.redirect('/'));

router.get('/mev-college', (req, res) => {
    var data = req.app.locals.getData('mev');
    data.lang = req.cookies.language;
    res.render('mev.ejs', data);
});

router.get('/letters', (req, res) => {
    var data = req.app.locals.getData('letters');
    data.lang = req.cookies.language;
    res.render('letters.ejs', data);
});

module.exports = router;