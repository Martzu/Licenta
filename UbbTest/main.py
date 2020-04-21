import re

import json
import requests
from bs4 import BeautifulSoup
from selenium import webdriver


def convert_json_format(values):
    if len(values) == 3:
        values.append(values[2])

    keys = ['address', 'signUp', 'exam', 'results', 'latitude', 'longitude']
    data_dictionary = {}

    for key, value in zip(keys, values):
        data_dictionary[key] = value

    address = values[0]
    address = address.replace('.', '').replace(',', '').replace(' ', '+')

    response = requests.get(
        f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=AIzaSyBDlY8RJxrk2UVf2dSe5Z9Ults6ylGqUVE')
    json_response = response.json()
    coordinates = json_response['results'][0]['geometry']['location']
    data_dictionary['latitude'] = coordinates['lat']
    data_dictionary['longitude'] = coordinates['lng']

    print(data_dictionary)

    return data_dictionary


def process_faculty(row):
    processed_data = ''
    result_array = []
    if 'Adresa' in row:
        processed_data = row.split(':')[1].split('Cluj-Napoca')[0] + 'Cluj-Napoca'
        processed_data.replace('\u00e1', 'a')
    elif 'Înscrierea candidaţilor' in row:
        result_array = re.findall(r'[0-9]+-[0-9]+', row)
    elif 'Test de admitere' in row or 'Probele' in row or 'rezultatelor probelor scrise' in row:
        result_array = re.findall('[0-9]+', row)

    if len(result_array) > 0:
        for element in result_array:
            processed_data += element + ' '

    return processed_data


def science_faculty(url):
    return 'fizica' in url or \
           'chimie' in url or \
           'matematica' in url


def valid_faculty(url):
    return len(
        url) > 39 and 'cazare' not in url and \
           'alte_categorii' not in url and \
           'programe' not in url and \
           'concursuri_admitere' not in url and \
           'educatie_fizica' not in url


input_urls = open('/home/martzu/Facultate/Licenta/UbbScrapperTest/MainScrapper/mainScrapper/crawled.txt', 'r')

urls = [url for url in input_urls.read().split('\n') if valid_faculty(url) and science_faculty(url)]

opts = webdriver.FirefoxOptions()
opts.headless = True

extensions = ['', '#calendar_iulie']

faculties_information = []

for url in urls:
    print(url)
    data_per_faculty = []
    for extension in extensions:
        firefox = webdriver.Firefox(options=opts)
        firefox.get(url + extension)

        data = firefox.page_source
        firefox.close()

        soup = BeautifulSoup(data, features='html.parser')
        for elem in soup(text=re.compile(r'Adresa') if extension == '' else re.compile(r'Înscrierea')):
            data = elem.parent.parent.text

            lines = data.split('\n')
            for line in lines:
                data_per_faculty.append(process_faculty(line))
    data_per_faculty = [info for info in data_per_faculty if len(info) > 1]
    print(data_per_faculty)
    faculties_information.append(convert_json_format(data_per_faculty))

file = open('ubb.json', 'w')

json.dump(faculties_information, file, indent=4)

file.close()
