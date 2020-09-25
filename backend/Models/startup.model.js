const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const startupSchema = new Schema({
        nom: {type: String, required: true, unique: true},
        description: {type: String},
        fondateurs :[{type: String}],
        dateCreation: {type: Date},
        logo: {type:String},
        domainesId:[{type: Schema.ObjectId,ref : 'Domaine'}]
    },
    {
        timestamp:true,
    },
);

const Startup = mongoose.model('Startup',startupSchema);

module.exports = Startup;