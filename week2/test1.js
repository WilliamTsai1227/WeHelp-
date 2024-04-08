const messages = {
    "Bob": "I'm at Ximen MRT station.",
    "Mary": "I have a drink near Jingmei MRT station.",
    "Copper": "I just saw a concert at Taipei Arena.",
    "Leslie": "I'm at home near Xiaobitan station.",
    "Vivian": "I'm at Xindian station waiting for you."
};

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

function findAndPrint(messages, currentStation){
    const allStation1 = /(Songshan|Nanjing Sanmin|Taipei Arena|Nanjing Fuxing|Songjiang Nanjing|Zhongshan|Beimen|Ximen|Xiaonanmen|Chiang Kai-Shek Memorial Hall|Guting|Taipower Building|Gongguan|Wanlong|Jingmei|Dapinglin|Qizhang|Xiaobitan|Xindian City Hall|Xindian)/;
    const allStation2 =["Songshan","Nanjing Sanmin","Taipei Arena","Nanjing Fuxing","Songjiang Nanjing","Zhongshan","Beimen","Ximen","Xiaonanmen","Chiang Kai-Shek Memorial Hall","Guting","Taipower Building","Gongguan","Wanlong","Jingmei","Dapinglin","Qizhang","Xiaobitan","Xindian City Hall","Xindian"];
    function tidyMessages(){
        let results = {};
        for (let person in messages) {      //person會找到相對應key
            let message = messages[person]; //取出相對應key的說話訊息
            let match = message.match(allStation1); //將說話訊息比對,match會為一個['Ximen','Ximen',index: 7,input: "I'm at Ximen MRT station.",groups: undefined] 類似的陣列
            if (match) {
            results[person] = match[0];
            };
        };
        return results;
    };
    nameToLacation = tidyMessages();  //整理出每個姓名對應的站名,為一個物件

    
}

findAndPrint(messages,1);

  

  