var User = require('../Models/user.model');
const bcrypt = require("bcryptjs");
const auth = require('../middleware/authentification')

exports.getConnectedUser = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user._id}).populate({
            path: 'revendicationsId',
            model: 'Revendication',
            populate: {path: 'startupId', model: 'Startup'}

        })
        if (user) {
            res.status(200).json({user: user})
        } else if (!user) {
            return res.status(401).send()
        }

    } catch (error) {
        res.status(400).send()
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        let user = await User.findByCredentials(email, password)
        if (user) {
            const token = await User.generateAuthToken(user)
            res.status(200).json({user: user, token: token})
        } else if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }

    } catch (error) {
        res.status(400).send({error: 'Login failed! Check authentication credentials'})
    }
}
exports.register = async (req, res) => {
    const email = req.body.email;
    const nom = req.body.nom;
    const prenom = req.body.prenom
    const organisation = req.body.organisation
    const role = req.body.role
    const secteurId = req.body.secteurId

    if (role === "Corporate") {
        try {
            let password = await bcrypt.hash(req.body.password, 10);
            const newUser = new User(
                {
                    email,
                    password,
                    nom,
                    prenom,
                    organisation,
                    role,
                    secteurId
                }
            )
            let user = await User.create(newUser);
            return res.status(200).json({
                message: "user added",
            })
        } catch (error) {
            console.log(error)
            return res.json({
                message: "error",
                error: error.message
            })
        }
    } else {
        try {
            let password = await bcrypt.hash(req.body.password, 10);
            const newUser = new User(
                {
                    email,
                    password,
                    nom,
                    prenom,
                    organisation,
                    role
                }
            )
            let user = await User.create(newUser);
            return res.status(200).json({
                message: "user added",
            })
        } catch (error) {
            return res.json({
                message: "error",
                error: error.message
            })
        }
    }


}

exports.changePassword = async (req, res) => {
    try {
        const {email, password} = req.body
        let user = await User.findByCredentials(email, password)
        if (user) {
            let newPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.password = newPassword

            user.save()
                .then(() => res.json('Password updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        } else if (!user) {
            return res.status(401).send(false)
        }
    } catch (error) {
        res.status(400).send(false)
    }

}

exports.user_update_post = function (req, res) {
    User.findById(req.params.id)
        .then(user => {
            user.nom = req.body.nom;
            user.prenom = req.body.prenom;
            user.organisation = req.body.organisation;

            if (user.role === "Corporate") {
                user.secteurId = req.body.secteurId
            }

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.user_find = function (req, res) {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.admin_update_post = function (req,res){
    User.findById(req.params.id)
        .then(user => {
            user.nom = req.body.nom;
            user.prenom = req.body.prenom;
            user.organisation = req.body.organisation;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

