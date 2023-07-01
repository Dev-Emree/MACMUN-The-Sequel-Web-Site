let nodemailer = require('nodemailer'),
    modelCounter = require('../models/Counter');

var daysAdaptor = function () {
    const now = new Date()
    return {
        day: now.getDate(),
        month: now.getMonth() + 1
    }
}

let smtpTransport = nodemailer.createTransport({
    host: 'mail.mevcollegemun.org',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    }
});

function createText(data) {
    return `Home page visitor : ${data.home}
GA1 committee page visitor : ${data.ga1}
GA2 committee page visitor : ${data.ga2}
GA3 committee page visitor : ${data.ga3}
GA4 committee page visitor : ${data.ga4}
GA5 committee page visitor : ${data.ga5}
GA6 committee page visitor : ${data.ga6}
UNSC committee page visitor : ${data.unsc}
NATO committee page visitor : ${data.nato}
WHO committee page visitor : ${data.who}
UNEP committee page visitor : ${data.unep}
UNICEF committee page visitor : ${data.unicef}
FELSEFE committee page visitor : ${data.felsefe}
TARİH committee page visitor : ${data.tarih}
Historisches Krisenkabinett committee page visitor : ${data["historisches-krisenkabinett"]}`
}

function createHTML(data) {
    `
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap" rel="stylesheet">
    <style type="text/css">*{font-family:"Nunito",sans-serif}tr,th,td,table{border:none;}</style>
    <table><tr><th>Page/Committee Name</th><th>Visitor Count</th></tr><tr><td>Home Page</td><td>${data.home}</td></tr><tr><td>GA1 Committee</td><td>${data.ga1}</td></tr><tr><td>GA2 Committee</td><td>${data.ga2}</td></tr><tr><td>GA3 Committee</td><td>${data.ga3}</td></tr><tr><td>GA4 Committee</td><td>${data.ga4}</td></tr><tr><td>GA5 Committee</td><td>${data.ga5}</td></tr><tr><td>GA6 Committee</td><td>${data.ga6}</td></tr><tr><td>UNSC Committee</td><td>${data.unsc}</td></tr><tr><td>NATO Committee</td><td>${data.nato}</td></tr><tr><td>WHO Committee</td><td>${data.who}</td></tr><tr><td>UNICEF Committee</td><td>${data.unicef}</td></tr><tr><td>UNEP Committee</td><td>${data.unep}</td></tr><tr><td>Felsefe Committee</td><td>${data.felsefe}</td></tr><tr><td>Tarih Committee</td><td>${data.tarih}</td></tr><tr><td>Historisches Krisenkabinett</td><td>${data["historisches-krisenkabinett"]}</td></tr></table>
    `
}

async function run(data, day, month) {
    let sendRes = await smtpTransport.sendMail({
        from: `Visitor Counter Bot <${process.env.MAIL}>`,
        to: process.env.TARGET,
        subject: `Daily number of visitors (${day}/${month})`,
        html: createHTML(data),
        text: createText(data)
    });
}

module.exports = async () => {
    var { day, month } = daysAdaptor();
    var date = `${day - 1}/${month}`

    const data = await modelCounter.findOne({ date: date });

    if (data.mail) return;

    data.mail = !data.mail;

    run(data, day-1, month).catch(err => console.error(err));

    data.save();
}