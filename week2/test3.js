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
    // console.log(input);
    // console.log(input.length);
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
    
































// func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
// func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
// func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安
    
