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