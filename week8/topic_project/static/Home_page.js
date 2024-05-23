//A function for checking the name,account,password is empty or not.
function checkEmpty(name,account,password){
    if(name === "" || account === "" || password === ""){
        return false;
    }
    return true;
}
//A function for checking the input length.
function checkLength(input,min,max){
    if(input.length < min){
        return false;
    }
    if(input.length > max){
        return false;
    }
    return true;
}
//A function for checking whether the input contains English letters, numbers, and one of the following special letters: @#$%.
function checkFormat(input){
    let check = true;
    if(input.match(/[a-z]/) === null){
        check = false;
    }
    if(input.match(/[A-Z]/) === null){
        check = false;
    }
    if(input.match(/\d/) === null){
        check = false;
    }
    if(input.match(/[@#$%]/) === null){
        check = false;
    }
    if(check === false){
        return false;
    }else{
        return true;
    } 
}




//如果沒輸入完整資訊便要註冊，要防止提交
function checkRegister(){
    let registerButton = document.querySelector("#register_button");
    let alertElement = document.querySelector("#register_input_form div[class='alert-div']");
    registerButton.addEventListener("click", function(event) {
        let checkName = document.querySelector("#register_name input[type='text']");
        let account = document.querySelector("#register_account input[type='text']");
        let password = document.querySelector("#register_password input[type='password']");
        if (checkEmpty(checkName.value,account.value,password.value) === false){
            event.preventDefault();
            alertElement.innerText = "輸入框不能為空"; 
        }else if(checkLength(password.value,4,8) === false){
            event.preventDefault();
            alertElement.innerText = "密碼長度為４～８碼"; 
        }else if(checkFormat(password.value) === false){
            event.preventDefault();
            alertElement.innerText = "密碼必須包含大小寫英文，數字，特殊符號"; 
        }            
    });
}


//如果沒輸入完整資訊便要登入，要防止提交
function checkLogin(){
    let loginButton = document.querySelector("#login_button");
    let alertElement = document.querySelector("#login_input_form div[class='alert-div']");
    loginButton.addEventListener("click", function(event) {
        let account = document.querySelector("#account input[type='text']").value;
        let password = document.querySelector("#password input[type='password']").value;
        let name = "default";
        if (checkEmpty(name,account,password) === false) {
            event.preventDefault();
            alertElement.innerText = "輸入框不能為空";  
        }else if (checkLength(password,4,8) === false){
            event.preventDefault();
            alertElement.innerText = "密碼長度為４～８碼"; 
        }else if (checkFormat(password) === false){
            event.preventDefault();
            alertElement.innerText = "密碼必須包含大小寫英文，數字，特殊符號";  
        }
    });
}


// checkRegister();
// checkLogin();

