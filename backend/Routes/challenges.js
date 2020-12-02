var router= require('express').Router();
var challengeController = require('../Controllers/challenge.controller')
const auth = require('../middleware/authentification')

//Get List Domaines
router.get('/',challengeController.challenge_list);
//Create Domaine
router.post('/add',challengeController.challenge_create_post);

router.delete('/:id',challengeController.challenge_delete);

router.post('/update/:id',challengeController.challenge_update_post);

router.get('/:id',challengeController.challenge_find);

router.get('/findUpdate/:id',challengeController.challenge_findUpdate);


router.post('/update_image',challengeController.challenge_add_picture);

module.exports =router;