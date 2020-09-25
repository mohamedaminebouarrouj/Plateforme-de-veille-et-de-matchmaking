var Domaines= require('../Models/domaine.model');
var Challenges= require('../Models/challenge.model');

exports.domaine_create_post = function (req,res) {
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

    newDomaine.save()
        .then(()=> res.json('Domaine ajouté!'))
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.domaine_list = function (req,res) {
    Domaines.find()
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
            domaine.nom = req.body.nom;
            domaine.description = req.body.description;
            domaine.secteursId=req.body.secteursId;
            domaine.categorie = req.body.categorie;

            domaine.save()
                .then(() => res.json('Secteur updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.domaine_find = function (req,res){
    Domaines.findById(req.params.id)
        .then(domaine => res.json(domaine))
        .catch(err => res.status(400).json('Error: ' + err));
}

/*exports.domaine_delete = function (req,res){
    Domaines.findByIdAndDelete(req.params.id)
        .then(() => res.json('Domaine deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}
*/
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