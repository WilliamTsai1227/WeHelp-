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