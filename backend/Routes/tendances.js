var router= require('express').Router();
var tendancesController = require('../Controllers/tendances.controller')


//Get List Domaines
router.get('/',tendancesController.tendances_list);
//Create Domaine
router.post('/add',tendancesController.tendance_create_post);

router.get('/news',tendancesController.get_news);

module.exports =router;