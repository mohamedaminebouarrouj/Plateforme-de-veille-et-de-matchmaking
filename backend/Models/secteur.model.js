const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const secteurSchema = new Schema({
    nom: {type: String, required: true, unique: true},
    description: {type: String},

    img:{type:String},

    challengesId : [{ type: Schema.ObjectId, ref: 'Challenge' }],

    tendancesId:[{type: Schema.ObjectId,ref : 'Tendance'}]
},
    {
        timestamp:true,
    },
);

const Secteur = mongoose.model('Secteur',secteurSchema);

module.exports = Secteur;