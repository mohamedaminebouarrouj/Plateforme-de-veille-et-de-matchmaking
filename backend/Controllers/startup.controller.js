var Startups= require('../Models/startup.model');

exports.startup_create_post = function (req,res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const fondateurs = req.body.fondateurs;
    const dateCreation = Date.parse(req.body.dateCreation);
    const logo = req.body.logo;
    const domainesId= req.body.domainesId;

    const newStartup = new Startups({
        nom,
        description,
        fondateurs,
        dateCreation,
        logo,
        domainesId,
    })

    newStartup.save()
        .then(()=> res.json('Startup ajouté!'))
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.startup_list = function (req,res) {
    Startups.find()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.startup_update_get = function (req,res) {
    Startups.find()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.startup_update_post= function (req,res){
    Startups.findById(req.params.id)
        .then(startup => {
            startup.nom = req.body.nom;
            startup.description = req.body.description;
            startup.fondateurs = req.body.fondateurs;
            startup.dateCreation = Date.parse(req.body.dateCreation);
            startup.logo = req.body.logo;
            startup.domainesId= req.body.domainesId;

            startup.save()
                .then(() => res.json('Startup updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.startup_find = function (req,res){
    Startups.findById(req.params.id)
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.startup_delete = function (req,res){
    Startups.findByIdAndDelete(req.params.id)
        .then(() => res.json('Startup deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}