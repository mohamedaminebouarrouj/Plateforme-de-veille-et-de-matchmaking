import bs4 as bs
import urllib.request
from urllib.parse import urlparse
import pandas as pd
import re
import json
import pymongo
from datetime import datetime
import qwant
from unidecode import unidecode
import time


###Get "domaines" wiki urls from qwant.com
def wiki_url_qwant(tech):
    print(tech)

    try:
        url=qwant.items("site: wikipedia.org/ "+tech)[0]['url']

    except:
        print('Check qwant.com to remove Captcha')
        time.sleep(30)
        url=qwant.items("site: wikipedia.org/ "+tech)[0]['url']

    return url

#Get description of "domaines" from wiki
def get_description(url):
    print(url)
    desc=''
    try:
        scraped_data = urllib.request.urlopen(url)
    except:
        print('Wait a little bit')
        time.sleep(5)
        scraped_data = urllib.request.urlopen(url)

    article = scraped_data.read()
    parsed_article = bs.BeautifulSoup(article,'lxml')
    try:
        parsed_article.find('div', class_='bandeau-container bandeau-article bandeau-niveau-modere plainlinks bandeau-container metadata ambox').decompose()
    except:
        pass
    try:
        parsed_article.find('div',class_='bandeau-container bandeau-article bandeau-niveau-ebauche plainlinks bandeau-container metadata ambox').decompose()
    except:
        pass
    try:
        parsed_article.find('div',class_='bandeau-container bandeau-article bandeau-niveau-grave plainlinks bandeau-container metadata ambox').decompose()
    except:
        pass

    paragraphs = parsed_article.find_all('p',class_="")

    for i in range(len(paragraphs)):
        if i<2:
            desc+=paragraphs[i].text

    return unidecode(re.sub(r"[\[\]\b\d+\b]",'',desc.replace('\n','')))


#Change date format
def changeDate(date):
    mois=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
    for i in range(len(mois)):
        if mois[i] in date:
            return((str(i+1)+'-'+date.split(mois[i])[1]).replace(' ',''))

def create_dict_domaineTochall():
    colDomaineToChall=db.domtochall
    df_match= pd.DataFrame(list(colDomaineToChall.find()))

    return {list(df_match['Secteur startup act'])[i]: list(df_match['Challenge finale'])[i] for i in range(len(list(df_match['Secteur startup act'])))}

def create_dict_categorieChall():
    colCategorieChall=db.categoriechall
    df= pd.DataFrame(list(colCategorieChall.find()))

    return {list(df['Challenge'])[i]: list(df['Famille challenge'])[i] for i in range(len(list(df['Famille challenge'])))}

