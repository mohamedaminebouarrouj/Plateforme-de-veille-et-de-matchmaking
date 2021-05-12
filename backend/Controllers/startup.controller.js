var Secteurs = require('../Models/secteur.model')
var Startups = require('../Models/startup.model');
var Domaines = require('../Models/domaine.model');
var Challanges = require('../Models/challenge.model');
const upload = require("../middleware/upload");
const path = require('path')
const {spawn} = require('child_process');
var DomainesController = require("../Controllers/domaine.controller")
var ChallengesController = require('../Controllers/challenge.controller')


exports.startup_create_post = function (req, res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const fondateurs = req.body.fondateurs;
    const dateCreation = Date.parse(req.body.dateCreation);
    const logo = req.body.logo;
    const domainesId = req.body.domainesId;
    const challengesId = req.body.challengesId
    const siteWeb = req.body.siteWeb
    const pays= req.body.pays

    const newStartup = new Startups({
        nom,
        description,
        fondateurs,
        dateCreation,
        pays,
        logo,
        domainesId,
        challengesId,
        siteWeb
    })

    Startups.create(newStartup)
        .then((startup) => {
            startup.domainesId.map((domId) => {
                Domaines.findByIdAndUpdate(domId,
                    {$push: {startupsId: startup._id}},
                    {new: true, useFindAndModify: false})
                    .then()
            })
            startup.challengesId.map((challId) => {
                Challanges.findByIdAndUpdate(challId,
                    {$push: {startupsId: startup._id}},
                    {new: true, useFindAndModify: false})
                    .then()
            })

        })
        .catch(err => res.status(400).json('Error: ' + err))
};

exports.startup_list = function (req, res) {
    Startups.find()
        .populate({
            path: 'domainesId',
            model: 'Domaine',
        })
        .populate({
            path: 'challengesId',
            model: 'Challenge',
        })
        .exec()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: ' + err));
};


exports.startup_update_post = function (req, res) {
    Startups.findById(req.params.id)
        .then(startup => {

            const diffPull = startup.domainesId.filter(x => !req.body.domainesId.includes(x))

            if (diffPull.length > 0) {
                diffPull.map(d => {
                    Domaines.findByIdAndUpdate(d,
                        {$pull: {startupsId: startup._id}},
                        {new: true, useFindAndModify: false})
                        .then()

                })
            }

            const diffPullChall = startup.challengesId.filter(x => !req.body.challengesId.includes(x))

            if (diffPullChall.length > 0) {
                diffPullChall.map(d => {
                    Challanges.findByIdAndUpdate(d,
                        {$pull: {startupsId: startup._id}},
                        {new: true, useFindAndModify: false})
                        .then()

                })
            }

            startup.nom = req.body.nom;
            startup.description = req.body.description;
            startup.logo = req.body.logo;
            startup.domainesId = req.body.domainesId;
            startup.challengesId = req.body.challengesId;

            startup.domainesId.map((domId) => {
                Domaines.findById(domId)
                    .then(domaine => {
                        if (!domaine.startupsId.includes(startup._id)) {
                            Domaines.findByIdAndUpdate(domaine._id,
                                {$push: {startupsId: startup._id}},
                                {new: true, useFindAndModify: false})
                                .then()
                        }
                    })
            })

            startup.challengesId.map((challId) => {
                Challanges.findById(challId)
                    .then(challenge => {
                        if (!challenge.startupsId.includes(startup._id)) {
                            Challanges.findByIdAndUpdate(challenge._id,
                                {$push: {startupsId: startup._id}},
                                {new: true, useFindAndModify: false})
                                .then()
                        }
                    })
            })

            startup.save()
                .then(() => res.json('Startup updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.startup_update_post_user = function (req, res) {
    Startups.findById(req.params.id)
        .then(startup => {
            startup.nom = req.body.nom;
            startup.description = req.body.description;
            startup.adresse = req.body.adresse;
            startup.email = req.body.email;
            startup.siteWeb = req.body.siteWeb;
            startup.facebook = req.body.facebook;
            startup.linkedin = req.body.linkedin;
            startup.twitter = req.body.twitter;

            startup.save()
                .then(() => res.json('Startup updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.startup_find = function (req, res) {
    Startups.findById(req.params.id)
        .populate({
            path: 'domainesId',
            model: 'Domaine',
        })
        .populate({
            path: 'challengesId',
            model: 'Challenge',
        })
        .exec()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.startup_list_pagination = function (req, res) {
    const pagination = req.body.pagination ? parseInt(req.body.pagination) : 10;
    //PageNumber From which Page to Start
    const pageNumber = req.body.page ? parseInt(req.body.page) : 1;
    Startups.find()
        .sort({"nom": 1})
        .skip((pageNumber - 1) * pagination)
        //limit is number of Records we want to display
        .limit(pagination)
        .populate({
            path: 'domainesId',
            model: 'Domaine',
        })
        .populate({
            path: 'challengesId',
            model: 'Challenge',
        })
        .exec()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.startup_delete = function (req, res) {
    Startups.findByIdAndDelete(req.params.id)
        .then((startup) => {
            startup.domainesId.map((domId) => {
                Domaines.findByIdAndUpdate(domId,
                    {$pull: {startupsId: startup._id}},
                    {new: true, useFindAndModify: false})
                    .then()
            })

            startup.challengesId.map((challId) => {
                Challanges.findByIdAndUpdate(challId,
                    {$pull: {startupsId: startup._id}},
                    {new: true, useFindAndModify: false})
                    .then()
            })

        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.upload_logo = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.files);

        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }

        return res.status(200).json({
            file: req.files
        })

    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
    }
}

exports.startup_find_name = async (req, res) => {
    Startups.find({'nom': new RegExp("^" + req.params.nom, 'i')}, function (err, docs) {
        res.json(docs)
    });
}

exports.startup_scraping = async (req, res) => {
    const subprocess = runScript()
// print output of script
    subprocess.stdout.on('data', (data) => {
        console.log(`${data}`);
        DomainesController.domaine_add_picture(req, res);
        ChallengesController.challenge_add_picture(req, res);
        res.send(`${data}`);

    });
    subprocess.stderr.on('data', (data) => {
        console.log(`error:${data}`);
    });
    subprocess.stderr.on('close', () => {
        console.log("Closed");
    });

}

function runScript() {
    return spawn('python', [
        path.join(__dirname, 'scraping.py')
    ])
}