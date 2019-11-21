from googlesearch import search
import requests
from bs4 import BeautifulSoup
import re
import unicodedata
import os

input_urls = open('/home/martzu/PycharmProjects/crawlerTest/crawlTest/crawled.txt', 'r')
urls = input_urls.read().split("\n")
faculty = re.compile("licenta\/(\w+\-*)+")
folder = 'data/'


'''def extract_text_to_file(domain_name, domain_url):
    domain_file = open(folder + domain_name, 'w')
    res = requests.get(domain_url)
    html_page = res.content
    soup = BeautifulSoup(html_page, 'html.parser')
    text = soup.find_all(text=True)
    data = ''
    for element in text:
        data += str(element).replace(u'\xa0', u' ')
        print(element + '\n\n')
    domain_file.write(data)
    domain_file.close()


os.makedirs(folder)
for url in urls:
    search = faculty.search(url)
    if search:
        x = search.group()
        domain = x.split("/")
        domain = domain[1]
        extract_text_to_file(domain, url)

input_urls.close()'''

for filename in os.listdir('data'):
    file = open(folder + filename, 'r')
    print(filename + ":\n")
    line = file.readline()
    while line:
        if 'iunie' or 'iulie' or 'august' or 'septembrie' in line:
            print(line)
    file.close()
