#test1
print("---------------------------------------Test1-------------------------------------------------")
def find_and_print(messages, current_station):
    import re
    ALL_STATION_1 = ["Songshan ", "Nanjing Sanmin" , "Taipei Arena" , "Nanjing Fuxing" , "Songjiang Nanjing" , "Zhongshan" , "Beimen" , "Ximen" , "Xiaonanmen" , "Chiang Kai-Shek Memorial Hall" , "Guting" , "Taipower Building" , "Gongguan" , "Wanlong" , "Jingmei" , "Dapinglin" , "Qizhang" , "Xiaobitan" , "Xindian City Hall" , "Xindian"]
    aaa = [["Songshan", 0],["Nanjing Sanmin",0],["Taipei Arena",0],["Nanjing Fuxing",0],["Songjiang Nanjing",0],["Zhongshan",0],["Beimen",0],["Ximen",0],["Xiaonanmen",0],["Chiang Kai-Shek Memorial Hall",0],["Guting",0],["Taipower Building",0],["Gongguan",0],["Wanlong",0],["Jingmei",0],["Dapinglin",0],["Qizhang",0],["Xiaobitan",0],["Xindian City Hall",0],["Xindian",0]];
    num = -1  #輸入的站名站號
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
        # if num == -1:   #如果跑到最後還找不到站名
        #     print("station input error.")
        return num
    num = match_input() #輸入站名的對應站號結果為num
    

    def distance_calculate():
        min_distance =float('inf')
        if current_station != "Xiaobitan":
            for i in putFriendToStation_result:
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
        #print("我和朋友的距離", min_distance)
        print(find_my_friend)
        #print(find_my_friend_station)
    distance_calculate()

messages={
    "Leslie":"I'm at home near Xiaobitan station.", 
    "Bob":"I'm at Ximen MRT station.",
    "Mary":"I have a drink near Jingmei MRT station.", 
    "Copper":"I just saw a concert at Taipei Arena.", 
    "Vivian":"I'm at Xindian station waiting for you."
}

find_and_print(messages, "Wanlong") # print Mary 
find_and_print(messages, "Songshan") # print Copper 
find_and_print(messages, "Qizhang") # print Leslie 
find_and_print(messages, "Ximen") # print Bob 
find_and_print(messages, "Xindian City Hall") # print Vivian

#test2
print("---------------------------------------Test2-------------------------------------------------")
available_table = {}   #{人名：[時間]}
judge = False
update_available_table = []
def update():
    global available_table
    global update_available_table
    global judge
    if judge == True:
        available_table = update_available_table
    else:
        for i in consultants:
            consultant_name =i["name"]
            time = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
            available_table[consultant_name] = time
