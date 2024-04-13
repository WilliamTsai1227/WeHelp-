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