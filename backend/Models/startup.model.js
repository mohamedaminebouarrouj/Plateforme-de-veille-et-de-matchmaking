const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const startupSchema = new Schema({
        nom: {type: String, required: true, unique: true},
        description: {type: String},
        fondateurs: [{type: String}],
        dateCreation: {type: Date},
        pays: {type: String},
        adresse: {type: String},
        logo: {type: String},
        siteWeb: {type: String},
        email: {type: String},
        facebook: {type: String},
        twitter: {type: String},
        linkedin: {type: String},

        domainesId: [{type: Schema.ObjectId, ref: 'Domaine'}],
        challengesId: [{type: Schema.ObjectId, ref: 'Challenge'}],

    },
    {
        timestamp: true,
    },
);

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;