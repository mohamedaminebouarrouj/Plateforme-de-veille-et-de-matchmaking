const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const domaineSchema = new Schema({
        nom: {type: String, required: true, unique: true},
        description: {type: String},
        categorie: {
            type: String,
            required: true,
        },
        secteursId:
            [
            { type: Schema.ObjectId,
            ref: 'Secteur' }
            ],

        startupsId:[{
            type: Schema.ObjectId,
            ref : 'Startup'
        }],

        challengesId:[{
            type : Schema.ObjectId,
            ref: 'Challenge'
        }],
        tendancesId:[{
            type : Schema.ObjectId,
            ref: 'Tendance'
        }]
    },
    {
        timestamp:true,
    },
);

const Domaine = mongoose.model('Domaine',domaineSchema);

module.exports = Domaine;