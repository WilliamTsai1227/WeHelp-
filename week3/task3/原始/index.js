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

function getData(){
    fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1").then(function(response){
        return response.json();
    }).then(function(data){
        let stitle_list = [];
        let spot_list = data.data.results;
            for(let i in spot_list){
                let stitle = []
                let spot = spot_list[i].stitle
                let spot_url = spot_list[i].filelist
                // 提取以 .jpg 或 .JPG 結尾的字串
                let regex = /https?:\/\/[^ ]+\.jpe?g/gi;
                let matches = spot_url.match(regex);
                // console.log(spot)
                // console.log(matches);
                //將資料放到stitle  [] 個別景點小list
                stitle.push(spot);
                stitle.push(matches);
                //將資料放到stitle_list  大list
                stitle_list.push(stitle)                
            }
            for(let i = 1 ; i <=3 ;i++){ //上面三個block
                let img_block = document.querySelector(".img_block"+i.toString()) 
                const img = document.createElement("img");//創造
                img.className="img"+i.toString();
                img.src = stitle_list[i][1]
                const img_block_text = document.createElement("div");
                img_block_text.className ="img_block_text";
                img_block_text.innerText = stitle_list[i][0]
                img_block.appendChild(img)
                img_block.appendChild(img_block_text)
            }
    });
    
    
}
getData();






    

function find_cret_add_ele(){

    

}


// 在頁面加載完成時調用
window.onload = checkWidth;






// 在窗口大小變動時調用
window.onresize = checkWidth;
//轉向時觸發
window.addEventListener("orientationchange", checkWidth);

