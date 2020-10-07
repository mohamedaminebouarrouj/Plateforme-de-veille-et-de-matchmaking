import bs4 as bs
import urllib.request
from urllib.parse import urlparse
import pandas as pd
import re
import json
from datetime import datetime
import pymongo



def changeDate(date):
    mois=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
    for i in range(len(mois)):
        if mois[i] in date:
            return((str(i+1)+'-'+date.split(mois[i])[1]).replace(' ',''))


def scrap_startups_act():
    names=[]
    descriptions=[]
    fondateurs=[]
    domaines=[]
    date_creation=[]
    domainesId=[]
    i=0
    scraped_data = urllib.request.urlopen('https://www.startupact.tn/startups.html')
    article = scraped_data.read()
    parsed_article = bs.BeautifulSoup(article,'lxml')
    startups_table = parsed_article.find_all('tbody')

    for s in startups_table:
        for n in s.find_all('td'):
            if (i==0):
                descriptions.append(n.get_text(separator=" ").strip())
            if(i==1):
                fondateurs.append( [f.split('  ')[-1] for f in (n.get_text(separator=" S ").strip()).split(' S ')])
            if(i==2):
                domaines.append(n.get_text(separator=" ").strip())
                i=-1
            i+=1

        for i in range(len(s.find_all('th',scope="row"))):
            if s.find_all('th',scope="row")[i].find('img'):
                if s.find_all('th',scope="row")[i].find('img').get('src'):
                    img=s.find_all('th',scope="row")[i].find('img').get('src').split('img/')[-1].split('.')[0]
                    if len(re.split('[0-9]+',img))>1:
                        names.append(re.split('[0-9]+',img)[1].replace('-',' ').strip().capitalize())
                    else:
                        names.append(img.capitalize())
                else:
                    names.append(descriptions[i].split(' ')[0])
            else:
                names.append(descriptions[i].split(' ')[0])

        for n in s.find_all('th',scope=""):
            date_creation.append(changeDate(n.get_text()))
            domainesId.append([])

        date_creation[324]="8-2020"

        for i in range(len(date_creation)):
            date_creation[i]=datetime.strptime(date_creation[i], '%m-%Y')

        df_startups=pd.DataFrame(list(zip(names,descriptions,fondateurs,domainesId,date_creation)),
                            columns =['nom','description','fondateurs','domainesId','dateCreation'])

        return df_startups


if __name__ == "__main__":
    data = scrap_startups_act()
    client = pymongo.MongoClient("mongodb+srv://dbUser:MAB220795@cluster0.xyzsj.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority")
    db = client['<dbname>']
    col=db.startups
    col.create_index([('nom', pymongo.ASCENDING)],unique=True)

    records = json.loads(data.T.to_json()).values()

    try:
        col.insert_many(records)
        print("Startups ajoutées")

    except:
        print("Startups déjà ajoutées")