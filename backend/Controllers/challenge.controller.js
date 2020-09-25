var Challenges= require('../Models/challenge.model');

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
        .then(()=> res.json('Challenge ajouté!'))
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.challenge_list = function (req,res) {
    Challenges.find()
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.challenge_update_get = function (req,res) {
    Challenges.find()
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
        .then(() => res.json('Challenge deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}