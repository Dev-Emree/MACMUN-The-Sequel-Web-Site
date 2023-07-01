var daysAdaptor = function () {
    const now = new Date()
    return {
        day: now.getDate(),
        month: now.getMonth() + 1
    }
}

module.exports = async function (model, page) {
    var { day, month} = daysAdaptor();
    var date = `${day}/${month}`;

    var data = await model.findOne({ date: date });

    if (data === null) {
        data = new model();
        data.date = date;
        data[page] = 1;
    } else {
        data[page] += 1;
    }

    data.save();
}