def scrap_startups_act():
    names=[]
    descriptions=[]
    fondateurs=[]
    date_creation=[]
    pays=[]
    adresse=[]
    logo=[]
    siteWeb=[]
    email=[]
    facebook=[]
    twitter=[]
    linkedin=[]
    domaines=[]
    challenges=[]
    domainesId=[]
    challengesId=[]
    dic=create_dict_domaineTochall()
    i=0
    scraped_data = urllib.request.urlopen('https://www.startupact.tn/startups.html')
    article = scraped_data.read()
    parsed_article = bs.BeautifulSoup(article,'lxml')
    startups_table = parsed_article.find_all('tbody')

    for s in startups_table:
        for n in s.find_all('td'):
            if (i==0):
                descriptions.append(n.get_text(separator=" ").split('Site web:')[0].strip())
                if 'Site web' in n.get_text(separator=" "):
                    siteWeb.append(n.get_text(separator=" ").split('Site web:')[1].strip().split(' ')[0])
                else:
                    siteWeb.append('')
            if(i==1):
                fondateurs.append( [f.split('  ')[-1] for f in (n.get_text(separator=" S ").strip()).split(' S ')])
            if(i==2):
                domaines.append(n.get_text(separator=" ").strip()
                                .replace('Industrie Robotique','Robotique')
                                .replace('FoodTech & New Food','Foodtech & new food')
                                .replace('HealthTech',"Health tech")
                                .replace('Healthtech',"Health tech")
                                .replace('Santé',"Health tech")

                                .replace('Cybersecurité','Cyber Securité')

                                .replace('Ecommerce','E-commerce')
                                .replace('ECommerce','E-commerce')
                                .replace("EComerce","E-commerce")

                                .replace("HR","Ressources Humaines")

                                .replace('AI','Intelligence Artificielle')

                                .replace("Logistqiue","Logistique")

                                .replace("Télécoms","Télécom")
                                .replace("Telecom","Télécom")

                                .replace("EdtTech",'Edtech')
                                .replace('Edtech',"Edtech")

                                .replace("Blockchain & cryptocurrency","Blockchain & Cryptocurrency")
                                .replace('Blockchain & Cryptocurrency','Blockchain & Cryptocurrency')
                                .replace("Cryptocurrency & Blockchain","Blockchain & Cryptocurrency")

                                .replace('Biotechnologie','Biotech')
                                .replace('Biotech','Biotechnologie')
                                .replace('BioTech','Biotechnologie')

                                .replace('Gaming','Jeux vidéos')

                                .replace('Cleantech','Technologie environnementale')

                                .replace('Agritech','Technologie agricole')
                                .capitalize())
                i=-1
            i+=1

        for i in range(len(s.find_all('th',scope="row"))):
            if s.find_all('th',scope="row")[i].find('img'):
                if s.find_all('th',scope="row")[i].find('img').get('src'):
                    img=s.find_all('th',scope="row")[i].find('img').get('src').split('img/')[-1].split('.')[0]
                    if len(re.split('[0-9]+-',img))>1:
                        names.append(re.split('[0-9]+-',img)[1].replace('-',' ').strip().capitalize())
                        logo.append(re.split('[0-9]+-',img)[1].strip().capitalize()+'.png')
                    else:
                        names.append(img.capitalize())
                        logo.append(img.strip().capitalize()+'.png')
                else:
                    names.append(descriptions[i].split(' ')[0])
                    logo.append('default.png')
            else:
                names.append(descriptions[i].split(' ')[0])
                logo.append('default.png')

        for n in s.find_all('th',scope=""):
            if(n.get_text()):
                date_creation.append(re.sub('[^0-9,-]', "",changeDate(n.get_text())))
            else:
                date_creation.append(date_creation[-1])
            domainesId.append([])
            challengesId.append([])
            pays.append('Tunisie')
            email.append('')
            adresse.append('')
            facebook.append('https://www.facebook.com')
            linkedin.append('https://www.linkedin.com')
            twitter.append('https://www.twitter.com')

        for i in range(len(date_creation)):
            date_creation[i]=datetime.strptime(date_creation[i], '%m-%Y')
            if (domaines[i]!=''):
                challenges.append(dic[domaines[i]])
            else:
                challenges.append('')

    df_startups=pd.DataFrame(list(zip(names,descriptions,fondateurs,pays,adresse,domaines,challenges,siteWeb,email,facebook,linkedin,twitter,domainesId,challengesId,date_creation,logo)),
                            columns =['nom','description','fondateurs','pays','adresse','domaines','challenges','siteWeb','email','facebook','linkedin','twitter','domainesId','challengesId','dateCreation','logo'])

    return df_startups


def create_domaines(data):
    secteursId=[]
    startupsId=[]
    challengesId=[]
    tendancesId=[]
    description=[]
    categorie=[]
    img=[]
    __v=[]
    nom=[]
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client['dbInnoseer']
    colDomaines=db.domaines
    temp=[]

    for doc in colDomaines.find({}):
        temp.append(doc.get('nom').lower())

    for i in range(len(data['domaines'].unique())):
        if data['domaines'].unique()[i]!="":
            if (data['domaines'].unique()[i]).lower() not in temp:
                nom.append(data['domaines'].unique()[i])
                description.append(get_description(wiki_url_qwant(data['domaines'].unique()[i])))
                secteursId.append([])
                startupsId.append([])
                challengesId.append([])
                tendancesId.append([])
                categorie.append('')
                img.append('')
                __v.append(0)

    df_domaines = pd.DataFrame(list(zip(__v,nom,description,categorie,secteursId,startupsId,challengesId,tendancesId,img)),
                                columns =['__v','nom','description','categorie','secteursId','startupsId','challengesId','tendancesId','img'])

    return df_domaines

