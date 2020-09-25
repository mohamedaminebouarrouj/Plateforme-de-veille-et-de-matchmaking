const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const challengeSchema = new Schema({
        nom: {type: String, required: true, unique: true},
        description: {type: String},
        type: {
            type: String,
            enum: ['Business','Général', 'Autre'],
            default: 'Autre',
            required: true,
        },
        domainesId:[{type: Schema.ObjectId,ref : 'Domaine'}]
    },
    {
        timestamp:true,
    },
);

const Challenge = mongoose.model('Challenge',challengeSchema);

module.exports = Challenge;