



//當使用者沒有輸入message就送出，會跳出阻擋訊息
document.addEventListener("DOMContentLoaded",function(){
    let inputCheck = document.querySelector("#message_input input[type='text']");
    let submitButton= document.querySelector(".button button[class='submit_button']");
    submitButton.addEventListener("click", function(event) {
        if(inputCheck.value === "") {
            event.preventDefault();
            alert("You haven't entered a message yet.") 
        }
    });
});


//當使用者按下刪除，會和使用者確認是否真要刪除
document.addEventListener("DOMContentLoaded", function() {
    let deleteButtons = document.querySelectorAll(".message_check button");
    deleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener("click", function(event) {
            let currentMessageItem = event.target.closest(".message_item");
            let messageId = currentMessageItem.querySelector("div[class='message_id']").innerText;
            let checkDelete = confirm("確定要刪除這則留言嗎？");
            if(checkDelete === false) {
                event.preventDefault(); 
            } else {
                fetch('/deleteMessage', {      //用fetch使用POST method發送資料給後端
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messageId: messageId,
                    })
                })
                .then(response => {
                    if (response.ok === false) {
                        throw new Error('刪除失敗');
                    }
                    // 如果刪除成功，在這裡更新頁面，重新加載留言列表
                    location.reload(); // 重新加載頁面
                })
                .catch(error => {
                    console.error('發生錯誤:', error);
                });
            }
        });
    });
});

//當使用者按下查詢用戶帳號
document.addEventListener("DOMContentLoaded", function() {
    let queryButton = document.querySelector("#query_username_input button[type='submit']");
    queryButton.addEventListener("click", function() {
        let queryInput = document.querySelector("#query_username_input input[type='text']").value;
        fetch(`/api/member?username=${queryInput}`)
            .then(response => {
                document.querySelector("#query_username_input input[type='text']").value = '';
                return response.json()
            })
            .then(data => {
                let resultDiv = document.querySelector("#query_username_result");
                if (data.data) {
                    resultDiv.textContent = `${data.data.name}(${data.data.username})`;
                } else {
                    resultDiv.textContent = "無此會員";
                }  
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
    
});


//當使用者按下更改本身用戶名稱
document.addEventListener("DOMContentLoaded", function() {
    let updateNameButton = document.querySelector("#update_myname_input button[type='submit']");
    updateNameButton .addEventListener("click", function() {
        let newNameInput = document.querySelector("#update_myname_input input[type='text']").value.trim();
        if(newNameInput === ''){
            alert("你尚未輸入新姓名");
            return;
        }
        const requestOptions = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name":newNameInput})
        }
        fetch('/api/member', requestOptions)
            .then(response =>{
                document.querySelector("#update_myname_input input[type='text']").value = '';
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                return response.json();
            })
            .then(data => {
                let updateUserNameResult = document.querySelector(".updatename_content_block div[id='update_username_result']");
                let WelcomeTitle = document.querySelector(".content_block div[id='login_system_div']");
                if(data == null){
                    updateUserNameResult.textContent = "更新失敗";
                }else if(data.ok === true){
                    WelcomeTitle.textContent = `${newNameInput}，歡迎登入系統`;;
                    updateUserNameResult.textContent = "更新成功";
                }else if(data.error === true ){
                    updateUserNameResult.textContent = "更新失敗";
                }    
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });  
});