def create_challenges(data):

    secteursId=[]
    startupsId=[]
    tendancesId=[]
    description=[]
    categorie=[]
    img=[]
    __v=[]
    nom=[]
    dic=create_dict_categorieChall()
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client['dbInnoseer']
    colChallenges=db.challenges
    temp=[]

    for doc in colChallenges.find({}):
        temp.append(doc.get('nom').lower())

    for i in range(len(data['challenges'].unique())):
        if data['challenges'].unique()[i]!="":
            if (data['challenges'].unique()[i]).lower() not in temp:
                nom.append(data['challenges'].unique()[i])
                description.append(get_description(wiki_url_qwant(data['challenges'].unique()[i])))
                secteursId.append([])
                startupsId.append([])
                tendancesId.append([])
                categorie.append(dic[data['challenges'].unique()[i]])
                img.append('')
                __v.append(0)

    df_challenges = pd.DataFrame(list(zip(__v,nom,description,categorie,secteursId,startupsId,tendancesId,img)),
                                columns =['__v','nom','description','categorie','secteursId','startupsId','tendancesId','img'])

    return df_challenges


if __name__ == "__main__":
    ####Connection to DB
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client['dbInnoseer']
    colDomaines=db.domaines
    colStartups=db.startups
    colChallenges=db.challenges

    df_startups = scrap_startups_act()
    df_domaines = create_domaines(df_startups)
    df_challenges = create_challenges(df_startups)

    colDomaines.create_index([('nom', pymongo.ASCENDING)],unique=True)
    records = json.loads(df_domaines.T.to_json()).values()
    print(len(df_startups))

    try:
        colDomaines.insert_many(records)
    except:
        print('Domaines déjà ajouté')

    colChallenges.create_index([('nom', pymongo.ASCENDING)],unique=True)
    records = json.loads(df_challenges.T.to_json()).values()

    try:
        colChallenges.insert_many(records)
    except:
        print('Challenges déjà ajouté')

    df_challenges = pd.DataFrame(list(colChallenges.find()))
    df_domaines = pd.DataFrame(list(colDomaines.find()))

    for i in range(len(df_domaines)):
        for j in range(len(df_startups)):
            if df_startups['domaines'][j]==df_domaines['nom'][i]:
                df_startups['domainesId'][j].append(df_domaines['_id'][i])

    for i in range(len(df_challenges)):
            for j in range(len(df_startups)):
                if df_startups['challenges'][j]==df_challenges['nom'][i]:
                    df_startups['challengesId'][j].append(df_challenges['_id'][i])

    df_startups.drop(columns='domaines',inplace=True)
    df_startups.drop(columns='challenges',inplace=True)


    colStartups.create_index([('nom', pymongo.ASCENDING)],unique=True)
    records = df_startups.to_dict('records')
    try:
        colStartups.insert_many(records,ordered=False)

        df_startups = pd.DataFrame(list(colStartups.find()))

        for i in range(len(df_domaines)):
            for j in range(len(df_startups)):
                for k in range(len(df_startups['domainesId'][j])):
                    if df_startups['domainesId'][j][k]==df_domaines['_id'][i]:
                        df_domaines['startupsId'][i].append(df_startups['_id'][j])

        for i in range(len(df_challenges)):
            for j in range(len(df_startups)):
                for k in range(len(df_startups['challengesId'][j])):
                    if df_startups['challengesId'][j][k]==df_challenges['_id'][i]:
                        df_challenges['startupsId'][i].append(df_startups['_id'][j])

        colDomaines.delete_many({})
        colChallenges.delete_many({})

        colDomaines.insert_many(df_domaines.to_dict('records'))
        colChallenges.insert_many(df_challenges.to_dict('records'))
        print("Startups ajoutées")

    except:
        print("Startups déjà ajoutées")