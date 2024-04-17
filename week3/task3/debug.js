var filelist = "https://www.example.com/image1.jpghttps://www.exampleWW.com/image1.jpghttps://www.example.com/image2.JPG";
var index_jpg = filelist.toLowerCase().indexOf('.jpg'); // 網址處理開始
var index_jpeg = filelist.toLowerCase().indexOf('.jpeg');
var img_url;

if (index_jpg !== -1) {
    img_url = filelist.slice(0, index_jpg + 4); // first_url才是要拿的網址
} else if (index_jpeg !== -1) {
    img_url = filelist.slice(0, index_jpeg + 5);
} else {
    img_url = ""; // 網址處理結束
}

console.log(img_url);

