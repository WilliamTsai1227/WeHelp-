// // your code here, maybe
// function book(consultants, hour, duration, criteria){
//     // your code here
// }
// const consultants=[
// {"name":"John", "rate":4.5, "price":1000},
// {"name":"Bob", "rate":3, "price":1200},
// {"name":"Jenny", "rate":3.8, "price":800}
// ];
// book(consultants, 15, 1, "price"); // Jenny
// book(consultants, 11, 2, "price"); // Jenny
// book(consultants, 10, 2, "price"); // John
// book(consultants, 20, 2, "rate"); // John
// book(consultants, 11, 1, "rate"); // Bob
// book(consultants, 11, 2, "rate"); // No Service
// book(consultants, 14, 3, "price"); // John


let available_table = {"John":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"Bob":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"Jenny":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]};
let consultants = [
    {"name":"John", "rate":4.5, "price":1000},
    {"name":"Bob", "rate":3, "price":1200},
    {"name":"Jenny", "rate":3.8, "price":800}
    ];

let input = [consultants, 15, 1, "price"]



if(input[3]== "price"){
    for(let i in consultants){
        console.log(consultants[i]["price"]);
    }
}