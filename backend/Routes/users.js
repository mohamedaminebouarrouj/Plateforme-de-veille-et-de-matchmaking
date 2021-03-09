const router= require('express').Router();
let  User = require('../Models/user.model');
const userController=require('../Controllers/user.controller')
const auth=require('../middleware/authentification')

router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);

router.route('/update/:id').post(userController.user_update_post);

router.get('/user',[auth],userController.getConnectedUser);

router.route('/changePass').post(userController.changePassword);

module.exports =router;