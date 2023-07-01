const { Schema, model } = require('mongoose');

let DaysSchema = new Schema({
    date: { type: String, required: true, },
    home: { type: Number, default: 0 },
    ga1: { type: Number, default: 0 },
    ga2: { type: Number, default: 0 },
    ga3: { type: Number, default: 0 },
    ga4: { type: Number, default: 0 },
    ga5: { type: Number, default: 0 },
    ga6: { type: Number, default: 0 },
    unsc: { type: Number, default: 0 },
    nato: { type: Number, default: 0 },
    who: { type: Number, default: 0 },
    unep: { type: Number, default: 0 },
    unicef: { type: Number, default: 0 },
    felsefe: { type: Number, default: 0 },
    tarih: { type: Number, default: 0 },
    "historisches-krisenkabinett": { type: Number, default: 0 },
    mail: {type: Boolean, default: false}
},
{
    timestamps: true,
    collection: new Date().getFullYear().toString()
});




module.exports = model("Counters", DaysSchema);