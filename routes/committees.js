let express = require('express'),
    router = express.Router(),
    { langSelector } = require('../controllers/langSelect'),
    updateCounter = require('../controllers/counter');

router.get('/', (req, res) => res.redirect('/c/english-committees'));

router.get('/:category', (req, res) => {
    res.render('committees.ejs',
    req.app.locals.getData('committees')[langSelector(req.params.category,res)]);
});

router.get('/:category/:committee', (req, res) => {
    if (req.params.committee == "coming-soon") {
        res.redirect('/coming-soon');
        return;
    }
    var category = langSelector(req.params.category, res);
    res.render('committee.ejs',
    req.app.locals.getCommitteeData(category, req.params.committee, res));

    updateCounter(req.app.locals.Counter, req.params.committee);
});

module.exports = router;