var Tendances= require('../Models/tendance.model');
var Domaines = require('../Models/domaine.model')

exports.tendance_create_post = function (req,res) {
    const nom = req.body.nom;
    const description = req.body.description;
    const fondateur = req.body.fondateur;
    const dateCreation = req.body.dateCreation;
    const logo = req.body.logo;
    const domainesId= req.body.domainesId;

    const newTendance = new Tendances({
        nom,
        description,
        fondateur,
        dateCreation,
        logo,
        domainesId,
    })

    newTendance.save()
        .then(()=> res.json('Tendance ajouté!'))
        .catch(err=> res.status(400).json('Error: '+err))
};

exports.tendances_list = function (req,res) {
    Tendances.find()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f3f0a9a1fbe74c8ba9d3c143212f4ca0');
exports.get_news_domaine = function (req,res){
    const date = new Date()
    const lastMonth = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()

    Domaines.findById(req.params.id)
        .exec()
        .then((response)=>{
            newsapi.v2.everything({
                source: '',
                q: response.nom,
                language:req.params.language,
                from: lastMonth,
                sortBy: 'relevancy'
            }).then(ress => {
                ress.articles.map((currentArticle)=> {
                    const titre = currentArticle.title
                    const contenu = currentArticle.content
                    const datePublication= currentArticle.publishedAt
                    const resume= currentArticle.description
                    const url = currentArticle.url
                    const urlToImage= currentArticle.urlToImage
                    const source = currentArticle.source.name
                    const domainesId = req.params.id

                    const newTendance = new Tendances({
                        titre,
                        contenu,
                        datePublication,
                        resume,
                        url,
                        urlToImage,
                        source,
                        domainesId
                    })

                    newTendance.save()
                        .then((tendance)=> {
                            Domaines.findByIdAndUpdate(tendance.domainesId,
                                    {$push: {tendancesId : tendance._id}},
                                    { new: true , useFindAndModify: false })
                                    .then(() => res.json("Tendances ajouté"))
                            })
                })
            })
        })
}

exports.tendance_update_get = function (req,res) {
    Tendances.find()
        .then(startup => res.json(startup))
        .catch(err => res.status(400).json('Error: '+err));
};