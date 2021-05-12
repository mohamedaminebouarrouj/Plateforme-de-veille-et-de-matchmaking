var router= require('express').Router();
var startupController = require('../Controllers/startup.controller')

router.get('/',startupController.startup_list);

router.post('/add',startupController.startup_create_post);

router.delete('/:id',startupController.startup_delete);

router.post('/update/:id',startupController.startup_update_post);

router.post('/updateUser/:id',startupController.startup_update_post_user);

router.get('/scraping/',startupController.startup_scraping);

router.get('/:id',startupController.startup_find);

router.post('/upload',startupController.upload_logo);

router.post('/find',startupController.startup_list_pagination);

router.get('/search/:nom',startupController.startup_find_name);

module.exports =router;