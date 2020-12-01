const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const domaineSchema = new Schema({
        nom: {type: String, required: true, unique: true},
        description: {type: String},
        categorie: {type: String},

        startupsId: [{type: Schema.ObjectId, ref: 'Startup'}],

        tendancesId: [{type: Schema.ObjectId, ref: 'Tendance'}],

        img: {type: String},
    },
    {
        timestamp: true,
    },
);

const Domaine = mongoose.model('Domaine', domaineSchema);

module.exports = Domaine;