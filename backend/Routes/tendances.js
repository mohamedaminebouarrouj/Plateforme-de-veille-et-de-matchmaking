var router= require('express').Router();
var tendancesController = require('../Controllers/tendances.controller')


//Get List Domaines
router.get('/',tendancesController.tendances_list);
//Create Domaine
router.post('/add',tendancesController.tendance_create_post);


module.exports =router;