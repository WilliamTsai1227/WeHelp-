//test1
console.log("---------------------------------------Test1-------------------------------------------------");
function findAndPrint(messages, currentStation){
    const allStation1 = /(Songshan|Nanjing Sanmin|Taipei Arena|Nanjing Fuxing|Songjiang Nanjing|Zhongshan|Beimen|Ximen|Xiaonanmen|Chiang Kai-Shek Memorial Hall|Guting|Taipower Building|Gongguan|Wanlong|Jingmei|Dapinglin|Qizhang|Xiaobitan|Xindian City Hall|Xindian)/;
    let aaa = [["Songshan", 0],["Nanjing Sanmin",0],["Taipei Arena",0],["Nanjing Fuxing",0],["Songjiang Nanjing",0],["Zhongshan",0],["Beimen",0],["Ximen",0],["Xiaonanmen",0],["Chiang Kai-Shek Memorial Hall",0],["Guting",0],["Taipower Building",0],["Gongguan",0],["Wanlong",0],["Jingmei",0],["Dapinglin",0],["Qizhang",0],["Xiaobitan",0],["Xindian City Hall",0],["Xindian",0]];
    let num;  //為輸入站名的編號
    let tidyMessages_result;   //處理朋友訊息的結果
    let putFriendToStation_result; //將朋友放到站內的結果
    //整理出姓名與站名對應的函式
    function tidyMessages(){
        let tidy = [];
        for (let person in messages) {      //person會找到相對應key,也就是person =人名
            let message = messages[person]; //取出相對應key的說話訊息
            let match = message.match(allStation1); //將說話訊息比對,match會為一個['Ximen','Ximen',index: 7,input: "I'm at Ximen MRT station.",groups: undefined] 類似的陣列
            if (match) {
                tidy.push([person,match[0]])  //[[人名,站名]]
            //tidy[person] = match[0];
            };
        };
        return tidy; //整理出每個姓名對應的站名,為一個陣列
    };
    tidyMessages_result=tidyMessages();
    

    //幫所有站名編號的函示
    function NNumberStation(){
        let judge = false;
        let num = 0;  
        for (let i in aaa){
            if(aaa[i][0] != "Xiaobitan"){
                if (judge == false){
                    num +=1 ;
                    aaa[i][1] = aaa[i][1] +num; 
                }else if (judge == true){  //已經走到過小碧潭
                    num += 0.9 ;
                    aaa[i][1] = aaa[i][1] +num;
                }
            }else{
                num += 0.1 ;
                aaa[i][1] = aaa[i][1] +num;
                judge = true;
            }     
        }
        return aaa;  //將每個站名給一個數字
    }
    NNumberStation();

    //這個函式是將有出現的朋友放到相對應的站上
    function putFriendToStation(){
        for(let i in tidyMessages_result){
            tidyMessages_result[i][0];     //姓名
            tidyMessages_result[i][1];  //姓名對應的站名
            for(let q in aaa){
                if(aaa[q][0] == tidyMessages_result[i][1]){
                    aaa[q].push(tidyMessages_result[i][0])
                }
            }
        }
        return aaa;
    }
    putFriendToStation_result = putFriendToStation();

    //做一個function 讓我們知道輸入的站名站號為多少，為num
    function match_input(){
        for(let w in putFriendToStation_result){   //進入所有站名的迴圈
            putFriendToStation_result[w];  //[站名 ,站號碼 ,朋友]
            if(currentStation == putFriendToStation_result[w][0]){  //如果比對到站名
                num = putFriendToStation_result[w][1]    //將num = 這站原本編號 ＝ currentStation 站名編號
            }
        }
        if(num == undefined){   //如果跑到最後還找不到站名
            console.log("station input error.")
        }
        return num;
    }
    match_input();  //輸入站名的對應站號結果為num
    

    //距離有朋友的站有多遠，返回最近的朋友的function
    function distance_calculate(){
        let min_distance = Infinity;
        let find_my_friend;
        let find_my_friend_station;
        let absNum;
        let roundedNum;
        if(currentStation != "Xiaobitan" ){                     //如果我現在的站不為小碧潭 
            for(let i in putFriendToStation_result){
                if(putFriendToStation_result[i].length >= 3){   //如果那站有朋友
                    if (putFriendToStation_result[i][0] == "Xiaobitan"){    //如果有朋友那站為小碧潭 距離加一
                        absNum = Math.abs(num - putFriendToStation_result[i][1]) + 1 
                        roundedNum = Math.round(absNum);
                        if(roundedNum < min_distance){    
                            min_distance = roundedNum;
                            find_my_friend = putFriendToStation_result[i][2];
                            find_my_friend_station = putFriendToStation_result[i][0];
                        }
                    }else{
                        absNum = Math.abs(num - putFriendToStation_result[i][1]) //取和有朋友那站的絕對值
                        roundedNum = Math.round(absNum);
                        if(roundedNum < min_distance){    //照迴圈來看，如果兩個朋友距離一樣，先走到哪個朋友，最後結果就是那個朋友
                            min_distance = roundedNum;
                            find_my_friend = putFriendToStation_result[i][2];
                            find_my_friend_station = putFriendToStation_result[i][0];
                        }
                    }
                    
                }    
            }    
        }else{                                                                    //如果我在小碧潭
            for(let i in putFriendToStation_result){
                if(putFriendToStation_result[i].length >= 3){
                    if (putFriendToStation_result[i][0] == "Xiaobitan"){           //我也有朋友在小碧潭
                        find_my_friend = putFriendToStation_result[i][2];
                        find_my_friend_station = putFriendToStation_result[i][0];  //直接輸出小碧潭
                    }else{
                        absNum = Math.abs(num - putFriendToStation_result[i][1])+1 //取和有朋友那站的絕對值
                        roundedNum = Math.round(absNum);
                        if(roundedNum < min_distance){    //照迴圈來看，如果兩個朋友距離一樣，先走到哪個朋友，最後結果就是那個朋友
                            min_distance = roundedNum;
                            find_my_friend = putFriendToStation_result[i][2];
                            find_my_friend_station = putFriendToStation_result[i][0];
                        }
                    }   
                    
                }    
            }

        }
        //console.log("我和我朋友的距離為"+min_distance);
        console.log(find_my_friend);
        //console.log(find_my_friend_station);

    }
    distance_calculate();
}

