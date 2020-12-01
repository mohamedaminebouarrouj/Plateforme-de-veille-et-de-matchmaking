var Challenges= require('../Models/challenge.model');
var Secteurs =require('../Models/domaine.model');
var Startups = require('../Models/startup.model');
var Tendances = require('../Models/tendance.model');

const translate = require('@k3rn31p4nic/google-translate-api');
const fetch = require('node-fetch');
global.fetch = fetch;

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const APP_ACCESS_KEY = 'w4cwJK1-Trq5L4sDHOraWA-1LgFjp88Plis7ShcHrgE'

const unsplash = new Unsplash({accessKey: APP_ACCESS_KEY});

exports.challenge_create_post = function (req,res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const categorie = req.body.categorie;
    const secteursId= req.body.secteursId;

    const newChallenge = new Challenges({
        nom,
        description,
        categorie,
        secteursId,
    })

    Challenges.create(newChallenge)
        .then((challenge)=> {
            challenge.secteursId.map((secId)=>{
                Secteurs.findByIdAndUpdate(secId,
                    {$push: {challengesId : challenge._id}},
                    { new: true , useFindAndModify: false})
                    .then((c)=>res.json(c))
            })

        })
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.challenge_list = function (req,res) {
    Challenges.find()
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
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.challenge_findUpdate = function (req, res) {
    Challenges.findById(req.params.id)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.challenge_update_post= function (req,res){
    Challenges.findById(req.params.id)
        .then(challenge => {
            const diffPull= challenge.secteursId.filter(x => ! req.body.secteursId.includes(x))

            if (diffPull.length>0)
            {
                diffPull.map(d=>{
                    Secteurs.findByIdAndUpdate(d,
                        {$pull: {challengesId : challenge._id}},
                        { new: true, useFindAndModify: false })
                        .then()

                })
            }

            challenge.nom = req.body.nom;
            challenge.description = req.body.description;
            challenge.secteursId=req.body.secteursId;

            challenge.secteursId.map(sect=>{
                Secteurs.findById(sect)
                    .then(secteur=>{
                        if (!secteur.challengesId.includes(challenge._id))
                        {
                            Secteurs.findByIdAndUpdate(sect,
                                {$push: {challengesId : challenge._id}},
                                { new: true, useFindAndModify: false })
                                .then()
                        }
                    })

            })
            challenge.save()
                .then(() => res.json('Challenge updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.challenge_find = function (req,res){
    Challenges.findById(req.params.id)
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
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.challenge_delete = function (req,res){
    Challenges.findByIdAndDelete(req.params.id)
        .then((challenge)=> {
            challenge.secteursId.map((secId)=>{
                Secteurs.findByIdAndUpdate(secId,
                    {$pull: {challengesId : secId._id}},
                    { new: true , useFindAndModify: false })
                    .then()
            })
            challenge.startupsId.map((startId) => {
                Startups.findByIdAndUpdate(startId,
                    {$pull: {domainesId: domaine._id}},
                    {new: true, useFindAndModify: false})
                    .then()
            })

            challenge.tendancesId.map((tendId) => {
                Tendances.findByIdAndDelete(tendId, function (err, docs) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("");
                    }
                })
            })

        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.challenge_add_picture = async (req, res) => {
    Challenges.find()
        .then((challenges) => {
            challenges.map(currentChallenge => {
                translate(currentChallenge.nom, {to: 'en'})
                    .then(r => {
                        unsplash.search.photos(r.text, 1, 10, {orientation: "landscape"})
                            .then(toJson)
                            .then(json => {
                                var img = ''
                                if (json.results[0])
                                    img = json.results[0].urls.regular

                                Challenges.findByIdAndUpdate(currentChallenge._id,
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