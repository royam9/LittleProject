var Cpage = 0;
// console.log(document.getElementsByClassName('nowPage')[0].innerHTML);
document.getElementsByClassName('nowPage')[0].innerText =
    `${Cpage + 1}/${document.getElementsByClassName("Chide").length}`

// 上一頁下一頁
var flag = true;

function nextPage() {
    if (Cpage < (document.getElementsByClassName("Chide").length) - 1) {
        document.getElementsByClassName("Chide")[Cpage].style.display = 'none'
        Cpage++;
        document.getElementsByClassName("Chide")[Cpage].style.display = 'block'
        flag = false;
        // 轉換頁數
        document.getElementsByClassName('nowPage')[0].innerText =
            `${Cpage + 1}/${document.getElementsByClassName("Chide").length}`
        // document.getElementsByClassName('nowPage').innerHTML = '1'
    } else { alert('本章已結束') }
}

function prePage() {
    if (Cpage > 0) {
        document.getElementsByClassName("Chide")[Cpage].style.display = 'none'
        Cpage--;
        document.getElementsByClassName("Chide")[Cpage].style.display = 'block'
        flag = false;
        // 轉換頁數
        document.getElementsByClassName('nowPage')[0].innerText =
            `${Cpage + 1}/${document.getElementsByClassName("Chide").length}`
    } else {
        alert('此頁為本章開頭')
    }
}

// 把flase改成true
setInterval(change, 10);
function change() {
    if (flag) {
    } else {
        flag = true;
    }
};

// 往上動畫
function gotop(gootop) {
    if (flag) {
        gootop.currentTarget.querySelector(".nowPage")
            .classList.toggle('gotop');
        flag = true;
    }
}
document.querySelector('.clickWrap')
    .addEventListener('click', gootop => gotop(gootop))

// 往下動畫
function godown(goodown) {
    // console.log(    event.currentTarget.querySelector(".EPinformation")
    // );
    if (flag) {
        goodown.currentTarget.querySelector(".EPinformation")
            .classList.toggle('godown')
    }
}

document.querySelector('.clickWrap')
    .addEventListener('click', goodown => godown(goodown))

// ↑問題是我clickWrap想換成其他板塊，gotop跟godown就會報錯


// 測試
// document.getElementsByClassName("Chide")[1].style.display = 'block'
// console.log(document.querySelector('.showMenu'))




// 研究失敗的按鈕響應
// function keybo() {
//     key = event.keycode;
//     switch (key) {
//         case 37:
//             nextPage();
//             break;
//         case 39:
//             prePage();
//             break;
//     }
// }
// document.onkeydown = keybo;
