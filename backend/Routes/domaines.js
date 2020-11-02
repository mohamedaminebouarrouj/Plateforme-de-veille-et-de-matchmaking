var router= require('express').Router();
var domaineController= require('../Controllers/domaine.controller')


//Get List Domaines
router.get('/',domaineController.domaine_list);
//Create Domaine
router.post('/add',domaineController.domaine_create_post);

router.get('/find_by_name/:nom',domaineController.domaine_find_byName)

router.delete('/:id',domaineController.domaine_delete);

router.post('/update/:id',domaineController.domaine_update_post);

router.get('/:id',domaineController.domaine_find);

router.get('/domaine_find_one/:id',domaineController.domaine_find_one);

router.post('/update_image',domaineController.domaine_add_picture);


module.exports =router;