var router= require('express').Router();
var revendicationController = require('../Controllers/revendication.controller')
const auth = require('../middleware/authentification')


router.get('/',revendicationController.revendication_list);

router.post('/add',revendicationController.revendication_create_post);

router.delete('/:id',revendicationController.revendication_delete);

router.post('/update/:id',revendicationController.revendication_update_post);

router.get('/:id',revendicationController.revendication_find);

module.exports =router;