import urllib.request
from bs4 import BeautifulSoup

url = 'https://www.ptt.cc/bbs/Lottery/index.html'
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Referer': 'https://www.google.com/',
    'Cookie': 'over18=1'
}
href_headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Referer': 'https://www.ptt.cc/bbs/Lottery/index.html',
    'Cookie': 'over18=1'
}
page_num = 1
max_page = 3
while True:
    req = urllib.request.Request(url, headers=headers)
    response = urllib.request.urlopen(req)
    html_content = response.read()
    soup = BeautifulSoup(html_content, 'html.parser')# 使用Beautiful Soup解析HTML
    title_divs = soup.findAll('div', class_='title')# 找到所有class為"title"的<div>標籤

    if title_divs:
        for title_div in title_divs:
            a_tags = title_div.findAll('a')
            if a_tags: #如果a_tags不為空，(如果沒刪文)
                for a_tag in a_tags:
                    href = "https://www.ptt.cc"+a_tag.get('href') #文章網址
                    article_time = "" #時間等等拿到，為空就是沒爬到
                    text = a_tag.text #標題
                    push = 0
                    #進入標題的網站
                    href_req = urllib.request.Request(href,headers=href_headers) #發request
                    href_response = urllib.request.urlopen(href_req) #收response
                    href_content = href_response.read() #讀取response內容
                    href_soup = BeautifulSoup(href_content, 'html.parser') #解析
                    article_metaline = href_soup.findAll('div', class_='article-metaline') #尋找
                    for i in article_metaline: #找時間
                        article_meta_tag = i.find("span",class_="article-meta-tag")
                        if article_meta_tag.text == "時間":
                            article_time_tag = i.find("span",class_="article-meta-value")
                            article_time = article_time_tag.text  #最後結果article_time
                    div_push = href_soup.findAll('div', class_='push') #尋找
                    for i in div_push: #找推
                        push_tag = i.find("span",class_="hl push-tag")
                        if push_tag:
                            print(push_tag)
                            if "推" in push_tag.text:
                                print("push_tag.text")
                                push += 1
                    print(push)
                        
                    print(text , article_time)
    #開始處理取得上一頁標籤網址
    previous_page = ""
    bar_divs = soup.findAll('div', class_='btn-group btn-group-paging')# 
    for ele in bar_divs:
        a_tags = ele.findAll("a",class_="btn wide")
        for a_tag in a_tags:
            print(a_tag.text)
            if "上頁" in a_tag.text:
                previous_page = a_tag.get('href')
                url = "https://www.ptt.cc"+previous_page
        if previous_page == "":
            print("上一頁網址not found")

    # <div class="btn-group btn-group-paging">
    #     <a class="btn wide" href="/bbs/Lottery/index1.html">最舊</a>
    #     <a class="btn wide" href="/bbs/Lottery/index2079.html">‹ 上頁</a>
    #     <a class="btn wide disabled">下頁 ›</a>
    #     <a class="btn wide" href="/bbs/Lottery/index.html">最新</a>
	# </div>
    

    page_num += 1

    # 你需要添加一個退出迴圈的條件，否則它將永遠運行下去
    if page_num > max_page:
        break

