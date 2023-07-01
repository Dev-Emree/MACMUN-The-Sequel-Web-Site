let express = require('express'),
    router = express.Router();

router.get('*', (req, res) => {
    res.redirect('/coming-soon');
});

module.exports = router;