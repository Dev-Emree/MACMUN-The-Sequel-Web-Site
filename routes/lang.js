let express = require('express'),
    router = express.Router();


router.get('/english', (req, res) => {
    res.cookie('language','english');
    res.redirect('/');
});

router.get('/turkce', (req, res) => {
    res.cookie('language','turkce');
    res.redirect('/');
});

router.get('/deutsch', (req, res) => {
    res.cookie('language','deutsch');
    res.redirect('/');
});

router.get('/translate', (req, res) => {
    res.cookie('language', req.query.lang);
    req.query.url === undefined?res.redirect('/'):res.redirect(req.query.url);
});

module.exports = router;