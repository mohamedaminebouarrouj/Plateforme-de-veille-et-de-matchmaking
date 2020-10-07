var router= require('express').Router();
var tendancesController = require('../Controllers/tendances.controller')


//Get List Domaines
router.get('/',tendancesController.tendances_list);

router.delete('/:id',tendancesController.tendance_delete);

router.get('/:id',tendancesController.tendance_find);


router.post('/update/:id',tendancesController.tendance_update_post);


router.get('/news_domaine/:id/:language',tendancesController.get_news_domaine);

router.get('/news_challenge/:id/:language',tendancesController.get_news_challenge);

router.get('/news_secteur/:id/:language',tendancesController.get_news_secteur);



module.exports =router;