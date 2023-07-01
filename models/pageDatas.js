let { readFileSync } = require('fs');

const getData = (page) => {
    let data = readFileSync(`data/${page}.json`);
    return JSON.parse(data);
}

const getCommitteeData = (lang, committee, res) => {
    try {
        let data = readFileSync(`data/committees/${lang}/${committee}.json`);
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
        res.redirect('/500');
    }
}

module.exports = {
    getData, getCommitteeData
}