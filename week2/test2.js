// // your code here, maybe
// function book(consultants, hour, duration, criteria){
//     // your code here
// }
// const consultants=[
// {"name":"John", "rate":4.5, "price":1000},
// {"name":"Bob", "rate":3, "price":1200},
// {"name":"Jenny", "rate":3.8, "price":800}
// ];
// book(consultants, 15, 1, "price"); // Jenny
// book(consultants, 11, 2, "price"); // Jenny
// book(consultants, 10, 2, "price"); // John
// book(consultants, 20, 2, "rate"); // John
// book(consultants, 11, 1, "rate"); // Bob
// book(consultants, 11, 2, "rate"); // No Service
// book(consultants, 14, 3, "price"); // John

//重複使用這個function要重複更新，不能重複使用後表格沒變


let available_table = {"John":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
"Bob":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
"Jenny":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
"william":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
"perry":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
"gino":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],

};
//記得把available_table放在function外，目的為了讓他做完更新後不會被洗掉
let consultants = [
    {"name":"John", "rate":4.5, "price":1000},
    {"name":"Bob", "rate":3, "price":1200},
    {"name":"Jenny", "rate":3.8, "price":800}
    ];

let input = [consultants, 15, 2, "price"]
let book_time = [];
let available_consultant = []
//consultants[0] = {"name":"John", "rate":4.5, "price":1000}

//此function 為比對哪些顧問在預約的時間有空，更新預約的時間book_time及有空的顧問available_consutant
function check_book_update_consultant(){
    for (let i = 0;i < input[2]; i++){
        let num = input[1]+i;
        book_time.push(num);
    }
    for(let i in available_table){                      //i 為人名 ， available_table[i]為他們現在有空的時間(array)
        let judge_num = 0;
        for(let t in book_time){
            for(let w in available_table[i]){       //w 為時間最多為0~23   //book_time[t]為預約的時段
                if(book_time[t] == w){
                    judge_num ++;
                }                                         
            }                
        }
        if (judge_num == book_time.length){
            for(let q in consultants){
                if(i ==consultants[q]["name"]){
                    available_consultant.push(consultants[q]);
                }
            }
        }    
    }
    return available_consultant;
}
let now_available_consultant = check_book_update_consultant();
console.log(now_available_consultant);  //印出現在可以服務的顧問列表字典
//這邊直接複寫為了做一個測試
now_available_consultant =[
    { name: 'John', rate: 4.5, price: 1000 },
    { name: 'Bob', rate: 3, price: 1200 },
    { name: 'Jenny', rate: 3.8, price: 800 },
    { name: 'william', rate: 5, price: 1600 },
    { name: 'perry', rate: 0, price: 100 },
    { name: 'gino', rate: 0, price: 100 },
];             

//如果考慮價格優先了話，執行此function
function price(){
    //拿現在有空的顧問去找出最低價格為多少，找到價格後再去印出符合這個價格的顧問有誰（也許不只一位）（顧問一定有空，因為是拿有空顧問名單去跑）
    let lower_price = Infinity;
    let final_consultant = [];
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
            break;
        }
    }
    return final_consultant;
}
let ffinal_consultant = price();   //這是最後要找的顧問
console.log(ffinal_consultant);




//如果考慮評價優先了話，執行此function
function rate(){
    //拿現在有空的顧問去找出最高評價為多少，找到價格後再去印出符合這個價格的顧問有誰（也許不只一位）（顧問一定有空，因為是拿有空顧問名單去跑）
    let higher_rate = -100000;
    let final_consultant = [];
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
        }
    }
    return final_consultant;
}

//ffinal_consultant = rate();   //這是最後要找的顧問
//console.log(rate());


//找到預約的顧問，把預約他的時間槓掉
// for(let i in ffinal_consultant){
//     for(let q in available_table){                //ffinal_consultant[i] 最後要找的顧問名   //q 為table內的人名
//         if(ffinal_consultant[i] == q){            //如果顧問名跟要找顧問對上
//             for(let t in book_time){
//                 for(let tt in available_table[q]){  //available_table[q] 為比對上的人名的現在有空表格
//                     if(book_time[t] ==available_table[q][tt] ){  //如果時間吻合
//                         available_table[q].splice(tt,1);  //把顧問時間移除    
//                         break;
//                     }                                     //有個問題會同時拿掉不只一個人
//                 }
//             }                                       
//         }
//     }
// }




for (let i in ffinal_consultant) {
    let consultant = ffinal_consultant[i];
    if (consultant in available_table) { // 确保顾问存在于 available_table 中
        for (let t in book_time) {
            let index = available_table[consultant].indexOf(book_time[t]);
            if (index !== -1) { // 如果找到了预约的时间
                available_table[consultant].splice(index, 1); // 从表中移除预约时间
            }
        }
    }
}
console.log(available_table);




