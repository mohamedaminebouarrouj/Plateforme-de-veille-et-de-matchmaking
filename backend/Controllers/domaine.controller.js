var Domaines= require('../Models/domaine.model');
var Challenges= require('../Models/challenge.model');
var Secteurs= require('../Models/secteur.model');
var Startups = require('../Models/startup.model');
var Tendances = require('../Models/tendance.model');

const translate = require('@k3rn31p4nic/google-translate-api');
const fetch = require('node-fetch');
global.fetch = fetch;

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const APP_ACCESS_KEY= 'w4cwJK1-Trq5L4sDHOraWA-1LgFjp88Plis7ShcHrgE'

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

exports.domaine_create_post = async (req,res) => {
    const nom = req.body.nom;
    const description = req.body.description;
    const categorie = req.body.categorie;
    const secteursId= req.body.secteursId;




    const newDomaine = new Domaines({
        nom,
        description,
        categorie,
        secteursId,
    })

    Domaines.create(newDomaine)
        .then((domaine)=> {
            domaine.secteursId.map((sectId)=>{
                Secteurs.findByIdAndUpdate(sectId,
                    {$push: {domainesId : domaine._id}},
                    { new: true, useFindAndModify: false })
                    .then((secteur)=>res.json(secteur))
            })

        })
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.domaine_list = function (req,res) {
    Domaines.find()
        .populate ({
        path:'secteursId',
            model: 'Secteur'
        })
        .populate({
            path: 'tendancesId',
            model: 'Tendance',

        })
        .populate ({
            path:'startupsId',
            model: 'Startup'
        })
        .exec()
        .then(domaines => res.json(domaines))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.domaine_update_get = function (req,res) {
    Domaines.find()
        .then(domaines => res.json(domaines))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.domaine_update_post= function (req,res){
    Domaines.findById(req.params.id)
        .then(domaine => {

            const diffPull= domaine.secteursId.filter(x => ! req.body.secteursId.includes(x))
            if (diffPull.length>0)
            {
                diffPull.map(d=>{
                    Secteurs.findByIdAndUpdate(d,
                        {$pull: {domainesId : domaine._id}},
                        { new: true, useFindAndModify: false })
                        .then()

                })
            }
            domaine.nom = req.body.nom;
            domaine.description = req.body.description;
            domaine.secteursId=req.body.secteursId;
            domaine.categorie = req.body.categorie;

            domaine.secteursId.map(sect=>{
                Secteurs.findById(sect)
                    .then(secteur=>{
                        if (!secteur.domainesId.includes(domaine._id))
                        {
                            Secteurs.findByIdAndUpdate(sect,
                                {$push: {domainesId : domaine._id}},
                                { new: true, useFindAndModify: false })
                                .then()
                        }
                    })

            })
            domaine.save()
                .then(() => res.json('Domaine updated!'))
                .catch(err => res.status(400).json('Error: ' + err));


        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_update_v1= function (req,res){
    Domaines.find()
        .then(Ldomaine => {
            Ldomaine.map(currentD=>{
                Domaines.findByIdAndUpdate(currentD)
                    .then(domaine=>{
                        domaine.__v=0;
                        domaine.categorie = "";
                        domaine.save()
                            .then(() => res.json('Domaine updated!'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    })

            })

        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_find = function (req,res){
    Domaines.findById(req.params.id)
        .populate ({
            path:'secteursId',
            model: 'Secteur'
        })
        .populate({
            path: 'tendancesId',
            model: 'Tendance',

        })
        .populate ({
            path:'startupsId',
            model: 'Startup'
        })
        .exec()
        .then(domaine => res.json(domaine))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_findUpdate = function (req,res){
    Domaines.findById(req.params.id)
        .then(domaine => res.json(domaine))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_delete = function (req,res){
    Domaines.findByIdAndDelete(req.params.id)
        .then((domaine)=> {
            domaine.secteursId.map((sectId) => {
                Secteurs.findByIdAndUpdate(sectId,
                    {$pull: {domainesId: domaine._id}},
                    {new: true, useFindAndModify: false})
                    .then()
                domaine.startupsId.map((startId) => {
                    Startups.findByIdAndUpdate(startId,
                        {$pull: {domainesId: domaine._id}},
                        {new: true, useFindAndModify: false})
                        .then()
                })
                domaine.challengesId.map((challId) => {
                    Challenges.findByIdAndUpdate(challId,
                        {$pull: {domainesId: domaine._id}},
                        {new: true, useFindAndModify: false})
                        .then()
                })
                domaine.tendancesId.map((tendId) => {
                    Tendances.findByIdAndDelete(tendId,function (err, docs) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("Deleted : ", docs);
                            }
                        })
                })

            })
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_find_one = function (req,res){
    Domaines.findOneAndUpdate({ _id: req.params.id}, (err, challenge) => {
        Challenges.deleteMany({
            "_id": {
                $in: challenge.domainesId
            }
        }, function(err) {
            if(err) return next(err);
            Domaines.findByIdAndDelete(req.params.id)
        })
    })
}

exports.domaine_find_byName = async (req,res) =>{

    Domaines.findOne({nom: req.params.nom})
        .exec()
        .then((response)=>{
           response._id
        })
}

exports.domaine_add_picture = async (req,res)=>{
    Domaines.find()
        .then((domaines)=>
        {
            domaines.map(currentDomaine=>{
            translate(currentDomaine.nom, { to: 'en' })
                .then(r => {
                    unsplash.search.photos(r.text,1, 10, { orientation: "landscape"})
                        .then(toJson)
                        .then(json =>
                        {
                            var img=''
                            if(json.results[0].urls.regular)
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
