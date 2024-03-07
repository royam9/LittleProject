// 輪播
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("dot");
//     if (n > slides.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = slides.length }
//     // 每觸發一次都會把全部的slides設成none一次
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     // 每觸發一次都會把全部的dots的active(變深色)的class清掉
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     // 顯示第X個slides
//     slides[slideIndex - 1].style.display = "block";
//     dots[slideIndex - 1].className += " active";
// };

// 自動輪播
// setInterval(showSlides(n++),2000);
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3500); // Change image every 2 seconds
}


// // 跳轉到最上面
// var linkTop = document.querySelector('#linkTop')
// var topSection = document.querySelector('#topSection')

// function to(toEl) {
//     // toEl 为指定跳转到该位置的DOM节点
//     let bridge = toEl;
//     let body = document.body;
//     let height = 0;

//     // 计算该 DOM 节点到 body 顶部距离
//     do {
//         height += bridge.offsetTop;
//         bridge = bridge.offsetParent;
//     } while (bridge !== body)

//     // 滚动到指定位置
//     window.scrollTo({
//         top: height,
//         behavior: 'smooth'
//     })
// }

// linkTop.addEventListener('click', function () {
//     to(topSection)
// });

window.onscroll = function () {

  /*當瀏覽器捲軸往下捲100px*/
  const px = 650;
  if (document.body.scrollTop > px || document.documentElement.scrollTop > px) {
    document.getElementById('jumpTo').style.display = 'flex'
  }
  else{
    document.getElementById('jumpTo').style.display = 'none'
  }
};
window.onscroll();