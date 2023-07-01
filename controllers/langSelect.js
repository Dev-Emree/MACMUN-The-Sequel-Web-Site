let langSelector = (category, res) => {
    switch (category) {
        case 'english-committees':
            category = 'en';
            break;
        case 'turkce-komiteler':
            category = 'tr';
            break;
        case 'deutsche-komitees':
            category = 'de';
            break;
        default:
            res.redirect('/404');
            return;
    }
    return category;
}

module.exports = {
    langSelector
}