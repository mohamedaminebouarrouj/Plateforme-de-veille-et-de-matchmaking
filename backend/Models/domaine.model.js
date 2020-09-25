const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const domaineSchema = new Schema({
        nom: {type: String, required: true, unique: true},
        description: {type: String},
        categorie: {
            type: String,
            required: true,
        },
        secteursId: [{ type: Schema.ObjectId, ref: 'Secteur' }]
    },
    {
        timestamp:true,
    },
);

const Domaine = mongoose.model('Domaine',domaineSchema);

module.exports = Domaine;