const messages={
    "Bob":"I'm at Ximen MRT station.",
    "Mary":"I have a drink near Jingmei MRT station.", 
    "Copper":"I just saw a concert at Taipei Arena.", 
    "Leslie":"I'm at home near Xiaobitan station.", 
    "Vivian":"I'm at Xindian station waiting for you."
};

findAndPrint(messages, "Wanlong"); // print Mary
findAndPrint(messages, "Songshan"); // print Copper
findAndPrint(messages, "Qizhang"); // print Leslie
findAndPrint(messages, "Ximen"); // print Bob
findAndPrint(messages, "Xindian City Hall"); // print Vivian

//test2
console.log("---------------------------------------Test2-------------------------------------------------")
let available_table = {};
let judge = false;
let update_available_table ;
function update(){
    if(judge == true){
        available_table = update_available_table;
        //console.log("如果有正常更新時間表會走到這，update_available_table會等於以下");
    }else{
        for(let i in consultants){
            let consultant_name =consultants[i]["name"];
            let time = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
            available_table[consultant_name] = time;
        }
    }
    
}

function book(consultants, hour, duration, criteria){
    update();
    consultants = consultants;
    let input = [consultants, hour, duration, criteria];
    let allInput = [];
    let book_time = [];
    let available_consultant = [];
    let ffinal_consultant ;
    
    
    //此function 為比對哪些顧問在預約的時間有空，更新預約的時間,最後回傳一個列表取出所有有空的顧問
    function check_book_update_consultant(){
        for (let i = 0;i < input[2]; i++){   //做一個迴圈將預約的時間放進一個array中
            let num = input[1]+i;
            book_time.push(num);
        }        
        for(let i in available_table){                      //i 為人名 ， available_table[i]為他們現在有空的時間(array)
            let judge_num = 0;                              //以人名為時間基準下去尋找
            for(let t in book_time){
                for(let w in available_table[i]){       //w 為時間最多為0~23   //book_time[t]為預約的時段
                    if(book_time[t] == available_table[i][w]){              //顧問剩餘時間完全吻合預約時間時，judge_num＋1
                        judge_num ++;               //如果這個顧問時間都有吻合，進入下一階端
                    }                                         
                }                
            }
            if (judge_num == book_time.length){         //當judge_num 等於預約時間總長度時，也就是這個顧問時間有吻合   
                for(let q in consultants){              //為了拿到consultants 完整資訊，所以進入consultants迴圈
                    if(i == consultants[q]["name"]){    //如果現在符合時間得這個顧問姓名等於consultants裡面的顧問姓名
                        available_consultant.push(consultants[q]);  //將consultants { ......} 完整資訊push到available_consultant
                    }
                }
            }    
        }
        return available_consultant;
    }
    let now_available_consultant = check_book_update_consultant();  //一個所有有空的顧問列表
            
    
    //如果考慮價格優先了話，執行此function
    function price(){
        //拿現在有空的顧問去找出最低價格為多少，找到價格後再去印出符合這個價格的顧問有誰（也許不只一位）（顧問一定有空，因為是拿有空顧問名單去跑）
        let lower_price = Infinity;
        let final_consultant = [];
        let found = false;
        //第一個for迴圈先找到最低價格
        for(let i in now_available_consultant){                       
            if(now_available_consultant[i]["price"] < lower_price){   //now_available_consultant[i] = {"name":"John", "rate":4.5, "price":1000}(舉例)，加一個["price"]直接取出價錢
                lower_price = now_available_consultant[i]["price"]    //lower_price為最低價錢
            }
        }
        //console.log(lower_price)  //印出找到的最低價格
        //第二個for迴圈再去找出所有符合這個價格的顧問有誰
        for(let i in now_available_consultant){                       //確定最低價錢是多少時，再回去對應有哪些顧問是這些價錢並且印出
            if(now_available_consultant[i]["price"] == lower_price){
                final_consultant.push(now_available_consultant[i]["name"]);
                found = true;
            }
            if(found){
                break;
            }
        }
        return final_consultant;
    }    
    //如果考慮評價優先了話，執行此function
    function rate(){
        //拿現在有空的顧問去找出最高評價為多少，找到價格後再去印出符合這個價格的顧問有誰（也許不只一位）（顧問一定有空，因為是拿有空顧問名單去跑）
        let higher_rate = -Infinity;
        let final_consultant = [];
        let found = false;
        //第一個for迴圈先找到最高評價
        for(let i in now_available_consultant){                       
            if(now_available_consultant[i]["rate"] > higher_rate){   //now_available_consultant[i] = {"name":"John", "rate":4.5, "price":1000}(舉例)，加一個["rate"]直接取出評價
                higher_rate = now_available_consultant[i]["rate"]    //higher_rate為最高評價
            }
        }
        // console.log(higher_rate);
        // console.log(typeof higher_rate);
        // console.log(typeof now_available_consultant[1]["rate"]);
        
        //第二個for迴圈再去找出所有符合這個評價的顧問有誰
        for(let i in now_available_consultant){                       //確定最高評價是多少時，再回去對應有哪些顧問是這些評價並且印出
            if(now_available_consultant[i]["rate"] == higher_rate){
                final_consultant.push(now_available_consultant[i]["name"]);
                found = true;
            }
            if(found){
                break;          //這裡做了一個break,只找了一位找到就停下來
            }
        }
        return final_consultant;  //回傳最後找到的顧問，為一個["顧問姓名"]
    }
    
    if(criteria == "price"){
        ffinal_consultant = price();   //這是最後要找的顧問
        if(ffinal_consultant.length == 0){  //如果最後回傳的為一個空array
            console.log("No Service");
        }else{
            for(let result in ffinal_consultant){
                console.log(ffinal_consultant[result]);  //不然就是印出最後在array中的顧問
            }
        }  
    }else if(criteria == "rate"){
        ffinal_consultant = rate();   //這是最後要找的顧問
        if(ffinal_consultant.length == 0){
            console.log("No Service");
        }else{
            for(let result in ffinal_consultant){
                console.log(ffinal_consultant[result]);  //不然就是印出最後在array中的顧問
            }
        }
    }else{
        console.log("criteria input error.")
    }
    
    //找到預約的顧問，把預約他的時間槓掉
    for(let i in ffinal_consultant){
        for(let q in available_table){                //ffinal_consultant[i] 最後要找的顧問名   //q 為table內的人名
            if(ffinal_consultant[i] == q){            //如果顧問姓名跟要找的顧問對上
                for(let t in book_time){
                    for(let tt in available_table[q]){  //available_table[q] 為比對上的人名的現在有空表格
                        if(book_time[t] ==available_table[q][tt] ){  //如果時間吻合
                            available_table[q].splice(tt,1);  //把顧問時間移除    
                            
                        }                                     //有個問題會同時拿掉不只一個人
                    }
                }                                       
            }
        }
    }

    update_available_table = available_table;
    judge = true ;     
}
const consultants = [
    {"name":"John", "rate":4.5, "price":1000},
    {"name":"Bob", "rate":3, "price":1200},
    {"name":"Jenny", "rate":3.8, "price":800},
];
book(consultants, 15, 1, "price"); // Jenny
book(consultants, 11, 2, "price"); // Jenny
book(consultants, 10, 2, "price"); // John
book(consultants, 20, 2, "rate"); // John
book(consultants, 11, 1, "rate"); // Bob
book(consultants, 11, 2, "rate"); // No Service
book(consultants, 14, 3, "price"); // John

