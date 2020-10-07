var Tendances= require('../Models/tendance.model');
var Domaines = require('../Models/domaine.model');
var Challenges =require("../Models/challenge.model");
var Secteurs =require("../Models/secteur.model");

const translate = require('@k3rn31p4nic/google-translate-api');

//newsapi.org
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f3f0a9a1fbe74c8ba9d3c143212f4ca0');

exports.tendances_list = async (req,res) => {
    Tendances.find()
        .then(tendance => res.json(tendance))
        .catch(err => res.status(400).json('Error: '+err));
};



exports.get_news_domaine = async (req,res) => {
    const date = new Date()
    const lastMonth = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()

    Domaines.findById(req.params.id)
        .exec()
        .then((response)=>{
            if (req.params.language==="en")
            {
                translate(response.nom, { to: 'en' }).then(r => {
                    newsapi.v2.everything({
                        source: '',
                        q: r.text,
                        language:req.params.language,
                        from: lastMonth,
                        sortBy: 'relevancy'
                    }).then(ress => {
                        ress.articles.map((currentArticle)=> {
                            if (["TechCrunch","Reuters","Business Insider","The Next Web",'Euronews','BBC News'].includes(currentArticle.source.name)) {
                                const titre = currentArticle.title
                                const contenu = currentArticle.content
                                const datePublication= currentArticle.publishedAt
                                const resume= currentArticle.description
                                const url = currentArticle.url
                                const urlToImage= currentArticle.urlToImage
                                const source = currentArticle.source.name
                                const domaineId = req.params.id
                                const langage= "Anglais"

                                const newTendance = new Tendances({
                                    titre,
                                    contenu,
                                    datePublication,
                                    resume,
                                    url,
                                    urlToImage,
                                    source,
                                    langage,
                                    domaineId
                                })

                                Tendances.create(newTendance)
                                    .then((tendance)=> {
                                        Domaines.findByIdAndUpdate(tendance.domaineId,
                                            {$push: {tendancesId : tendance._id}},
                                            { new: true , useFindAndModify: false })
                                            .then(() => res.json("Tendances ajouté"))
                                    })
                            }
                        })

                    })
                }).catch(err => {
                    console.error(err);
                });
            }
            else if (req.params.language==="ar")
            {
                translate(response.nom, { to: 'ar' }).then(r => {
                    console.log(res.text)
                    newsapi.v2.everything({
                        source: '',
                        q: r.text,
                        language:"ar",
                        from: lastMonth,
                        sortBy: 'relevancy'
                    }).then(ress => {
                        console.log(ress.articles)
                        ress.articles.map((currentArticle)=> {
                            if (['Euronews','BBC News','Electrony.net'].includes(currentArticle.source.name)) {
                                const titre = currentArticle.title
                                const contenu = currentArticle.content
                                const datePublication= currentArticle.publishedAt
                                const resume= currentArticle.description
                                const url = currentArticle.url
                                const urlToImage= currentArticle.urlToImage
                                const source = currentArticle.source.name
                                const domaineId = req.params.id
                                const langage= "Arabe"

                                const newTendance = new Tendances({
                                    titre,
                                    contenu,
                                    datePublication,
                                    resume,
                                    url,
                                    urlToImage,
                                    source,
                                    langage,
                                    domaineId
                                })

                                Tendances.create(newTendance)
                                    .then((tendance)=> {
                                        Domaines.findByIdAndUpdate(tendance.domaineId,
                                            {$push: {tendancesId : tendance._id}},
                                            { new: true , useFindAndModify: false })
                                            .then(() => res.json("Tendances ajouté"))
                                    })
                            }
                        })

                    })
                }).catch(err => {
                    console.error(err);
                });
            }
            else {
                newsapi.v2.everything({
                    source: '',
                    q: response.nom,
                    language: 'fr',
                    from: lastMonth,
                    sortBy: 'relevancy'
                }).then(ress => {
                    ress.articles.map((currentArticle) => {
                        if (['Lefigaro.fr', 'Frandroid', 'Le Monde', "L'Usine Nouvelle", "Clubic", "JDN",'Euronews','BBC News'].includes(currentArticle.source.name)) {
                            const titre = currentArticle.title
                            const contenu = currentArticle.content
                            const datePublication = currentArticle.publishedAt
                            const resume = currentArticle.description
                            const url = currentArticle.url
                            const urlToImage = currentArticle.urlToImage
                            const source = currentArticle.source.name
                            const domaineId = req.params.id
                            const langage = "Français"

                            const newTendance = new Tendances({
                                titre,
                                contenu,
                                datePublication,
                                resume,
                                url,
                                urlToImage,
                                source,
                                langage,
                                domaineId
                            })

                            Tendances.create(newTendance)
                                .then((tendance) => {
                                    Domaines.findByIdAndUpdate(tendance.domaineId,
                                        {$push: {tendancesId: tendance._id}},
                                        {new: true, useFindAndModify: false})
                                        .then(() => res.json("Tendances ajouté"))
                                })
                        }
                    })

                })
            }
        })
}

