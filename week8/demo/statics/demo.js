let button = document.querySelector(".button");
button.addEventListener("click", function() {
    let input = document.querySelector(".input input[type='text']").value.trim();
    const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"message":input})
    }
    fetch("http://127.0.0.1:8000/api/message",request)
        .then(response => {
            let message = document.querySelector(".message");
            console.log(response.json())
        })
        // .then(data => {
        //     let resultDiv = document.querySelector("#query_username_result");
        //     if (data.data) {
        //         resultDiv.textContent = `${data.data.name}(${data.data.username})`;
        //     } else {
        //         resultDiv.textContent = "無此會員";
        //     }  
        // })
        .catch(error => {
            console.error("Error:", error);
        });
});