let express = require('express'),
    router = express.Router();

router.get('/', (req, res) => res.redirect('/'));

router.get('/pricing-details', (req, res) => {
    //res.render('fees.ejs', req.app.locals.getData('fees'));
    res.redirect('/coming-soon');
})

router.get('/faq', (req, res) => {
    var data = {data: req.app.locals.getData('faq')[req.cookies.language]};
    data.lang = req.cookies.language;
    res.render('faq.ejs', data);
})

router.get('/handbooks', (req, res) => {
    res.render('handbook.ejs', req.app.locals.getData('handbook'));
});

router.use('*', (req,res) => res.redirect('/coming-soon'))

module.exports = router;