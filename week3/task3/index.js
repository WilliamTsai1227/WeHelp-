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

// 在頁面加載完成時調用
window.onload = checkWidth;

// 在窗口大小變動時調用
window.onresize = checkWidth;
//轉向時觸發
window.addEventListener("orientationchange", checkWidth);

