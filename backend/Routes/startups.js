var router= require('express').Router();
var startupController = require('../Controllers/startup.controller')

router.get('/',startupController.startup_list);

router.post('/add',startupController.startup_create_post);

router.delete('/:id',startupController.startup_delete);

router.post('/update/:id',startupController.startup_update_post);

router.get('/:id',startupController.startup_find);

router.post('/upload',startupController.upload_logo);

module.exports =router;