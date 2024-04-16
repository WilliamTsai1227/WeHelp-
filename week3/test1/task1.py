import urllib.request
import json
import re
import csv

allDistrict = ["中正區","萬華區","中山區","大同區","大安區","松山區","信義區","士林區","文山區","北投區","內湖區","南港區"]
spot_result = [] #一開始暫存多一個捷運站資訊，最後會移掉，最後解答
mrt_result = []   #最後解答
allMRT = [] #所有的捷運站

# 打開 URL
url1 = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1'
url2 = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2'
response1 = urllib.request.urlopen(url1)
response2 = urllib.request.urlopen(url2)

# 讀取數據
data1 = response1.read()
data2 = response2.read()

# 解析 JSON 數據
json_data1 = json.loads(data1)
json_data2= json.loads(data2)

#可以使用 json_data1 來訪問 JSON 文件中的數據
# print(json_data1)
for i in json_data1: #進入第一層
    # print(json_data[i])
    for q in json_data1[i]: #進入第二層
        if q == "results": #進入第三層
            for w in json_data1[i][q]:
                #print(w)  #W印出主要需要進入取資料的{} {'info': '新北投站下車，沿中山路直走即可到..', 'stitle': '新北投溫泉區', 'xpostDate': '2016/07/07', 'longitude': '121.508447', 'REF_WP': '10', 'avBegin': '2010/02/14', 'langinfo': '10', 'SERIAL_NO': '2011051800000061', 'RowNumber': '1', 'CAT1': '景點', 'CAT2': '養生溫泉', 'MEMO_TIME': '各業者不同，依據現場公告', 'POI': 'Y', 'filelist': 'https://www.travel.taipei/d...., 'idpt': '臺北旅遊網', 'latitude': '25.137077', 'xbody': '北投溫泉從日據時代便有盛名，深受喜愛泡湯的...。', '_id': 1, 'avEnd': '2016/07/07'}
                for bigKeys in w:  #w 是 {}, keys 會等於 字典的keys ,value = w[bigKeys]
                        for i in json_data2: #進入第一層
                            for datta in json_data2[i]: #進入第二層
                                for key in datta :# datta ={'MRT': '文德', 'SERIAL_NO': '2011051800000646', 'address': '臺北市  內湖區內湖路2段175號'}
                                     if datta["MRT"] not in allMRT:
                                         allMRT.append(datta["MRT"])
                                     if bigKeys =="SERIAL_NO" and key =="SERIAL_NO":
                                          if w[bigKeys] == datta[key]:
                                               stitle = w["stitle"]#
                                               longitude = w["longitude"]#
                                               latitude = w["latitude"]#
                                               filelist = w["filelist"]#
                                               mrt = datta["MRT"]
                                               index_jpg = filelist.lower().find('.jpg') #網址處理開始
                                               index_jpeg = filelist.lower().find('.JPG')
                                               if index_jpg != -1:
                                                   img_url = filelist[:index_jpg + 4]#    #first_url才是要拿的網址
                                               elif index_jpeg != -1:
                                                   img_url = filelist[:index_jpeg + 5]
                                               else:
                                                   img_url = " "                        #網址處理結束
                                               address = datta["address"]
                                               for area in allDistrict:
                                                    find = re.search(area ,address)  #ex:district = 中正區 ,address = 臺北市  中正區中山南路11號
                                                    if find:
                                                       district = area#
                                               spot_result.append([stitle,district,longitude,latitude,img_url,mrt])
for station in allMRT:
    station_list =[station]
    for i in spot_result:  # i = ['新北投溫泉區', '北投區', '121.508447', '25.137077', 'https://www.travel.taipei/d_upload_ttn/sceneadmin/pic/11000848.jpg', '新北投']
        if station == i[5]:
            station_list.append(i[0])
    mrt_result.append(station_list)
# mrt_result 已經整理好
for i in spot_result:
    i.pop()
# spot_result 已經整理好
spot_csv_file_path = 'spot.csv'
mrt_csv_file_path = 'mrt.csv'
with open(spot_csv_file_path, mode='w', newline='') as spot_file:
    writer = csv.writer(spot_file)
    writer.writerows(spot_result)
with open(mrt_csv_file_path, mode='w', newline='') as mrt_file:
    writer = csv.writer(mrt_file)
    writer.writerows(mrt_result)


                        




                    

    
    