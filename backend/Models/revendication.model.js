const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const revendicationSchema = new Schema({

        email:{type:String,required: true},
        contenu:{type: String,required: true},
        date:{type:Date},
        traited:{type:Boolean},
        verified:{type:Boolean},
        startupId:{type: Schema.ObjectId, ref : 'Startup'},
        userId:{type: Schema.ObjectId, ref : 'User'}
    },
    {
        timestamp:true,
    },
);

const Revendication = mongoose.model('Revendication',revendicationSchema);

module.exports = Revendication;