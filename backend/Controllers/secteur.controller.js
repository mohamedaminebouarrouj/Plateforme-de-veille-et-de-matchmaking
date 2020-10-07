var Secteurs = require('../Models/secteur.model');

exports.secteur_create_post = function (req,res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const categorie = req.body.categorie;

    const newSecteur = new Secteurs({
        nom,
        description,
        categorie,
    });

    Secteurs.create(newSecteur)
        .then(()=> res.json('Secteur ajouté!'))
        .catch(err=> res.status(400).json('Error: '+err))
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