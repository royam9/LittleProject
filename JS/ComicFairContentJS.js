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