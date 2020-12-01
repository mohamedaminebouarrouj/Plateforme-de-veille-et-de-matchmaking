var router= require('express').Router();
var domaineController= require('../Controllers/domaine.controller')


//Get List Domaines
router.get('/',domaineController.domaine_list);
//Create Domaine
router.post('/add',domaineController.domaine_create_post);

router.delete('/:id',domaineController.domaine_delete);

router.post('/update/:id',domaineController.domaine_update_post);

router.post('/updatev/',domaineController.domaine_update_v1);

router.get('/:id',domaineController.domaine_find);

router.get('/findUpdate/:id',domaineController.domaine_findUpdate);



router.post('/update_image',domaineController.domaine_add_picture);


module.exports =router;