const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const secteurSchema = new Schema({
    nom: {type: String, required: true, unique: true},
    description: {type: String},
    categorie: {
        type: String,
        enum: ['Agriculture et pêche', 'Industrie', 'Commerce', 'Services'],
        default: 'Autre',
        required: true,
    },
    domainesId : [{ type: Schema.ObjectId, ref: 'Domaine' }]
},
    {
        timestamp:true,
    },
);

const Secteur = mongoose.model('Secteur',secteurSchema);

module.exports = Secteur;