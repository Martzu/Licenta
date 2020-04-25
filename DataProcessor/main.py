import PyPDF2
import requests
from bs4 import BeautifulSoup
import re
import json
import functools
from tika import parser

input_urls = open('/home/martzu/Facultate/Licenta/MainScrapper/mainScrapper/crawled.txt', 'r')
urls = input_urls.read().split("\n")
urls = urls[2:]
del urls[-1]
folder = 'data/'


def extract_relevant_data(input_data):
    extracted_data = input_data
    if 'Înscrierea' in input_data:
        extracted_data = re.findall('[0-9]+-[0-9]+', input_data)
        extracted_data = functools.reduce(lambda x, y: x + ' ' + y, extracted_data)
    elif 'Înscrieri' in input_data:
        extracted_data= input_data.split(':')[1][1:]
        if '(' in extracted_data:
            extracted_data = re.sub('\s{1}\(.+\),', '', extracted_data)
        elif 'şi' in extracted_data:
            extracted_data = extracted_data.split('şi')[0] + 'Cluj-Napoca'
    elif 'Proba' in input_data or 'Afişarea' in input_data:
        extracted_data = re.findall('[0-9]+', input_data)
        if len(extracted_data) > 1:
            extracted_data = extracted_data[0]
    return extracted_data


def convert_json_format(values, url):
    values = values[:-1]

    if len(values) == 3:
        values.append(values[2])
        values[2] = 'No exam'

    values = [extract_relevant_data(value) for value in values]
    keys = ['address', 'signUpDate', 'examDate', 'resultsDate', 'latitude', 'longitude', 'name']
    data_dictionary = {}
    for key, value in zip(keys, values):
        data_dictionary[key] = value

    address = values[0]

    address = address.replace('.', '').replace(',', '').replace(' ', '+')

    coordinates = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=AIzaSyBDlY8RJxrk2UVf2dSe5Z9Ults6ylGqUVE').json()['results'][0]['geometry']['location']
    for key, value in zip(keys[-3:], coordinates):
        data_dictionary[key] = coordinates[value]

    faculty_name = url.split('/')[5].replace('-', ' ')
    first_letter = faculty_name[0].upper()
    data_dictionary['name'] = first_letter + faculty_name[1:]
    return data_dictionary


def scrape_data_from_url(url):
    response = requests.get(url)
    html_page = response.content
    soup = BeautifulSoup(html_page, features='html.parser')

    print(url)
    current_information_processed = 0
    data = []

    for elem in soup(text=re.compile(
            r'Înscrieri:|Afişarea rezultatelor iniţiale|Proba de concurs|Înscrierea candidaţilor:|\+ Etapa II')):
        part = elem.parent.parent
        data.append(part.text if 'Etapa' in part.text else part.parent.text)
        if current_information_processed == 4:
            break
        current_information_processed += 1

    data[0] = data[0].split('Cluj-Napoca')[0] + 'Cluj-Napoca'
    # [print(data) for data in data]
    return convert_json_format(data, url)


'''converted_json_data = [scrape_data_from_url(url) for url in urls if 'regulament' not in url]
file = open('utcn.json', 'w')
json.dump(converted_json_data, file, indent=4)'''
requiredDocuments = requests.get('https://www.utcluj.ro/media/documents/2020/acte_necesare_admitere_2020.pdf')
pdfFile = open('requiredDocuments.pdf', 'wb')
pdfFile.write(requiredDocuments.content)

pdfFile.close()

raw = parser.from_file("requiredDocuments.pdf")
pdfData = raw['content']
pdfData = pdfData.split('ÎNSCRIERE')[2]
pdfData = re.sub('\n{3,}', '\n\n', pdfData)

file = open('requiredDocumentx.txt', 'w')
file.write(pdfData)
file.close()


