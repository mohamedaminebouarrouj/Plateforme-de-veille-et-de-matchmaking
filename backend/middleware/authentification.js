const jwt = require('jsonwebtoken')
var User= require('../Models/user.model');

const auth = async(req, res, next) => {
    const token = req.header('Authorization')
    const data = jwt.verify(token, process.env.JWT_KEY)
    console.log('middleware',data)
    let user;
    try {
        if (data.role == 1) {
            user = await User.findOne({_id: data.id})
        }
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        req.role = data.role
        next()
    } catch (error) {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }

}
module.exports = auth
