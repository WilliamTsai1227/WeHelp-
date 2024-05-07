document.addEventListener("DOMContentLoaded", function() {
    let deleteButton = document.querySelector(".message_check button");
    let memberId = document.querySelector(".id");
    deleteButton.addEventListener("click", function(event) {
        checkDelete = confirm("確定要刪除這則留言嗎？");
        if(checkDelete == false) {
            event.preventDefault(); 
        }
    });
});