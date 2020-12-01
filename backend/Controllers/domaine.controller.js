var Domaines = require('../Models/domaine.model');
var Challenges = require('../Models/challenge.model');
var Secteurs = require('../Models/secteur.model');
var Startups = require('../Models/startup.model');
var Tendances = require('../Models/tendance.model');

const translate = require('@k3rn31p4nic/google-translate-api');
const fetch = require('node-fetch');
global.fetch = fetch;

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const APP_ACCESS_KEY = 'w4cwJK1-Trq5L4sDHOraWA-1LgFjp88Plis7ShcHrgE'

const unsplash = new Unsplash({accessKey: APP_ACCESS_KEY});

exports.domaine_create_post = async (req, res) => {
    const nom = req.body.nom;
    const description = req.body.description;
    const categorie = req.body.categorie;


    const newDomaine = new Domaines({
        nom,
        description,
        categorie,
    })

    Domaines.create(newDomaine)
        .then((domaine) => res.json(domaine))
        .catch(err => res.status(400).json('Error: ' + err))
};

exports.domaine_list = function (req, res) {
    Domaines.find()
        .populate({
            path: 'tendancesId',
            model: 'Tendance',

        })
        .populate({
            path: 'startupsId',
            model: 'Startup'
        })
        .exec()
        .then(domaines => res.json(domaines))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.domaine_update_get = function (req, res) {
    Domaines.find()
        .then(domaines => res.json(domaines))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.domaine_update_post = function (req, res) {
    Domaines.findById(req.params.id)
        .then(domaine => {
            domaine.nom = req.body.nom;
            domaine.description = req.body.description;
            domaine.categorie = req.body.categorie;

            domaine.save()
                .then(() => res.json('Domaine updated!'))
                .catch(err => res.status(400).json('Error: ' + err));


        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_update_v1 = function (req, res) {
    Domaines.find()
        .then(Ldomaine => {
            Ldomaine.map(currentD => {
                Domaines.findByIdAndUpdate(currentD)
                    .then(domaine => {
                        domaine.__v = 0;
                        domaine.categorie = "";
                        domaine.save()
                            .then(() => res.json('Domaine updated!'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    })

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_find = function (req, res) {
    Domaines.findById(req.params.id)
        .populate({
            path: 'tendancesId',
            model: 'Tendance',

        })
        .populate({
            path: 'startupsId',
            model: 'Startup'
        })
        .exec()
        .then(domaine => res.json(domaine))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_findUpdate = function (req, res) {
    Domaines.findById(req.params.id)
        .then(domaine => res.json(domaine))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_delete = function (req, res) {
    Domaines.findByIdAndDelete(req.params.id)
        .then((domaine) => {
            domaine.startupsId.map((startId) => {
                Startups.findByIdAndUpdate(startId,
                    {$pull: {domainesId: domaine._id}},
                    {new: true, useFindAndModify: false})
                    .then()
            })

            domaine.tendancesId.map((tendId) => {
                Tendances.findByIdAndDelete(tendId, function (err, docs) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Deleted : ", docs);
                    }
                })
            })

        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_add_picture = async (req, res) => {
    Domaines.find()
        .then((domaines) => {
            domaines.map(currentDomaine => {
                translate(currentDomaine.nom, {to: 'en'})
                    .then(r => {
                        unsplash.search.photos(r.text, 1, 10, {orientation: "landscape"})
                            .then(toJson)
                            .then(json => {
                                var img = ''
                                if (json.results[0].urls.regular)
                                    img = json.results[0].urls.regular

                                Domaines.findByIdAndUpdate(currentDomaine._id,
                                    {$set: {img: img}},
                                    {new: true, useFindAndModify: false})
                                    .then()

                            })
                            .catch();
                    })
                    .catch(err => res.status(401).json('Error: ' + err));
            })
            res.json('Updated')
        })
        .catch();
}
