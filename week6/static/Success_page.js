//當使用者沒有輸入message就送出，會跳出阻擋訊息
document.addEventListener("DOMContentLoaded",function(){
    let inputCheck = document.querySelector("#message_input input[type='text']");
    let submitButton= document.querySelector("#button button[id='submit_button']");
    submitButton.addEventListener("click", function(event) {
        if(inputCheck.value === "") {
            event.preventDefault();
            alert("You have not entered a message.") 
        }
    });
});


//當使用者按下刪除，會和使用者確認是否真要刪除

document.addEventListener("DOMContentLoaded", function() {
    let deleteButtons = document.querySelectorAll(".message_check button");

    deleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener("click", function(event) {
            let currentMessageCheck = event.target.closest(".message_check");
            let messageId = currentMessageCheck.querySelector(".message_check div[class='message_id']").innerText;
            let memberId = currentMessageCheck.querySelector(".message_check div[class='member_id']").innerText;
            
            let checkDelete = confirm("確定要刪除這則留言嗎？");
            if(checkDelete === false) {
                event.preventDefault(); 
            } else {
                fetch('/deleteMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messageId: messageId,
                        memberId: memberId
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('请求失败:', response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    // 处理返回的数据
                    console.log(data);
                })
                .catch(error => {
                    // 处理错误
                    console.error('发生错误:', error);
                });
            }
        });
    });
});
