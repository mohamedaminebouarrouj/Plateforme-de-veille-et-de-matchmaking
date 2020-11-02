const router= require('express').Router();
var secteurController= require('../Controllers/secteur.controller')

router.get('/',secteurController.secteur_list);

router.post('/add',secteurController.secteur_create_post);

router.delete('/:id',secteurController.secteur_delete);

router.post('/update/:id',secteurController.secteur_update_post);

router.get('/:id',secteurController.secteur_find);

router.get('/img/img',secteurController.img);

module.exports =router;