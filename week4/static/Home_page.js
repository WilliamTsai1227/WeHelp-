
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

document.addEventListener("DOMContentLoaded", function() {
    let countButton = document.querySelector("#count_button");
    let NumberInput = document.querySelector("#positive_number input[type='int']");
    countButton.addEventListener("click", function(event) {
        let inputValue = NumberInput.value.trim(); // 去除首尾空格
        let isPositiveInteger =  Number.isInteger(Number(inputValue)) && Number(inputValue) > 0;
        if (!isPositiveInteger) {
            event.preventDefault(); 
            alert("Please enter a positive integer.");
        }else{
            window.location.href = `/square/${inputValue}`;
        }
    });
});