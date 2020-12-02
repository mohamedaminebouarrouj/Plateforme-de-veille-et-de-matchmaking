const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const challengeSchema = new Schema({
        nom: {type: String, required: true, unique: true},
        description: {type: String},
        categorie: {type: String},

        secteursId: [{type: Schema.ObjectId, ref: 'Secteur'}],
        startupsId: [{type: Schema.ObjectId, ref: 'Startup'}],


        tendancesId:[{type: Schema.ObjectId,ref : 'Tendance'}],

        img:{type:String},

    },
    {
        timestamp:true,
    },
);

const Challenge = mongoose.model('Challenge',challengeSchema);

module.exports = Challenge;