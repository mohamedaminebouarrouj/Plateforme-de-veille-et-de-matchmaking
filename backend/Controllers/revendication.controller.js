var Revendications = require('../Models/revendication.model');
var Startups = require('../Models/startup.model');
var Users = require('../Models/user.model');

exports.revendication_create_post = function (req, res) {
    const email = req.body.email;
    const contenu = req.body.contenu;
    const date = new Date();
    const traited = false;
    const verified = false;
    const startupId = req.body.startupId;
    const userId = req.body.userId;

    const newRevendication = new Revendications({
        email,
        contenu,
        date,
        traited,
        verified,
        startupId,
        userId,
    })

    Revendications.create(newRevendication)
        .then(revendication => {
            Users.findByIdAndUpdate(userId,
                {$push: {revendicationsId : revendication._id}},
                { new: true, useFindAndModify: false })
                .then((user)=>res.json(user))
        })
        .catch(err => res.status(400).json('Error: ' + err))
};

exports.revendication_list = function (req, res) {
    Revendications.find()
        .populate({
            path: 'userId',
            model: 'User',
        })
        .populate({
            path: 'startupId',
            model: 'Startup'
        })
        .exec()
        .then(revendication => res.json(revendication))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.revendication_update_post = function (req, res) {
    Revendications.findById(req.params.id)
        .then(revendication => {
            revendication.traited = req.body.traited;
            revendication.verified = req.body.verified;

            revendication.save()
                .then(() => res.json('Revendication updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.revendication_find = function (req, res) {
    Revendications.findById(req.params.id)
        .populate({
            path: 'userId',
            model: 'User',
        })
        .populate({
            path: 'startupId',
            model: 'Startup'
        })
        .then(revendication => res.json(revendication))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.revendication_delete = function (req, res) {
    Revendications.findByIdAndDelete(req.params.id)
        .then(() => res.json('Revendication updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
}