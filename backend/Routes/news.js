var router= require('express').Router();
var newsController = require('../Controllers/news.controller')

router.get('/',newsController.getNews);