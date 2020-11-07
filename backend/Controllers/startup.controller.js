var Secteurs=require('../Models/secteur.model')
var Startups= require('../Models/startup.model');
var Domaines =require('../Models/domaine.model');
const upload = require("../middleware/upload");
const path = require('path')
const {spawn} = require('child_process');



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

    Startups.create(newStartup)
        .then((startup)=> {
            startup.domainesId.map((domId)=>{
                Domaines.findByIdAndUpdate(domId,
                    {$push: {startupsId : startup._id}},
                    { new: true , useFindAndModify: false })
                    .then()
            })

        })
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.startup_list = function (req,res) {
    Startups.find()
        .populate({
            path: 'domainesId',
            model: 'Domaine',
            populate : {
                path:'secteursId',
                model: 'Secteur'
            }
        })
        .exec()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};


exports.startup_update_post= function (req,res){
    Startups.findById(req.params.id)
        .then(startup => {

            const diffPull= startup.domainesId.filter(x => ! req.body.domainesId.includes(x))

            if (diffPull.length>0)
            {
                diffPull.map(d=>{
                    Domaines.findByIdAndUpdate(d,
                        {$pull: {startupsId : startup._id}},
                        { new: true, useFindAndModify: false })
                        .then()

                })
            }

            startup.nom = req.body.nom;
            startup.description = req.body.description;
            startup.logo = req.body.logo;
            startup.domainesId= req.body.domainesId;

            startup.domainesId.map((domId)=>{
                Domaines.findById(domId)
                    .then(domaine=>{
                        if (!domaine.domainesId.includes(startup._id))
                        {
                            Secteurs.findByIdAndUpdate(sect,
                                {$push: {startupsId : startup._id}},
                                { new: true, useFindAndModify: false })
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

exports.startup_find = function (req,res){
    Startups.findById(req.params.id)
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.startup_delete = function (req,res){
    Startups.findByIdAndDelete(req.params.id)
        .then((startup)=> {
            startup.domainesId.map((domId)=>{
                Domaines.findByIdAndUpdate(domId,
                    {$pull: {startupsId : domId._id}},
                    { new: true , useFindAndModify: false })
                    .then()
            })

        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.upload_logo = async (req,res) =>{
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

exports.startup_scraping =async (req,res) =>{
    const subprocess = runScript()
// print output of script
    subprocess.stdout.on('data', (data) => {
        console.log(`${data}`);
        res.send(`${data}`);

    });
    subprocess.stderr.on('data', (data) => {
        console.log(`error:${data}`);
    });
    subprocess.stderr.on('close', () => {
        console.log("Closed");
    });

}

function runScript(){
   return spawn('python', [
        path.join(__dirname, 'scraping.py')
    ])
}