exports.get_news_challenge = async (req,res) => {
    const date = new Date()
    const lastMonth = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()

    Challenges.findById(req.params.id)
        .exec()
        .then((response)=>{
            if (req.params.language==="en")
            {
                translate(response.nom, { to: 'en' }).then(r => {
                    newsapi.v2.everything({
                        source: '',
                        q: r.text,
                        language:req.params.language,
                        from: lastMonth,
                        sortBy: 'relevancy'
                    }).then(ress => {
                        ress.articles.map((currentArticle)=> {
                            if (["TechCrunch","Reuters","Business Insider","The Next Web",'Euronews','BBC News'].includes(currentArticle.source.name)) {
                                const titre = currentArticle.title
                                const contenu = currentArticle.content
                                const datePublication= currentArticle.publishedAt
                                const resume= currentArticle.description
                                const url = currentArticle.url
                                const urlToImage= currentArticle.urlToImage
                                const source = currentArticle.source.name
                                const challengeId = req.params.id
                                const langage= "Anglais"

                                const newTendance = new Tendances({
                                    titre,
                                    contenu,
                                    datePublication,
                                    resume,
                                    url,
                                    urlToImage,
                                    source,
                                    langage,
                                    challengeId
                                })

                                Tendances.create(newTendance)
                                    .then((tendance)=> {
                                        Challenges.findByIdAndUpdate(tendance.challengeId,
                                            {$push: {tendancesId : tendance._id}},
                                            { new: true , useFindAndModify: false })
                                            .then(() => res.json("Tendances ajouté"))
                                    })
                            }
                        })

                    })
                }).catch(err => {
                    console.error(err);
                });
            }
            else if (req.params.language==="ar")
            {
                translate(response.nom, { to: 'ar' }).then(r => {
                    newsapi.v2.everything({
                        source: '',
                        q: r.text,
                        language:"ar",
                        from: lastMonth,
                        sortBy: 'relevancy'
                    }).then(ress => {
                        console.log(ress.articles)
                        ress.articles.map((currentArticle)=> {
                            if (['Euronews','BBC News','Electrony.net'].includes(currentArticle.source.name)) {
                                const titre = currentArticle.title
                                const contenu = currentArticle.content
                                const datePublication= currentArticle.publishedAt
                                const resume= currentArticle.description
                                const url = currentArticle.url
                                const urlToImage= currentArticle.urlToImage
                                const source = currentArticle.source.name
                                const challengeId = req.params.id
                                const langage= "Arabe"

                                const newTendance = new Tendances({
                                    titre,
                                    contenu,
                                    datePublication,
                                    resume,
                                    url,
                                    urlToImage,
                                    source,
                                    langage,
                                    challengeId
                                })

                                Tendances.create(newTendance)
                                    .then((tendance)=> {
                                        Challenges.findByIdAndUpdate(tendance.challengeId,
                                            {$push: {tendancesId : tendance._id}},
                                            { new: true , useFindAndModify: false })
                                            .then(() => res.json("Tendances ajouté"))
                                    })
                            }
                        })

                    })
                }).catch(err => {
                    console.error(err);
                });
            }
            else {
                newsapi.v2.everything({
                    source: '',
                    q: response.nom,
                    language: 'fr',
                    from: lastMonth,
                    sortBy: 'relevancy'
                }).then(ress => {
                    ress.articles.map((currentArticle) => {
                        if (['Lefigaro.fr', 'Frandroid', 'Le Monde', "L'Usine Nouvelle", "Clubic", "JDN",'Euronews','BBC News'].includes(currentArticle.source.name)) {
                            const titre = currentArticle.title
                            const contenu = currentArticle.content
                            const datePublication = currentArticle.publishedAt
                            const resume = currentArticle.description
                            const url = currentArticle.url
                            const urlToImage = currentArticle.urlToImage
                            const source = currentArticle.source.name
                            const challengeId = req.params.id
                            const langage = "Français"

                            const newTendance = new Tendances({
                                titre,
                                contenu,
                                datePublication,
                                resume,
                                url,
                                urlToImage,
                                source,
                                langage,
                                challengeId
                            })

                            Tendances.create(newTendance)
                                .then((tendance) => {
                                    Challenges.findByIdAndUpdate(tendance.challengeId,
                                        {$push: {tendancesId: tendance._id}},
                                        {new: true, useFindAndModify: false})
                                        .then(() => res.json("Tendances ajouté"))
                                })
                        }
                    })

                })
            }
        })
}

