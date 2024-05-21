let images = document.querySelectorAll(".image_container img")
let viewImage = document.querySelector(".view_image");
let fullImage = document.querySelector(".view_image img");
let closeButton = document.querySelector(".view_image span")
let imageContainer = document.querySelector('.image_container');

for(let img of images){
    img.addEventListener("click",function(e){
        viewImage.style.display= "flex";
    })
}
closeButton.addEventListener("click",function(){
    viewImage.style.display= "none";
})

async function getImage(n){
    for(let i=0;i<n;i++){
        let res = await fetch('https://source.unsplash.com/random');
        let url = res.url;
        let img = document.createElement("img");
        img.src = url;
        imageContainer.appendChild(img);
        img.addEventListener("click",function(e){
            viewImage.style.display = "flex";
            fullImage.src = e.target.src;
        })
    }
}
let state = 1;
window.addEventListener("scroll",function(e){
    // let{clientHeight,scrollHeight,scrollTop} = e.target.documentElement; //解構賦值
    let clientHeight = e.target.documentElement.clientHeight;
    let scrollHeight = e.target.documentElement.scrollHeight;
    let scrollTop = e.target.documentElement.scrollTop;
    console.log(scrollTop,scrollHeight,clientHeight)
    if(scrollTop+clientHeight >= scrollHeight ){
        state++;
        getImage(3);
    }
    console.log(state);
})

getImage(9);