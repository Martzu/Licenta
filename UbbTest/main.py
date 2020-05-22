import re

import json
from functools import reduce

import requests
from bs4 import BeautifulSoup
from selenium import webdriver


def convert_json_format(values, url, fee):
    if len(values) == 3:
        values.append(values[2])

    keys = ['address', 'signUpDate', 'examDate', 'resultsDate', 'latitude', 'longitude']
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
    faculty_name = url.split('/')[5].replace('_', ' ')
    first_letter = faculty_name[0].upper()
    data_dictionary['name'] = first_letter + faculty_name[1:]
    data_dictionary['universityAdmissionFee'] = 0
    data_dictionary['facultyAdmissionFee'] = fee
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


def calculate_admission_fee(admission_content):
    admission_fees = {'21': [8, 10], '22': [9, 11], '24': [9, 11]}
    '''if admission_content.__len__() > 22:
        total_admission_fee = sum(
            list(map(lambda x: int(admission_content[x]), admission_fees[str(admission_content.__len__())])))'''
    total_admission_fee = sum(
        list(map(lambda x: int(admission_content[x]), admission_fees[str(admission_content.__len__())])))
    return total_admission_fee


def valid_faculty(url):
    return len(
        url) > 39 and 'cazare' not in url and \
           'alte_categorii' not in url and \
           'programe' not in url and \
           'concursuri_admitere' not in url and \
           'educatie_fizica' not in url


input_urls = open('../UbbScrapperTest/MainScrapper/mainScrapper/crawled.txt', 'r')

urls = [url for url in input_urls.read().split('\n') if valid_faculty(url) and science_faculty(url)]

# opts = webdriver.FirefoxOptions()
# opts.headless = True
opts = webdriver.ChromeOptions()
opts.headless = True

extensions = ['', '#calendar_iulie']

faculties_information = []

for url in urls:
    print(url)
    data_per_faculty = []
    admission_fee = 0
    for extension in extensions:
        chrome = webdriver.Chrome(options=opts)
        chrome.get(url + extension)

        data = chrome.page_source
        chrome.close()

        # firefox = webdriver.Firefox(options=opts)
        # firefox.get(url + extension)

        # data = firefox.page_source
        # firefox.close()

        soup = BeautifulSoup(data, features='html.parser')
        for elem in soup(text=re.compile(r'Adresa') if extension == '' else re.compile(r'Înscrierea')):
            data = elem.parent.parent.text

            lines = data.split('\n')
            for line in lines:
                data_per_faculty.append(process_faculty(line))
        if 'calendar_iulie' not in extension:
            contents = soup(text=re.compile(r'[0-9]{2,3}'))  # matematica 11 13
            '''length = contents.__len__()  # 22, 21, 26
            admissionFee = int(contents[9 if length == 22 else 8]) + int(contents[11 if length == 22 else 10])'''
            admission_fee = calculate_admission_fee(contents)
    data_per_faculty = [info for info in data_per_faculty if len(info) > 1]
    print(data_per_faculty)
    faculties_information.append(convert_json_format(data_per_faculty, url, admission_fee))

file = open('ubb.json', 'w')

json.dump(faculties_information, file, indent=4)

file.close()
