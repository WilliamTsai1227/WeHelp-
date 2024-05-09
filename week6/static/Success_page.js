//當使用者沒有輸入message就送出，會跳出阻擋訊息
document.addEventListener("DOMContentLoaded",function(){
    let inputCheck = document.querySelector("#message_input input[type='text']");
    let submitButton= document.querySelector("#button button[id='submit_button']");
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
            let currentMessageCheck = event.target.closest(".message_check");
            let messageId = currentMessageCheck.querySelector("div[class='message_id']").innerText;
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
