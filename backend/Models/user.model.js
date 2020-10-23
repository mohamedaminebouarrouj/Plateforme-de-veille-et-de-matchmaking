const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       minlength: 5 },
   },

    {
        timestamp:true,
    }
    );

const User = mongoose.model('User',userSchema);
module.exports = User;