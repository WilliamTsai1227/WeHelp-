def find_and_print(messages, current_station):
    print(current_station)
    import re
    ALL_STATION_1 = ["Songshan ", "Nanjing Sanmin" , "Taipei Arena" , "Nanjing Fuxing" , "Songjiang Nanjing" , "Zhongshan" , "Beimen" , "Ximen" , "Xiaonanmen" , "Chiang Kai-Shek Memorial Hall" , "Guting" , "Taipower Building" , "Gongguan" , "Wanlong" , "Jingmei" , "Dapinglin" , "Qizhang" , "Xiaobitan" , "Xindian City Hall" , "Xindian"]
    aaa = [["Songshan", 0],["Nanjing Sanmin",0],["Taipei Arena",0],["Nanjing Fuxing",0],["Songjiang Nanjing",0],["Zhongshan",0],["Beimen",0],["Ximen",0],["Xiaonanmen",0],["Chiang Kai-Shek Memorial Hall",0],["Guting",0],["Taipower Building",0],["Gongguan",0],["Wanlong",0],["Jingmei",0],["Dapinglin",0],["Qizhang",0],["Xiaobitan",0],["Xindian City Hall",0],["Xindian",0]];
    num = -1
    tidyMessages_result = []
    putFriendToStation_result = []
    #整理messages
    def tidyMessages():
        for station in ALL_STATION_1:
            for person in messages:
                find = re.search(station ,messages[person])
                if find:
                    tidyMessages_result.append([person,find.group()])
        return tidyMessages_result          
    tidyMessages()
    #幫所有站名編號的
    def NumberStation():
        judge = False
        num = 0
        for i in aaa:
            if i[0] != "Xiaobitan":
                if judge == False:
                    num += 1
                    i[1] = i[1] +num
                elif judge == True:
                    num += 0.9
                    i[1] = i[1] +num
            else:
                num += 0.1
                i[1] = i[1] +num
                judge = True
        return aaa
    NumberStation()
    #將朋友放到對應站上
    def putFriendToStation():
        for i in tidyMessages_result:
            i[0] #friend name
            i[1] #friend location
            for q in aaa:
                if q[0] == i[1]:
                    q.append(i[0])
        return aaa
    putFriendToStation_result = putFriendToStation()
    #讓我們知道輸入的站名站號為多少，為num
    def match_input():
        global num
        for w in putFriendToStation_result:
            if current_station == w[0]:
                num = w[1]
        if num == -1:   #如果跑到最後還找不到站名
            print("station input error.")
        return num
    match_input() #輸入站名的對應站號結果為num

    def distance_calculate():
        min_distance =float('inf')
        if current_station != "Xiaobitan":
            for i in putFriendToStation_result:
                print(i)
                if len(i) >= 3:
                    if i[0] == "Xiaobitan":
                        absNum = abs(num - i[1]) +1 
                        roundedNum = round(absNum)
                        if roundedNum < min_distance:
                            min_distance = roundedNum
                            find_my_friend = i[2]
                            find_my_friend_station = i[0]
                    else:
                        absNum = abs(num - i[1])  
                        roundedNum = round(absNum)
                        if roundedNum < min_distance:
                            min_distance = roundedNum
                            find_my_friend = i[2]
                            find_my_friend_station = i[0]
        else:
            for i in putFriendToStation_result:
                if len(i) >= 3:
                    if i[0] == "Xiaobitan":
                        find_my_friend = i[2]
                        find_my_friend_station = i[0]
                    else:
                        absNum = abs(num - i[1]) +1 
                        roundedNum = round(absNum)
                        if roundedNum < min_distance:
                            min_distance = roundedNum
                            find_my_friend = i[2]
                            find_my_friend_station = i[0]
        print("我和朋友的距離", min_distance)
        print(find_my_friend, find_my_friend_station)
    distance_calculate()

messages={
"Leslie":"I'm at home near Xiaobitan station.", "Bob":"I'm at Ximen MRT station.",
"Mary":"I have a drink near Jingmei MRT station.", "Copper":"I just saw a concert at Taipei Arena.", "Vivian":"I'm at Xindian station waiting for you."
}

find_and_print(messages, "Wanlong") # print Mary 
find_and_print(messages, "Songshan") # print Copper 
find_and_print(messages, "Qizhang") # print Leslie 
find_and_print(messages, "Ximen") # print Bob 
find_and_print(messages, "Xindian City Hall") # print Vivian






























# find_and_print(messages, "Wanlong") # print Mary 
# find_and_print(messages, "Songshan") # print Copper 
# find_and_print(messages, "Qizhang") # print Leslie 
# find_and_print(messages, "Ximen") # print Bob 
# find_and_print(messages, "Xindian City Hall") # print Vivian