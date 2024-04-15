import urllib.request
import json
import re
import tesk1_2
tesk1_2.tesk1_2 ()
# tesk1_2.finalResult = [['文德', '內湖區'], ['中正紀念堂', '中正區'], ['關渡', '士林區']...]

allStation = []
# 打開 URL
url = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1'
response = urllib.request.urlopen(url)

# 讀取數據
data = response.read()

# 解析 JSON 數據
json_data = json.loads(data)
count = 0
# 現在你可以使用 json_data 來訪問 JSON 文件中的數據了
# print(json_data)
for i in json_data: #進入第一層
    # print(json_data[i])
    for q in json_data[i]: #進入第二層
        if q == "results": #進入第三層
            for w in json_data[i][q]:
                #print(w)  #W印出主要需要進入取資料的{} {'info': '新北投站下車，沿中山路直走即可到..', 'stitle': '新北投溫泉區', 'xpostDate': '2016/07/07', 'longitude': '121.508447', 'REF_WP': '10', 'avBegin': '2010/02/14', 'langinfo': '10', 'SERIAL_NO': '2011051800000061', 'RowNumber': '1', 'CAT1': '景點', 'CAT2': '養生溫泉', 'MEMO_TIME': '各業者不同，依據現場公告', 'POI': 'Y', 'filelist': 'https://www.travel.taipei/d...., 'idpt': '臺北旅遊網', 'latitude': '25.137077', 'xbody': '北投溫泉從日據時代便有盛名，深受喜愛泡湯的...。', '_id': 1, 'avEnd': '2016/07/07'}
                for keys in w:  #w 是 {}, keys 會等於 字典的keys ,value = w[keys]
                    District = ""
                    if keys == "info":
                        if w[keys] == False:
                            print("info =  not found")
                        else:
                            print("info = " , w[keys])
                            info = w[keys]
                    elif keys == "stitle":
                        if w[keys] == False:
                            print("stitle =  not found")
                        else:
                            print("stitle = " , w[keys])
                            stitle = w[keys]
                    # elif keys == "xpostDate":
                    #     if w[keys] == False:
                    #         print("xpostDate =  not found")
                    #     else:
                    #         print("xpostDate = " , w[keys])
                    #         xpostDate = w[keys]
                    elif keys == "longitude":
                            if w[keys] == False:
                                print("longitude =  not found")
                            else:
                                print("longitude = " , w[keys])
                                longitude = w[keys]
                    # elif keys == "REF_WP":
                    #         if w[keys] == False:
                    #             print("REF_WP =  not found")
                    #         else:
                    #             print("REF_WP = " , w[keys])
                    #             REF_WP = w[keys]
                    # elif keys == "avBegin":
                    #         if w[keys] == False:
                    #             print("avBegin =  not found")
                    #         else:
                    #             print("avBegin = " , w[keys])
                    #             avBegin = w[keys]
                    # elif keys == "SERIAL_NO":
                    #         if w[keys] == False:
                    #             print("SERIAL_NO =  not found")
                    #         else:
                    #             print("SERIAL_NO = " , w[keys])
                    #             SERIAL_NO = w[keys]
                    # elif keys == "RowNumber":
                    #         if w[keys] == False:
                    #             print("RowNumber =  not found")
                    #         else:
                    #             print("RowNumber = " , w[keys])
                    #             RowNumber = w[keys]
                    # elif keys == "CAT1":
                    #         if w[keys] == False:
                    #             print("CAT1 =  not found")
                    #         else:
                    #             print("CAT1 = " , w[keys])
                    #             CAT1 = w[keys]
                    # elif keys == "CAT2":
                    #         if w[keys] == False:
                    #             print("CAT2 =  not found")
                    #         else:
                    #             print("CAT2 = " , w[keys])
                    #             CAT2 = w[keys]
                    # elif keys == "MEMO_TIME":
                    #         if w[keys] == False:
                    #             print("MEMO_TIME =  not found")
                    #         else:
                    #             print("MEMO_TIME = " , w[keys])
                    #             MEMO_TIME = w[keys]
                    # elif keys == "POI":
                    #         if w[keys] == False:
                    #             print("POI =  not found")
                    #         else:
                    #             print("POI = " , w[keys])
                    #             POI = w[keys]
                    elif keys == "filelist":
                            if w[keys] == False:
                                print("filelist =  not found")
                            else:
                                # print("filelist = " , w[keys])
                                filelist = w[keys]
                                # 使用 find() 方法查找第一个出现的 '.jpg' 或 '.JPG' 的索引位置
                                index_jpg = filelist.lower().find('.jpg')
                                index_jpeg = filelist.lower().find('.JPG')
                                # 如果找到了 .jpg 或 .jpeg，则提取索引位置之前的子字符串
                                if index_jpg != -1:
                                    first_url = filelist[:index_jpg + 4]
                                elif index_jpeg != -1:
                                    first_url = filelist[:index_jpeg + 5]
                                else:
                                    first_url = " "
                    # elif keys == "idpt":
                    #         if w[keys] == False:
                    #             print("idpt =  not found")
                    #         else:
                    #             print("idpt = " , w[keys])
                    #             idpt = w[keys]
                    elif keys == "latitude":
                            if w[keys] == False:
                                print("latitude =  not found")
                            else:
                                print("latitude= " , w[keys])
                                latitude = w[keys]
                    # elif keys == "_id":
                    #         if w[keys] == False:
                    #             print("_id =  not found")
                    #         else:
                    #             print("_id= " , w[keys])
                    #             id = w[keys]
                    # elif keys == "avEnd":
                    #         if w[keys] == False:
                    #             print("avEnd =  not found")
                    #         else:
                    #             print("avEnd= " , w[keys])
                    #             avEnd = w[keys]
                print(tesk1_2.finalResult)
                for findStation in tesk1_2.finalResult:   #findStation[1] = XX區 findStation[0] = xx站
                    station = findStation[0]
                    stationDistrict = findStation[1]
                    find = re.search(station,info)  #ex:district = 中正區 ,address = 臺北市  中正區中山南路11號
                    if find:
                        print(stationDistrict)
                        break
                        




                    

    
    