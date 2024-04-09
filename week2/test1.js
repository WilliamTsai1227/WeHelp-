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
//console.log(putFriendToStation_result);


//做一個function 當輸入值時的比對
function mmatch(){
    let inn = "Songshan"
    let distance = Infinity;
    let num = 0;
    let final_position_num = 0; //最終朋友站號
    let index = 0; //最終朋友在整條捷運線哪個index 
    //找到輸入站名對應站號
    for(let i in putFriendToStation_result){
        if(inn == putFriendToStation_result[i][0]){ //如果找到對應站名
           num =  putFriendToStation_result[i][1];//num 為輸入站名對應的站號        
        }
    }
    if(num == 0){   //如果沒找到輸入對應站號
        console.log("Input not in MRT line.");
    }else{                                         //有找到輸入對應站號
        for(let w in putFriendToStation_result){   //進入捷運線迴圈
            if(putFriendToStation_result[w][2]){   //如果那個捷運站有朋友了話
                let compare_distance = Math.abs(putFriendToStation_result[w][1]-num); //計算輸入捷運站與朋友捷運站距離
                if(compare_distance < distance){ //如果捷運站與朋友捷運站距離比上一個找到的朋友捷運站距離還短
                    distance = compare_distance; //將distance更新
                    final_position_num = putFriendToStation_result[w][1]; //將最終朋友站號更新
                    index = w; //將最終朋友在整條捷運線哪個index更新 
                }
            }
        }
        console.log(final_position_num);
        console.log(putFriendToStation_result[index]);
        console.log(putFriendToStation_result[index][2]);  
    }
    
    
                                                     
}
mmatch();