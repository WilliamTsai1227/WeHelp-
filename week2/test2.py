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
{"name":"John", "rate":4.5, "price":1000}, {"name":"Bob", "rate":3, "price":1200}, {"name":"Jenny", "rate":3.8, "price":800}
]
book(consultants, 15, 1, "price") # Jenny 
book(consultants, 11, 2, "price") # Jenny 
book(consultants, 10, 2, "price") # John 
book(consultants, 20, 2, "rate") # John 
book(consultants, 11, 1, "rate") # Bob 
book(consultants, 11, 2, "rate") # No Service 
book(consultants, 14, 3, "price") # John