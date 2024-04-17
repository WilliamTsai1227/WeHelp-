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
                let index_jpg = spot_url.toLowerCase().indexOf('.jpg'); // 網址處理開始
                let index_jpeg = spot_url.toLowerCase().indexOf('.jpeg');
                let img_url;
                if (index_jpg !== -1) {
                    img_url = spot_url.slice(0, index_jpg + 4); // first_url才是要拿的網址
                } else if (index_jpeg !== -1) {
                    img_url = spot_url.slice(0, index_jpeg + 5);
                } else {
                    img_url = " "; // 網址處理結束
                }
                //將資料放到stitle  [] 個別景點小list
                stitle.push(spot);
                stitle.push(img_url);
                //將資料放到stitle_list  大list
                stitle_list.push(stitle)                
            }
            let maxPicNum = 10;
            for(let i in stitle_list){
                if(i < 3){  //0,1,2
                    let classNum = parseInt(i)+1 //caculate the right serial num
                    let img_content = document.querySelector(".img_block_content");
                    let img_block = document.createElement("div");
                    img_block.className = "img_block"+classNum
                    let img = document.createElement("img");//create a img tag
                    img.className="img1"; 
                    img.src = stitle_list[i][1];
                    console.log(img)
                    let img_block_text = document.createElement("div");//create a div tag
                    img_block_text.className = "img_block_text"
                    img_block_text.innerText = stitle_list[i][0];
                    console.log(img_block_text)
                    img_content.appendChild(img_block)
                    img_block.appendChild(img);
                    img_block.appendChild(img_block_text);
                }else if(3 <= i < maxPicNum){                 //remeber index is start from 0 ,so need to use < ,not <=
                    let classNum = parseInt(i)-2   //caculate the right serial num
                    let pic_block = document.querySelector(".pic_part"+(classNum).toString());
                    let img_item = document.createElement("img"); //create a img tag
                    img_item.className="img_row_pic_item"+(classNum).toString();  //the i(index) start form 3, but we need 1,so minus 2
                    img_item.src = stitle_list[i][1];  //we need to take the url from index3 , so don't need minus
                    let img_text_block = document.createElement("div"); //create a img_text_block tag
                    img_text_block.className = "img_row_pic_text"+(classNum).toString();//the i(index) start form 3, but we need 1,so minus 2
                    let img_text_content = document.createElement("div"); //create a img_text_content tag
                    img_text_content.className = "pic_text"
                    img_text_content.innerText = stitle_list[i][0];  //we need to take the spot text (start with-> stitle_list-> index3 [position 0])
                    pic_block.appendChild(img_item);
                    pic_block.appendChild(img_text_block);
                    img_text_block.appendChild(img_text_content);   // add element to the right position
                }                
            } 
    });
    
    
}



// 在頁面加載完成時調用
window.onload = checkWidth;
window.onload = getData;


// 在窗口大小變動時調用
window.onresize = checkWidth;
//轉向時觸發
window.addEventListener("orientationchange", checkWidth);

