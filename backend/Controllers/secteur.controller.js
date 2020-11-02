var Secteurs = require('../Models/secteur.model');
const translate = require('@k3rn31p4nic/google-translate-api');



// require syntax
const fetch = require('node-fetch');
global.fetch = fetch;

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const APP_ACCESS_KEY= 'w4cwJK1-Trq5L4sDHOraWA-1LgFjp88Plis7ShcHrgE'

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

exports.secteur_create_post = function (req,res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const categorie = req.body.categorie;
    var img=''
    translate(nom, { to: 'en' })
        .then(r => {
            unsplash.search.photos(r.text,1, 10, { orientation: "landscape"})
                .then(toJson)
                .then(json => {
                    img = json.results[0].urls.regular
                    const newSecteur = new Secteurs({
                        nom,
                        description,
                        categorie,
                        img
                    });

                    Secteurs.create(newSecteur)
                        .then(()=> res.json('Secteur ajouté!'))
                        .catch(err=> res.status(400).json('Error: '+err))
                })
        })


};

exports.secteur_list = function (req,res) {
    Secteurs.find()
        .populate({
            path: 'tendancesId',
            model: 'Tendance',

        })
        .then(secteurs => res.json(secteurs))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.secteur_update_get = function (req,res) {
    Secteurs.find()
        .then(secteurs => res.json(secteurs))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.secteur_update_post= function (req,res){
    Secteurs.findById(req.params.id)
        .then(secteur => {
            secteur.nom = req.body.nom;
            secteur.description = req.body.description;
            secteur.categorie = req.body.categorie;
            secteur.domainesId=[]

            secteur.save()
                .then(() => res.json('Secteur updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.secteur_find = function (req,res){
    Secteurs.findById(req.params.id)
        .then(secteur => res.json(secteur))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.secteur_delete = function (req,res){
    Secteurs.findByIdAndDelete(req.params.id)
        .then(() => res.json('Secteur deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.secteur_delete_2 = function (req,res){
    Secteurs.findOneAndUpdate({ _id: req.params.id}, { $set : { secteursId : []
        } }, (err, domaine) => {
        Domaines.remove({
            "_id": {
                $in: domaine.secteursId
            }
        }, function(err) {
            if(err) return next(err);
            domaine.deleteOne()
        })
    })
}






exports.img = async (req,res) =>{
    let url=""
    translate('Technologies de l\'information et de la communication', { to: 'en' })
        .then(r => {
            console.log(r.text)
        unsplash.search.photos(r.text,1, 10, { orientation: "landscape"})
        .then(toJson)
        .then(json =>{
            res.json(json)
            url=json.results[0].urls.full
                console.log("url",url)
        }
        )
        })
}