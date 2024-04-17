function openlist(){
    let cloMu = document.querySelector(".menu_icon");
    let clo = document.querySelector(".closelist");
    cloMu.className = "menu_close";
    clo.className="openlist";
}

function closelist(){
    let openMu = document.querySelector(".menu_close");
    let op = document.querySelector(".openlist")
    openMu.className = "menu_icon";
    op.className="closelist";
}

function checkWidth() {
    let windowWidth = window.innerWidth;
    let op = document.querySelector(".openlist");  //找到現在list狀態為打開的
    let openMu = document.querySelector(".menu_close");
    if (windowWidth > 600 && op) {                    //當視窗大於600且找到現在list狀態為打開的，會執行以下
        console.log("頁面寬度大於 600px，執行相應操作，避免list尚未關掉防呆");
        op.className="closelist"; //第一和第二畫面皆為display:none,更改list 為 closelist是可以關掉list的
        openMu.className = "menu_icon"; //第一和第二畫面皆為display:none,手機畫面才會dispaly:flex
    } 
}
let stitle_list = [];
function getData(){
    //利用fetch連線並取得資料
    fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1").then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        let spot_list = data.data.results;
            for(let i in spot_list){
                let stitle = []
                stitle.push(spot_list[i].stitle);
                stitle.push(spot_list[i].filelis);
                stitle_list.push(stitle)
            }

        //已經取的資料，要把資料呈現到畫面上
        //let result = document.querySelector(".parent")
        //result.innerHTML = "";   //每次點按時便先把畫面清空
        // for(let i = 0;i < 8;i++){
        //     let site = data.result.results[i];
        //     console.log(site);
        //     console.log(site.stitle);
            //result.innerHTML +="<div>"+site.stitle+"</div>"
        // };
    });   
}

// function getEle(){
//     let eleee = document.querySelector("body");
//     console.log(eleee);
// }
// getData();
// 在頁面加載完成時調用
window.onload = checkWidth;
window.onload = getData;
console.log(stitle_list)

// 在窗口大小變動時調用
window.onresize = checkWidth;
//轉向時觸發
window.addEventListener("orientationchange", checkWidth);

