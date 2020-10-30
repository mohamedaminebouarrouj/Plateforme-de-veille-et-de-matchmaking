const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tendanceSchema = new Schema({
        titre: {type: String, required: true, unique: true},
        contenu: {type: String},
        datePublication: {type: Date},
        resume: {type:String},
        url:{type: String, unique: true},
        urlToImage:{type:String},
        source:{type:String},
        langage:{type:String},

        domaineId:{type: Schema.ObjectId, ref : 'Domaine'},
        challengeId:{type: Schema.ObjectId, ref : 'Challenge'},
        secteurId:{type: Schema.ObjectId, ref : 'Secteur'},
    },
    {
        timestamp:true,
    },
);

const Tendance = mongoose.model('Tendance',tendanceSchema);

module.exports = Tendance;