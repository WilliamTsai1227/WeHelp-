import urllib.request
import json

# 打開 URL
url = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1'
response = urllib.request.urlopen(url)

# 讀取數據
data = response.read()

# 解析 JSON 數據
json_data = json.loads(data)

# 現在你可以使用 json_data 來訪問 JSON 文件中的數據了
# print(json_data)
for i in json_data: #進入第一層
    # print(json_data[i])
    for q in json_data[i]: #進入第二層
        if q == "results": #進入第三層
            for w in json_data[i][q]:
                print(w)
            # for key in json_data[i][q][0].keys():
        #         print(key)
        #         print(json_data[i][q][0][key])
            
                    

    
    