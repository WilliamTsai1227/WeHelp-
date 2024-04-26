
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
//使計算平方表單不繳交
document.getElementById("count_input_form").addEventListener("submit", function(event) {
    event.preventDefault();
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