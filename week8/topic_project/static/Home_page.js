//如果沒輸入完整資訊便要註冊，要防止提交（並用警告訊息擋下）
document.addEventListener("DOMContentLoaded", function() {
    let registerButton = document.querySelector("#register_button");
    let checkName = document.querySelector("#register_name input[type='text']");
    let account = document.querySelector("#register_account input[type='text']");
    let password = document.querySelector("#register_password input[type='password']");
    registerButton.addEventListener("click", function(event) {
        if (checkName.value === "" || account.value === "" || password.value === "") {
            event.preventDefault(); 
            alert("Please fill in the registration information completely.");
        }
        if (password.value.length < 4){
            event.preventDefault();
            alert("The password length must not be less than four characters.")
        }
        if (password.value.length > 8){
            event.preventDefault();
            alert("Password length must not be longer than eight characters.")
        }
        if (password.value.match(/[a-z]/) === null){
            event.preventDefault(); 
            alert("Password must contain lowercase characters.")
        }
        if (password.value.match(/[A-Z]/) === null){
            event.preventDefault(); 
            alert("Password must contain uppercase characters.")
        }
        if (password.value.match(/\d/) == null){
            event.preventDefault(); 
            alert("Password must contain numbers.")
        }
        if (password.value.match(/[^a-zA-Z\d]/) === null){
            event.preventDefault(); 
            alert("Password must contain special characters.")
        }
    });
});

//如果沒輸入完整資訊便要登入，要防止提交（並用警告訊息擋下）
document.addEventListener("DOMContentLoaded", function() {
    let loginButton = document.querySelector("#login_button");
    let account = document.querySelector("#account input[type='text']");
    let password = document.querySelector("#password input[type='password']");
    loginButton.addEventListener("click", function(event) {
        if (account.value === "" || password.value === "") {
            event.preventDefault(); 
            alert("Please fill in the login information completely.");
        }
        if (password.value.length < 4){
            event.preventDefault();
            alert("The password length must not be less than four characters.")
        }
        if (password.value.length > 8){
            event.preventDefault();
            alert("Password length must not be longer than eight characters.")
        }
        if (password.value.match(/[a-z]/) === null){
            event.preventDefault(); 
            alert("Password must contain lowercase characters.")
        }
        if (password.value.match(/[A-Z]/) === null){
            event.preventDefault(); 
            alert("Password must contain uppercase characters.")
        }
        if (password.value.match(/\d/) === null){
            event.preventDefault(); 
            alert("Password must contain numbers.")
        }
        if (password.value.match(/[^a-zA-Z\d]/) === null){
            event.preventDefault(); 
            alert("Password must contain special characters.")
        }
    });
});



