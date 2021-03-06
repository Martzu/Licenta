from html.parser import HTMLParser
from urllib import parse
import re


class LinkFinder(HTMLParser):

    # page url current page to be parsed
    # base_url the website

    def __init__(self, base_url, page_url):
        super().__init__()
        self.base_url = base_url
        self.page_url = page_url
        self.links = set()  # store links in a set

    def handle_starttag(self, tag, attrs):
        if tag == 'a' or tag == 'link':
            for (attribute, value) in attrs:
                if attribute == 'href':
                    url = parse.urljoin(self.base_url, value)
                    print(value + "\n")
                    if 'admitere' and 'licenta' in url:
                        self.links.add(url)

    def page_links(self):
        return self.links

    def error(self, message):
        pass
