var router= require('express').Router();
var challengeController = require('../Controllers/challenge.controller')


//Get List Domaines
router.get('/',challengeController.challenge_list);
//Create Domaine
router.post('/add',challengeController.challenge_create_post);

router.delete('/:id',challengeController.challenge_delete);

router.post('/update/:id',challengeController.challenge_update_post);

router.get('/:id',challengeController.challenge_find);
module.exports =router;