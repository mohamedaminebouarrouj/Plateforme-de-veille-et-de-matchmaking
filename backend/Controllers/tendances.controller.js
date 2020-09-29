var Tendances= require('../Models/tendance.model');

exports.tendance_create_post = function (req,res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const fondateur = req.body.fondateur;
    const dateCreation = req.body.dateCreation;
    const logo = req.body.logo;
    const domainesId= req.body.domainesId;

    const newTendance = new Tendances({
        nom,
        description,
        fondateur,
        dateCreation,
        logo,
        domainesId,
    })

    newTendance.save()
        .then(()=> res.json('Tendance ajouté!'))
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.tendances_list = function (req,res) {
    Tendances.find()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f3f0a9a1fbe74c8ba9d3c143212f4ca0');

exports.get_news = function (req,res){
    newsapi.v2.everything({
        source: '',
        q: 'blockchain',
        language:'en',
        from: '2020-08-29',
        sortBy: 'relevancy'
    }).then(response => {
        res.json(response)
    });
}

exports.tendance_update_get = function (req,res) {
    Tendances.find()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};