//test3
console.log("---------------------------------------Test3-------------------------------------------------")

function func(...data){
    let tidy = [];
    let input = data;
    for(let i in input){
        let item = [];
        let middle_word = Math.floor(input[i].length / 2);   //計算自串中間字，為字串長度除二+1，但因為index從0計算，所以直接除二不需要加一
        item.push(input[i]);  //加姓名進item
        item.push(i);  //加index進item
        item.push(input[i][middle_word]);  //加中間字進item
        tidy.push(item);  //加item進tidy
    }
    //console.log(tidy);
    
    for(let r = tidy.length - 1; r >= 0 ; r--){  //反向
        //console.log("比對基準為"+" "+tidy[r][0]);
        for(let g in tidy){   //順向
            //console.log(tidy[g]);
            if(tidy[r][2] == tidy[g][2] && tidy[r][0] != tidy[g][0]){  //如果比對到但不是自己
                //console.log("find"+tidy[g]);  //印出
                for(let q in input){  //進入input檢查
                    if(tidy[g][0] == input[q]){ //如果input的對應項 == tidy的順向現在項
                        //console.log("找到"+input[q]+"符合"+tidy[g][0]);
                        input.splice(q, 1);
                    }
                }    
            }
        }
    }
    if(input.length == 0){
        console.log("沒有");
    }else{
        for(let y in input){
            console.log(input[y]);
        }
    }
}

func("彭大牆", "陳王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安

//Test4
console.log("---------------------------------------Test4-------------------------------------------------")
function getNumber(index){
    let final_num= 0;
    let plus = 0;
    let times = Math.floor(index/3);
    let mod_left = index % 3;

    if(mod_left == 1){
        plus = 4;
    }else if(mod_left == 2){
        plus = 8;
    }
    final_num = (times * 7)+(plus);
    console.log(final_num);
}
getNumber(1); // print 4
getNumber(5); // print 15
getNumber(10); // print 25
getNumber(30); // print 70