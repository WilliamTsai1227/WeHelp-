import urllib.request
import json
import re

allDistrict = ["中正區","萬華區","中山區","大同區","大安區","松山區","信義區","士林區","文山區","北投區","內湖區","南港區"]
finalResult = []
# 打開 URL
url = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2'
response = urllib.request.urlopen(url)

# 讀取數據
data = response.read()

# 解析 JSON 數據
json_data = json.loads(data)
def tesk1_2():
    for i in json_data: #進入第一層
        #print(json_data[i])
        for datta in json_data[i]: #進入第二層
            print(datta) 
            information = []  #跑完一組要將資料放入
            for key in datta :# datta ={'MRT': '文德', 'SERIAL_NO': '2011051800000646', 'address': '臺北市  內湖區內湖路2段175號'}
                print(key)
                if key == "MRT":
                    #print("MRT = " , datta[key])
                    # print(type(datta[key]))
                    mrt = datta[key]+"站"
                    information.append(mrt)
                if key == "address":
                    # print("address = ", datta[key])
                    # print(type(datta[key]))
                    address = datta[key]
                    for district in allDistrict:
                        find = re.search(district ,address)  #ex:district = 中正區 ,address = 臺北市  中正區中山南路11號
                        if find:
                            print(address , district)
                            information.append(district)
            print(information ,1)
            finalResult.append(information)
    return finalResult
    #print(finalResult)
    #finalResult = [['文德', '內湖區'], ['中正紀念堂', '中正區'], ['關渡', '士林區']....]

tesk1_2()
print(finalResult)
# for i in finalResult:
#     print(i[1])


                

# import re

# # 输入字符串
# address = '臺北市  內湖區內湖路2段175號'

# # 使用正则表达式提取区域部分
# match = re.search(r'(\S+區)', address)

# if match:
#     district = match.group(1)
#     print(district)  # 输出：內湖區
        