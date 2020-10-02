var Challenges= require('../Models/challenge.model');
var Domaines =require('../Models/domaine.model');
exports.challenge_create_post = function (req,res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const type = req.body.type;
    const domainesId= req.body.domainesId;

    const newChallenge = new Challenges({
        nom,
        description,
        type,
        domainesId,
    })

    newChallenge.save()
        .then((challenge)=> {
            challenge.domainesId.map((domId)=>{
                Domaines.findByIdAndUpdate(domId,
                    {$push: {challengesId : challenge._id}},
                    { new: true , useFindAndModify: false})
                    .then((domaine)=>res.json(domaine))
            })

        })
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.challenge_list = function (req,res) {
    Challenges.find()
        .populate({
            path: 'domainesId',
            model: 'Domaine',
            populate : {
                path:'secteursId',
                model: 'Secteur',
                populate:{
                    path: 'startupId',
                    model:'Startup'
                }
            },

        })
        .exec()
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.challenge_update_post= function (req,res){
    Challenges.findById(req.params.id)
        .then(challenge => {
            challenge.nom = req.body.nom;
            challenge.description = req.body.description;
            challenge.type = req.body.type;
            challenge.domainesId= req.body.domainesId;

            challenge.save()
                .then(() => res.json('Secteur updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.challenge_find = function (req,res){
    Challenges.findById(req.params.id)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.challenge_delete = function (req,res){
    Challenges.findByIdAndDelete(req.params.id)
        .then((challenge)=> {
            challenge.domainesId.map((domId)=>{
                Domaines.findByIdAndUpdate(domId,
                    {$pull: {challengesId : domId._id}},
                    { new: true , useFindAndModify: false })
                    .then()
            })

        })
        .catch(err => res.status(400).json('Error: ' + err));
}