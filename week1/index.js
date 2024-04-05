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
    let op = document.querySelector(".openlist");
    let openMu = document.querySelector(".menu_close");
    if (windowWidth > 600) {
        console.log("页面宽度大于 600px，执行相应的操作，避免list尚未關掉防呆");
        op.className="closelist"; //第一和第二畫面皆為display:none,手機畫面按漢堡按鈕才會改變class為openlist
        openMu.className = "menu_icon"; //第一和第二畫面皆為display:none,手機畫面才會dispaly:flex
    } 
}
// 在頁面加載完成時調用
window.onload = checkWidth;

// 在窗口大小變動時調用
window.onresize = checkWidth;

