
document.addEventListener("DOMContentLoaded", function() {
    let loginButton = document.querySelector("#login_button");
    let checkBox = document.querySelector("#check_box input[type='checkbox']");

    loginButton.addEventListener("click", function(event) {
        if (!checkBox.checked) {
            event.preventDefault(); 
            alert("Please check the checkbox first.");
        }
    });
});
