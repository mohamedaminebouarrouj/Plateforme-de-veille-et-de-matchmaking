var User= require('../Models/user.model');
const bcrypt = require("bcryptjs");
const auth = require('../middleware/authentification')

exports.getConnectedUser = async (req,res) => {
    try {
        let user = await User.findOne({_id: req.user._id})
        if (user) {
            res.status(200).json({ user: user })
        }

        else if (!user) {
            return res.status(401).send()
        }

    } catch (error) {
        res.status(400).send()
    }
}

exports.login = async (req,res) => {
    try {
        const { email, password } = req.body
        let user = await User.findByCredentials(email, password)
        if (user) {
            const token = await User.generateAuthToken(user)
            res.status(200).json({ user: user, token: token })
        }

        else if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }

    } catch (error) {
        res.status(400).send({ error: 'Login failed! Check authentication credentials' })
    }
}
exports.register = async (req,res) => {
    const email = req.body.email;
    const nom= req.body.nom;
    const prenom =req.body.prenom
    const organisation = req.body.organisation
    try {
        let password = await bcrypt.hash(req.body.password, 10);
        const newUser= new User(
            {   email,
                password,
                nom,
                prenom,
                organisation
            }
        )
        let user = await User.create(newUser);
        return res.status(200).json({
            message:"user added",
        })
    } catch(error){
        console.log(error)
        return res.json({
            message:"error",
            error:error.message
        })
    }

}