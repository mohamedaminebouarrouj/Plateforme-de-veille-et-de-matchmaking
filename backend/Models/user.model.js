const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        email: {
            type: String,
            unique: true,
            required: true,
            allowNull: false,
        },
        password: {
            type: String,
            required: true,
            allowNull: false,
        },
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
        organisation: {
            type: String
        },

        role: {
            type: String
        },

        avatar: {
            type: String
        },
    //If user role==="Corporate"
        secteurId: {
            type: Schema.ObjectId, ref: 'secteur'
        },
    ///If user role==="Startup"
        revendicationsId: [{type: Schema.ObjectId, ref: 'revendication'}]

    },

    {
        timestamp: true,
    }
);

const User = mongoose.model('User', userSchema);
User.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
        .populate({
            path: 'revendicationsId',
            model: 'Revendication',

        })
        .exec();
    if (!user) {
        return false;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({error: "Invalid password"});
    }
    return user;
}

process.env.JWT_KEY = undefined;
User.generateAuthToken = (user) => {
    console.log(user)
    const token = jwt.sign(
        {id: user._id, role: 1},
        process.env.JWT_KEY
    );
    return token;
}

module.exports = User;