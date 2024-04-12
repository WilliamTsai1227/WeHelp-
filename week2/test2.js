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

