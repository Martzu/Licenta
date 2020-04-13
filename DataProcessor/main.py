import requests
from bs4 import BeautifulSoup
import re
import unicodedata
import os

input_urls = open('/home/martzu/Facultate/Licenta/MainScrapper/mainScrapper/crawled.txt', 'r')
urls = input_urls.read().split("\n")
urls = urls[2:]
folder = 'data/'


def scrape_data_from_url(url):
    response = requests.get(url)
    html_page = response.content
    soup = BeautifulSoup(html_page, features='html.parser')

    print(url)
    current_information_processed = 0
    data = []

    for elem in soup(text=re.compile(r'Înscrieri:|Afişarea rezultatelor iniţiale|Proba de concurs|Înscrierea candidaţilor:|\+ Etapa II')):
        part = elem.parent.parent
        data.append(part.text if 'Etapa' in part.text else part.parent.text)
        if current_information_processed == 4:
            break
        current_information_processed += 1

    data[0] = data[0].split('Cluj-Napoca')[0] + 'Cluj-Napoca'
    [print(data) for data in data]
    print('\n')


[scrape_data_from_url(url) for url in urls if 'regulament' not in url]
