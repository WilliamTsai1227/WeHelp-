import urllib.request
from bs4 import BeautifulSoup

url = 'https://www.ptt.cc/bbs/Lottery/index.html'
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Referer': 'https://www.google.com/',
    'Cookie': 'over18=1'
}

req = urllib.request.Request(url, headers=headers)
response = urllib.request.urlopen(req)
html_content = response.read()

# 使用Beautiful Soup解析HTML
soup = BeautifulSoup(html_content, 'html.parser')


# 找到所有class為"title"的<div>標籤
title_divs = soup.findAll('div', class_='title')
print(title_divs)

# 如果找到了符合條件的<div>標籤
if title_divs:
    # 遍歷所有符合條件的<div>標籤
    for title_div in title_divs:
        # 找到每個<div>標籤下的所有<a>標籤
        a_tags = title_div.findAll('a')
        # 如果找到了符合條件的<a>標籤
        if a_tags:
            # 遍歷每個符合條件的<a>標籤
            for a_tag in a_tags:
                # 打印<a>標籤的href屬性值和文字內容
                href = "https://www.ptt.cc"+a_tag.get('href')
                print("href:", href)
                if a_tag.get('href'):
                    # 使用requests模組訪問該網址
                    response = requests.get(href)
                    # 如果成功獲取響應
                    if response.status_code == 200:
                        # 獲取網頁內容
                        page_content = response.text
                        # 在這裡你可以對page_content進行解析或其他處理
                        # 例如，你可以使用Beautiful Soup再次解析page_content
                        # soup = BeautifulSoup(page_content, 'html.parser')
                        # 然後從中提取你需要的數據
                    else:
                        print("Failed to get response for:", href)
                text = a_tag.text
                print("Text:", text)