exports.get_news_secteur = async (req,res) => {
    const date = new Date()
    const lastMonth = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()

    Secteurs.findById(req.params.id)
        .exec()
        .then((response)=>{
            if (req.params.language==="en")
            {

                translate(response.nom, { to: 'en' }).then(r => {
                    newsapi.v2.everything({
                        source: '',
                        q: r.text,
                        language:req.params.language,
                        from: lastMonth,
                        sortBy: 'relevancy'
                    }).then(ress => {
                        ress.articles.map((currentArticle)=> {
                            if (["TechCrunch","Reuters","Business Insider","The Next Web",'Euronews','BBC News'].includes(currentArticle.source.name)) {
                                const titre = currentArticle.title
                                const contenu = currentArticle.content
                                const datePublication= currentArticle.publishedAt
                                const resume= currentArticle.description
                                const url = currentArticle.url
                                const urlToImage= currentArticle.urlToImage
                                const source = currentArticle.source.name
                                const secteurId = req.params.id
                                const langage= "Anglais"

                                const newTendance = new Tendances({
                                    titre,
                                    contenu,
                                    datePublication,
                                    resume,
                                    url,
                                    urlToImage,
                                    source,
                                    langage,
                                    secteurId
                                })

                                Tendances.create(newTendance)
                                    .then((tendance)=> {
                                        Secteurs.findByIdAndUpdate(tendance.secteurId,
                                            {$push: {tendancesId : tendance._id}},
                                            { new: true , useFindAndModify: false })
                                            .then(() => res.json("Tendances ajouté"))
                                    })
                            }
                        })

                    })
                }).catch(err => {
                    console.error(err);
                });
            }
            else if (req.params.language==="ar")
            {
                translate(response.nom, { to: 'ar' }).then(r => {
                    console.log(res.text)
                    newsapi.v2.everything({
                        source: '',
                        q: r.text,
                        language:"ar",
                        from: lastMonth,
                        sortBy: 'relevancy'
                    }).then(ress => {
                        console.log(ress.articles)
                        ress.articles.map((currentArticle)=> {
                            if (['Euronews','BBC News','Electrony.net'].includes(currentArticle.source.name)) {
                                const titre = currentArticle.title
                                const contenu = currentArticle.content
                                const datePublication= currentArticle.publishedAt
                                const resume= currentArticle.description
                                const url = currentArticle.url
                                const urlToImage= currentArticle.urlToImage
                                const source = currentArticle.source.name
                                const secteurId = req.params.id
                                const langage= "Arabe"

                                const newTendance = new Tendances({
                                    titre,
                                    contenu,
                                    datePublication,
                                    resume,
                                    url,
                                    urlToImage,
                                    source,
                                    langage,
                                    secteurId
                                })

                                Tendances.create(newTendance)
                                    .then((tendance)=> {
                                        Secteurs.findByIdAndUpdate(tendance.secteurId,
                                            {$push: {tendancesId : tendance._id}},
                                            { new: true , useFindAndModify: false })
                                            .then(() => res.json("Tendances ajouté"))
                                    })
                            }
                        })

                    })
                }).catch(err => {
                    console.error(err);
                });
            }
            else {
                newsapi.v2.everything({
                    source: '',
                    q: response.nom,
                    language: 'fr',
                    from: lastMonth,
                    sortBy: 'relevancy'
                }).then(ress => {
                    console.log(ress)
                    ress.articles.map((currentArticle) => {
                        if (['Lefigaro.fr', 'Frandroid', 'Le Monde','Les Echos', "L'Usine Nouvelle", "Clubic", "JDN",'Euronews','BBC News','Sciences et Avenir'].includes(currentArticle.source.name)) {
                            const titre = currentArticle.title
                            const contenu = currentArticle.content
                            const datePublication = currentArticle.publishedAt
                            const resume = currentArticle.description
                            const url = currentArticle.url
                            const urlToImage = currentArticle.urlToImage
                            const source = currentArticle.source.name
                            const secteurId = req.params.id
                            const langage = "Français"

                            const newTendance = new Tendances({
                                titre,
                                contenu,
                                datePublication,
                                resume,
                                url,
                                urlToImage,
                                source,
                                langage,
                                secteurId
                            })

                            Tendances.create(newTendance)
                                .then((tendance) => {
                                    Secteurs.findByIdAndUpdate(tendance.secteurId,
                                        {$push: {tendancesId: tendance._id}},
                                        {new: true, useFindAndModify: false})
                                        .then(() => res.json("Tendances ajouté"))
                                })
                        }
                    })

                })
            }
        })
}


exports.tendance_delete = function (req,res){
    Tendances.findByIdAndDelete(req.params.id)
        .then((tendance)=> {
            Domaines.findByIdAndUpdate(tendance.domaineId,
                    {$pull: {tendancesId : tendance._id}},
                    { new: true , useFindAndModify: false })
                    .then()
            Challenges.findByIdAndUpdate(tendance.challengeId,
                {$pull: {tendancesId : tendance._id}},
                { new: true , useFindAndModify: false })
                .then()

            })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.tendance_update_post= function (req,res){
    Tendances.findById(req.params.id)
        .then(tendance => {
            tendance.titre = req.body.titre;
            tendance.resume = req.body.resume;

            tendance.save()
                .then(() => res.json('Tendance updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.tendance_find = function (req,res){
    Tendances.findById(req.params.id)
        .then(tendance => res.json(tendance))
        .catch(err => res.status(400).json('Error: ' + err));
}