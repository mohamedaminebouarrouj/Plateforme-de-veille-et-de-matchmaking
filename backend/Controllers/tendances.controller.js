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

exports.tendance_update_get = function (req,res) {
    Tendances.find()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};