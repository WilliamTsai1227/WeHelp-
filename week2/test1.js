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