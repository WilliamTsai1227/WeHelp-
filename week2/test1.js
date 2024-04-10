// const allStation = /(Songshan|Nanjing Sanmin|Taipei Arena|Nanjing Fuxing|Songjiang Nanjing|Zhongshan|Beimen|Ximen|Xiaonanmen|Chiang Kai-Shek Memorial Hall|Guting|Taipower Building|Gongguan|Wanlong|Jingmei|Dapinglin|Qizhang|Xiaobitan|Xindian City Hall|Xindian)/;

// function searchMessages() {
// let results = {};
// for (let person in messages) {
//     let message = messages[person];
//     let match = message.match(allStation);
//     if (match) {
//     results[person] = match[0];
//     }
// }
// return results;
// }
// name_lacation = searchMessages();  //整理出每個姓名對應的站名
//console.log(name_lacation);
const allStation1 = /(Songshan|Nanjing Sanmin|Taipei Arena|Nanjing Fuxing|Songjiang Nanjing|Zhongshan|Beimen|Ximen|Xiaonanmen|Chiang Kai-Shek Memorial Hall|Guting|Taipower Building|Gongguan|Wanlong|Jingmei|Dapinglin|Qizhang|Xiaobitan|Xindian City Hall|Xindian)/;
let allStation2 ={"Songshan": 0,"Nanjing Sanmin": 0,"Taipei Arena": 0,"Nanjing Fuxing": 0,"Songjiang Nanjing": 0,"Zhongshan": 0,"Beimen": 0,"Ximen": 0,"Xiaonanmen": 0,"Chiang Kai-Shek Memorial Hall": 0,"Guting": 0,"Taipower Building": 0,"Gongguan": 0,"Wanlong": 0,"Jingmei": 0,"Dapinglin": 0,"Qizhang": 0,"Xiaobitan": 0,"Xindian City Hall": 0,"Xindian": 0};
let aaa = [["Songshan", 0],["Nanjing Sanmin",0],["Taipei Arena",0],["Nanjing Fuxing",0],["Songjiang Nanjing",0],["Zhongshan",0],["Beimen",0],["Ximen",0],["Xiaonanmen",0],["Chiang Kai-Shek Memorial Hall",0],["Guting",0],["Taipower Building",0],["Gongguan",0],["Wanlong",0],["Jingmei",0],["Dapinglin",0],["Qizhang",0],["Xiaobitan",0.1],["Xindian City Hall",0],["Xindian",0]];

const messages = {
    "Bob": "I'm at Ximen MRT station.",
    "Mary": "I have a drink near Jingmei MRT station.",
    "Copper": "I just saw a concert at Taipei Arena.",
    "Leslie": "I'm at home near Xiaobitan station.",
    "Vivian": "I'm at Xindian station waiting for you."
};
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
let tidyMessages_result=tidyMessages();
//幫所有站名編號的函示 不要用
function NumberStation(){
    let num = 0;
    for(let i in allStation2){
        if (i != "Xiaobitan"){
            num +=1;
            allStation2[i] = num;
        }else{
            num += 0.1;
            allStation2[i] = num
        }    
    }
    return allStation2;
}


//幫所有站名編號的函示
function NNumberStation(){
    let num = 0;  
    for (let i in aaa){ 
        num +=1 ;
        aaa[i][1] = aaa[i][1] +num; 
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

let inn = "Xindian"
//做一個function 當輸入值時的比對
for(let w in putFriendToStation_result){
    putFriendToStation_result[w];  //[站名 ,站號碼 ,朋友]
    if(inn == putFriendToStation_result[w][0]){
        num = putFriendToStation_result[w][1]
        if(putFriendToStation_result[w][2]){
            console.log(putFriendToStation_result[w][2]);
        }
    }

}

