//如果沒輸入完整資訊便要註冊，要防止提交（並用警告訊息擋下）
document.addEventListener("DOMContentLoaded", function() {
    let registerButton = document.querySelector("#register_button");
    let checkName = document.querySelector("#register_name input[type='text']");
    let checkAccount = document.querySelector("#register_account input[type='text']");
    let checkPassword = document.querySelector("#register_password input[type='password']");
    registerButton.addEventListener("click", function(event) {
        if (checkName.value === "" || checkAccount.value === "" || checkPassword.value === "") {
            event.preventDefault(); 
            alert("Please fill in the registration information completely.");
        }
    });
});

//如果沒輸入完整資訊便要登入，要防止提交（並用警告訊息擋下）
document.addEventListener("DOMContentLoaded", function() {
    let loginButton = document.querySelector("#login_button");
    let checkAccount = document.querySelector("#account input[type='text']");
    let checkPassword = document.querySelector("#password input[type='password']");
    loginButton.addEventListener("click", function(event) {
        if (checkAccount.value === "" || checkPassword.value === "") {
            event.preventDefault(); 
            alert("Please fill in the login information completely.");
        }
    });
});






document.addEventListener("DOMContentLoaded", function() {
    let Button = document.querySelector("#count_button");
    let NumberInput = document.querySelector("#positive_number input[type='text']");
    Button.addEventListener("click", function(event) {
        let input = NumberInput.value.trim(); // 去除首尾空格
        let isPositiveInt =  Number.isInteger(Number(input)) && Number(input) > 0;
        if (isPositiveInt === false) {
            event.preventDefault(); 
            alert("Please enter a positive number.");
        }else{
            window.location.href = `/square/${input}`;
        }
    });
});


//做一個監聽完成document的
document.addEventListener("DOMContentLoaded", function() {
    let ac = document.querySelector("#account input[type = 'text']");
    ac.addEventListener("keydown", function(e){
        console.log(e.keyCode);
    })

})