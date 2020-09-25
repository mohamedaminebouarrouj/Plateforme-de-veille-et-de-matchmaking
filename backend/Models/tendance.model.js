const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tendanceSchema = new Schema({
        titre: {type: String, required: true, unique: true},
        contenu: {type: String},
        datePublication: {type: Date},
        resume: {type:String},
        url:{type: String},
        domainesId:[{type: Schema.ObjectId,ref : 'Domaine'}]
    },
    {
        timestamp:true,
    },
);

const Tendance = mongoose.model('Tendance',tendanceSchema);

module.exports = Tendance;