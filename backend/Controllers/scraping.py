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


###Get "domaines" wiki urls from qwant.com
def wiki_url_qwant(tech):
    print(tech)

    try:
        url=qwant.items("site: wikipedia.org/ "+tech)[0]['url']

    except:
        print('Check qwant.com to remove Captcha')
        input('Press any key')
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
        input('Press any key')
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


def scrap_startups_act():
    names=[]
    descriptions=[]
    siteWeb=[]
    fondateurs=[]
    domaines=[]
    date_creation=[]
    domainesId=[]
    logo=[]
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
                                .replace('Industrie robotique','Robotique')
                                .replace('Healthtech',"Health tech")
                                .replace('Cybersecurité','Cyber Securité')
                                .replace('Ecommerce','E-commerce')
                                .replace('ECommerce','E-commerce')
                                .replace("EComerce","E-commerce")

                                .replace("HR","Ressources Humaines")

                                .replace('AI','Intelligence Artificielle')

                                .replace("Logistqiue","Logistique")

                                .replace("Télécoms","Télécomunication")
                                .replace("Telecom","Télécomunication")

                                .replace("IT","Information technology")
                                .replace('Information technology',"Technologies de l'information et de la communication")

                                .replace("EdtTech",'Edtech')
                                .replace('Edtech',"Ed tech")

                                .replace("Blockchain & cryptocurrency","Blockchain")
                                .replace('Blockchain & Cryptocurrency','Blockchain')
                                .replace("Cryptocurrency & Blockchain","Cryptocurrency")

                                .replace("Mobile","Application mobile")

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
                    else:
                        names.append(img.capitalize())
                else:
                    names.append(descriptions[i].split(' ')[0])
            else:
                names.append(descriptions[i].split(' ')[0])

        for n in s.find_all('th',scope=""):
            date_creation.append(re.sub('[^0-9,-]', "",changeDate(n.get_text())))
            domainesId.append([])
            logo.append('')

        for i in range(len(date_creation)):
            date_creation[i]=datetime.strptime(date_creation[i], '%m-%Y')

        df_startups=pd.DataFrame(list(zip(names,descriptions,fondateurs,domaines,siteWeb,domainesId,date_creation,logo)),
                            columns =['nom','description','fondateurs','domaines','siteWeb','domainesId','dateCreation','logo'])

        return df_startups

def create_domaines(data):
    secteursId=[]
    startupsId=[]
    challengesId=[]
    tendancesId=[]
    description=[]
    categorie=[]
    __v=[]
    nom=[]
    client = pymongo.MongoClient("mongodb+srv://dbUser:MAB220795@cluster0.xyzsj.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority")
    db = client['<dbname>']
    colDomaines=db.domaines

    for i in range(len(data['domaines'].unique())):
        if data['domaines'].unique()[i]!="":
            if not colDomaines.find_one({"nom": data['domaines'].unique()[i]}):
                nom.append(data['domaines'].unique()[i])
                description.append(get_description(wiki_url_qwant(data['domaines'].unique()[i])))
                secteursId.append([])
                startupsId.append([])
                challengesId.append([])
                tendancesId.append([])
                categorie.append('')
                __v.append(0)

    df_domaines = pd.DataFrame(list(zip(__v,nom,description,categorie,secteursId,startupsId,challengesId,tendancesId)),
                                columns =['__v','nom','description','categorie','secteursId','startupsId','challengesId','tendancesId'])

    return df_domaines


if __name__ == "__main__":
    ####Connection to DB
    client = pymongo.MongoClient("mongodb+srv://dbUser:MAB220795@cluster0.xyzsj.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority")
    db = client['<dbname>']
    colDomaines=db.domaines
    colStartups=db.startups

    df_startups = scrap_startups_act()
    df_domaines = create_domaines(df_startups)
    colDomaines.create_index([('nom', pymongo.ASCENDING)],unique=True)
    records = json.loads(df_domaines.T.to_json()).values()

    try:
        colDomaines.insert_many(records)
    except:
        print('Domaines déjà ajouté')

    df_domaines = pd.DataFrame(list(colDomaines.find()))

    for i in range(len(df_domaines)):
        for j in range(len(df_startups)):
            if df_startups['domaines'][j]==df_domaines['nom'][i]:
                df_startups['domainesId'][j].append(df_domaines['_id'][i])

    df_startups.drop(columns='domaines',inplace=True)

    colStartups.create_index([('nom', pymongo.ASCENDING)],unique=True)
    records = df_startups.to_dict('records')
    try:
        colStartups.insert_many(records)

        df_startups = pd.DataFrame(list(colStartups.find()))

        for i in range(len(df_domaines)):
            for j in range(len(df_startups)):
                for k in range(len(df_startups['domainesId'][j])):
                    if df_startups['domainesId'][j][k]==df_domaines['_id'][i]:
                        df_domaines['startupsId'][i].append(df_startups['_id'][j])

        colDomaines.delete_many({})
        colDomaines.insert_many(df_domaines.to_dict('records'))
        print("Startups ajoutées")

    except:
        print("Startups déjà ajoutées")