def book(consultants, hour, duration, criteria):
    global available_table
    global judge
    global update_available_table
    update()
    consultants = consultants
    input = [consultants, hour, duration, criteria]
    book_time = []
    available_consultant = []
    ffinal_consultant = 0
    def check_book_update_consultant():
        for i in range(input[2]):
            num = input[1] + i
            book_time.append(num)
        for i in available_table:  # i為人名，available_table[i]為他們現在有空的時間list #{'John': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] ......}
            judge_num = 0
            for t in book_time:    # book_time list
                for w in available_table[i]:  # available_table[i] 顧問的時間表 list
                    if t == w:     #if book time match consultant time
                        judge_num +=1  
            if judge_num == len(book_time):  #if judge_num book_time list長度 (全部找到符合)
                for q in consultants:
                    if i == q["name"]:
                        available_consultant.append(q)

        return available_consultant
    now_available_consultant = check_book_update_consultant()
    #now_available_consultant 會是 [{'name': 'John', 'rate': 4.5, 'price': 1000}, {'name': 'Bob', 'rate': 3, 'price': 1200}, {'name': 'Jenny', 'rate': 3.8, 'price': 800}]
    #book_time = [11, 12]

    #如果考慮價格優先了話，執行此function
    def price():
        lower_price = float('inf')
        final_consultant = []
        found = False
        #找最低價
        for i in now_available_consultant:
            if i["price"] < lower_price:
                lower_price = i["price"]
        #找符合這個價格顧問有誰
        for i in now_available_consultant:
            if i["price"] == lower_price:
                final_consultant.append(i["name"])
                found = True
            if found:
                break
        return final_consultant
    #如果考慮評價優先了話，執行此function
    def rate():
        higher_rate = float('-inf')
        final_consultant = []
        found = False
        #找到最高評價
        for i in now_available_consultant:
            if i["rate"] > higher_rate:
                higher_rate = i["rate"]
        #找出所有符合這個評價的顧問有誰
        for i in now_available_consultant:
            if i["rate"] == higher_rate:
                final_consultant.append(i["name"])
                found = True
            if found:
                break
        return final_consultant
    if criteria == "price":
        ffinal_consultant = price() #這是最後要找的顧問
        if len(ffinal_consultant) == 0: #如果最後回傳的為一個空list
            print("No Service")
        else:
            for result in ffinal_consultant: # ffinal_consultant為一個list，內含一個顧問
                print(result) #印出顧問
    elif criteria == "rate":
        ffinal_consultant = rate()
        if len(ffinal_consultant) == 0:
            print("No Service")
        else:
            for result in ffinal_consultant: # ffinal_consultant為一個list，內含一個顧問
                print(result) #印出顧問
    else:
        print("criteria input error.")

    #找到預約的顧問，把預約他的時間槓掉
    for i in ffinal_consultant:    #i 會直接等於name
        for q in available_table:  #available_table為一個字典，q會直接等於name
            if i == q:
                for t in book_time: #進入 book_time
                    for tt in available_table[q]:     #available_table[q]為比對上的顧問時間的表格
                        if t == tt:
                            available_table[q].remove(tt)

    update_available_table = available_table
    judge = True

consultants=[
    {"name":"John", "rate":4.5, "price":1000},
    {"name":"Bob", "rate":3, "price":1200}, 
    {"name":"Jenny", "rate":3.8, "price":800}
]
book(consultants, 15, 1, "price") # Jenny 
book(consultants, 11, 2, "price") # Jenny 
book(consultants, 10, 2, "price") # John 
book(consultants, 20, 2, "rate") # John 
book(consultants, 11, 1, "rate") # Bob 
book(consultants, 11, 2, "rate") # No Service 
book(consultants, 14, 3, "price") # John

#test3
print("---------------------------------------Test3-------------------------------------------------")
def func(*data):
    import math
    tidy = []
    input = list(data)  #input 為一個list[]"彭大牆", "陳王明雅", "吳明"]
    count = 0
    for i in input:
        item = []
        middle_word = math.floor(len(i) / 2)
        item.append(i) #加姓名進item
        item.append(count) #加index進item
        item.append(i[middle_word])
        tidy.append(item)
        count += 1
    #print(tidy)  #tidy = [['彭大牆', 0, '大'], ['陳王明雅', 1, '明'], ['吳明', 2, '明']]
    for r in range(len(tidy) - 1, -1, -1): #反向走過tidy每一個
        for g in tidy :#順向走過tidy每一個
            if tidy[r][2] == g[2] and tidy[r][0] != g[0]: #如果中間字對到了，但是不是自己
                for q in input:
                    if(g[0] == q):
                        input.remove(q)
    if(len(input) == 0):
        print("沒有")
    else:
        for y in input:
            print(y)

func("彭大牆", "陳王明雅", "吳明") # print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花 
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有 
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安

#test4
print("---------------------------------------Test4-------------------------------------------------")
def get_number(index):
    import math
    final_num = 0
    plus = 0
    times = math.floor(index / 3)
    mod_left = index % 3
    if mod_left == 1:
        plus = 4
    elif mod_left == 2:
        plus = 8
    final_num = (times * 7)+(plus)
    print(final_num)

get_number(1) # print 4
get_number(5) # print 15 
get_number(10) # print 25 
get_number(30) # print 70































# find_and_print(messages, "Wanlong") # print Mary 
# find_and_print(messages, "Songshan") # print Copper 
# find_and_print(messages, "Qizhang") # print Leslie 
# find_and_print(messages, "Ximen") # print Bob 
# find_and_print(messages, "Xindian City Hall") # print Vivian