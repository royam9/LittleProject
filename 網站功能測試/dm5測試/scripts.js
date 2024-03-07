function isIe() {
    return ("ActiveXObject" in window);
}

function isIe9() {
    return navigator.userAgent.indexOf("MSIE 9.0") > 0
}

function isIe8() {
    // alert(!-[1,])//->IE678返回NaN 所以!NaN为true 标准浏览器返回-1 所以!-1为false
    return isIe() && !-[1,] && document.documentMode;
}

function slide() {
    $('html,body').stop().animate({ scrollTop: 0 }, 500);
}


function showLoginModal() {
    $('.modal-wrap .login-modal').parents('.modal-wrap').css('display', 'table');
}

function removereads(userid) {
    $.post("/readHistory.ashx?t=" + new Date().getTime(), { uid: userid, action: "clearall" }, function (result) {
        var data = JSON.parse(result);
        if (data && data["Value"] === "1") {
            window.location.reload();
        } else {
            ShowDialog("清除记录失败，请重试");
        }
    });
}

//表单验证中文提示
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "../jquery.validate"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    /*
     * Translated default messages for the jQuery validation plugin.
     * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
     */
    $.extend($.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入 {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0} 个字符"),
        rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值")
    });

}));

$(function(){
    // banner_puzzle
    var bannerPuzzleSwiper = new Swiper('.banner_puzzle .swiper-container', {
        pagination: '.pagination',
        paginationClickable: true,
        autoplay: 3000,//可选选项，自动滑动
        loop: true//可选选项，开启循环
    })
});

$(document).ready(function () {
    // 登顶部登陆
    $('.js_header_login_btn').click(function (ev) {
        ev.stopPropagation()
        ev.preventDefault()
        showLoginModal()
    })

    var indexSwiper = new Swiper('.index-original .swiper-container', {
        loop: true,
        onSlideChangeStart: function (swiper) {
            $('.index-original-control a').removeClass('active');
            $('.index-original-control a').eq(swiper.activeIndex % 4 - 1).addClass('active');
        }
    })
    $('.index-original .index-original-arrow .left').on('click', function (e) {
        e.preventDefault()
        indexSwiper.swipePrev()
    })
    $('.index-original .index-original-arrow .right').on('click', function (e) {
        e.preventDefault()
        indexSwiper.swipeNext()
    })

    for (var i = 0; i < $('.index-original-control a').length; i++) {
        (function (a) {
            $('.index-original-control a').eq(a).click(function () {
                indexSwiper.swipeTo(a);
            });
        })(i);
    }

    // booklist
    $('.mh-list-swiper .swiper-container').each(function () {
        var num = $(this).find('.swiper-slide').length
        var $pagination = $(this).parents('.mh-list-swiper').prev().find('.head-pagination')
        var opt = {
            // autoplay : 5000,//可选选项，自动滑动
            loop: true,
            offsetPxBefore: 41,
            onSwiperCreated: function (swiper) {
                var $span = $pagination.find('span')
                $span.each(function (i) {
                    if (i % swiper.params.slidesPerGroup != 0) $(this).hide()
                })
            },
            onSlideChangeEnd: function (swiper) {
            }
        }
        if ($pagination.length != 0) {
            opt.pagination = $pagination.eq(0)[0]
        }
        var booklistSwiper = new Swiper($(this)[0], opt)
        $(this).parent().find('.prev').on('click', function (e) {
            e.preventDefault()
            booklistSwiper.swipePrev()
        })
        $(this).parent().find('.next').on('click', function (e) {
            e.preventDefault()
            booklistSwiper.swipeNext()
        })
        if (num <= 1) {
            booklistSwiper.destroy(false); //移除自动播放和键盘控制，保留屏幕尺寸变化事件
            $(this).parent().find('.prev').hide()
            $(this).parent().find('.next').hide()
        }
        //
        $(this).find('.mh-tip-wrap').mouseleave(function () {
            $(this).parents('.swiper-container').removeClass('inTop')
        }).mouseenter(function () {
            $(this).parents('.swiper-container').addClass('inTop')
        })
    })

    //封面效果
    if (isIe8()) {
        $('.mh-tip-wrap').hide();
        $(document).on('mouseenter', '.mh-item > .mh-cover', function () {
            $wrap = $(this).nextAll('.mh-tip-wrap')
            $wrap.addClass('active').show()
        })
        // 封面移入放大
        $(document).on('mouseenter', '.mh-tip-wrap', function () {
            $wrap = $(this)
            $wrap.addClass('active').show()
        })
        // 封面移出缩小
        $(document).on('mouseleave', '.mh-tip-wrap', function () {
            $wrap = $(this) //.find('.mh-tip-wrap');
            $wrap.removeClass('active').hide()
        })
    } else {
        $(document).on('mouseenter', '.mh-tip-wrap', function () {
            $wrap = $(this)
            $wrap.addClass('active')
        })
        // 封面移出缩小
        $(document).on('mouseleave', '.mh-tip-wrap', function () {
            $wrap = $(this) //.find('.mh-tip-wrap');
            $wrap.removeClass('active')
        })
    }

    // 排行榜封面
    var isFirstEnter = true;
    var mh_itme_top_initCss = {
        left: { opacity: 0, 'margin-left': '-100px' },
        right: { opacity: 0, left: 'auto', right: '100%', 'margin-left': '0', 'margin-right': '-100px' }
    };
    $(document).on('mouseenter', '.mh-itme-top', function () {
        var isR = $(this).parents('li').index() % 3 == 2 && $(window).width() < 1420;
        if (isR) {
            $(this).find('.mh-tip-wrap')
                .show()
                .css(mh_itme_top_initCss.right)
            //mh_itme_top_initCss.right = { opacity: 1, 'margin-right': '0px' };
            if (isFirstEnter) {
                $(this).find('.mh-tip-wrap')
                    .animate({ opacity: 1, 'margin-right': '0px' });
            }
            else {
                $(this).find('.mh-tip-wrap')
                    .css({ opacity: 1, 'margin-right': '0px' });
            }
            isFirstEnter = false;

        } else {
            $(this).find('.mh-tip-wrap')
                .show()
                .css(mh_itme_top_initCss.left)
            //mh_itme_top_initCss.left = { opacity: 1, 'margin-left': '0px' };
            if (isFirstEnter) {
                $(this).find('.mh-tip-wrap')
                    .animate({ opacity: 1, 'margin-left': '0px' });
            }
            else {
                $(this).find('.mh-tip-wrap')
                    .css({ opacity: 1, 'margin-left': '0px' });
            }
            isFirstEnter = false;
        }

    }).on('mouseleave', '.mh-itme-top', function () {
        $(this).find('.mh-tip-wrap').hide()
    })
    $(document).on('mouseleave', '.top-cat li', function () {
        isFirstEnter = true;
        setTimeout(function () {
            mh_itme_top_initCss = {
                left: { opacity: 0, 'margin-left': '-100px' },
                right: { opacity: 0, left: 'auto', right: '100%', 'margin-left': '0', 'margin-right': '-100px' }
            }
        }, 1)
    })



    // 日漫
    $('.box-con-5n1 .detail-tabs li').mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active')
        var panes = $(this).parents('.box-con-5n1').find('.detail-tabs-pane')
        panes.fadeOut()
        panes.eq($(this).index()).fadeIn()
    })

    // box tabs
    $('.box .box-header .js-tabs a').mouseover(function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        if ($(this).hasClass('active')) return
        var $box = $(this).parents('.box');
        var $pane = $box.find('.js_box_pane')
        var $tabs_a = $(this).parents('.js-tabs').find('a');
        var index = $(this).parents('li').index()
        $tabs_a.removeClass('active')
        $(this).addClass('active')
        $pane.fadeOut();
        $pane.eq(index).fadeIn(function () {

        });
        var $waterwheel = $pane.eq(index).find('.box-cat-waterwheel .carousel')
        if (typeof $waterwheel.data('waterwheelOpt') == 'object') {
            $waterwheel.waterwheelCarousel($waterwheel.data('waterwheelOpt'))
            $waterwheel.data('waterwheelOpt', false)
        }
        // 修改更多按钮跳转地址
        $(this).parents('.js-tabs').next().find('.more').prop('href', $(this).prop('href'));
    })

    // 展开收起选项
    $('.cat-filter .footer-btn').click(function () {
        var $btn_text = $(this).find('span');
        var $btn_icon = $(this).find('i')
        $('.cat-filter .field-wrap').slideToggle(function () {
            if ($(this).is(':visible')) {
                $btn_text.text('收起选项');
                $btn_icon.removeClass().addClass('icon icon-arrow-up')
            } else {
                $btn_text.text('展开选项');
                $btn_icon.removeClass().addClass('icon icon-arrow-down')
            }
        })
    })

    //

    // 关闭弹窗
    $(document).on('click', '.modal-wrap .close', function () {
        $(this).parents('.modal-wrap').hide()

    })

    //底部贴底
    function fixFooter() {
        var foot = $('footer.footer')
        if (foot.length == 0) return
        if (!foot.hasClass('fixed')) { //未浮动
            var _end = foot.offset().top + foot.height() + 55;
            if (_end < $(window).height()) foot.addClass('fixed')
        } else {
            var _end = $(document.body).outerHeight(true)
            if (_end + foot.height() + 55 > $(window).height()) foot.removeClass('fixed')
        }
    }

    //FIX顶部小屏显示不全
    function fixHeader() {
        $(window).scroll(function () {
            $('header.header').css('left', (0 - $(window).scrollLeft()) + 'px')
        })
    }

    $(window).resize(function () {
        fixFooter();
    })
    fixHeader();
    fixFooter();

    //刷新验证码
    $(document).on('click', '.reloadimg', function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        $('.js_verify_img').attr('src', $(this).attr('reg-href') + '?&_=' + new Date().getTime())
    })


    //搜索框显示切换事件
    $('.header-search-list li').mouseover(function () {
        $('.header-search-list li').removeClass('active');
        $(this).addClass('active');
        if ($(this).parent().find('.type_2').length > 0) {
            $(this).parent().find('.type_2').hide();
            $(this).parent().find('.type_1').css('display', 'block');
            $(this).find('.type_2').show();
            $(this).find('.type_1').hide();
        }

    });
})

// banner waterwheel
$(document).ready(function () {
    var carousel = $(".banner_waterwheel .carousel").waterwheelCarousel({
        flankingItems: 2,
        opacityMultiplier: 1,
        autoPlay: 3000,
        forcedImageWidth: 240,
        forcedImageHeight: 320,
        separation: 370,
        separationMultiplier: .4,
        sizeMultiplier: 0.9,
        movedToCenter: function ($item) {
            var id = $item.attr('reg-id')
            $('.banner_waterwheel .waterwheel-body.active').removeClass('active').fadeOut()
            $('.banner_waterwheel .waterwheel-body[reg-id="' + id + '"]').addClass('active').fadeIn()
        }
    });
    $('.banner_waterwheel .prev-btn').bind('click', function () {
        carousel.prev();
        return false
    });

    $('.banner_waterwheel .next-btn').bind('click', function () {
        carousel.next();
        return false;
    });

    $('.box-cat-waterwheel .carousel').each(function () {
        var _waterwheelOpt = {
            flankingItems: 1,
            opacityMultiplier: 1,
            forcedImageWidth: 230,
            forcedImageHeight: 310,
            sizeMultiplier: .86,
            horizon: 165,
            activeBorder: "10px",
            movedToCenter: function ($item) {
                var $wrap = $item.parents('.box-cat-waterwheel')
                var index = $item.parent().index()
                $wrap.find('.waterwheel-body .pane.active').removeClass('active').fadeOut()
                $wrap.find('.waterwheel-body .pane').eq(index).addClass('active').fadeIn()
            }
        }
        if ($(this).is(':visible')) {
            $(this).waterwheelCarousel(_waterwheelOpt)
        } else {
            $(this).data('waterwheelOpt', _waterwheelOpt)
        }
    })
});

// vip 等级图
$(document).ready(function () {
    if (isIe8()) return
    $('.vip-rand-chart').each(function () {
        var $canvas = $(this).find('canvas');
        var canvas = $canvas[0]
        var w = $canvas.width();
        var h = $canvas.height();
        var ctx = canvas.getContext("2d");
        var image = $(this).find('.canvas-bg img').eq(0)[0]
        canvas.width = w
        canvas.height = h
        if (image.complete) {
            start.call(image);
        } else {
            $(image).one('load', start);
        }

        function getNaturalSize(src) {
            var img = new Image();
            img.src = src;
            return {
                width: img.width,
                height: img.height
            };
        }

        function start() {
            var imgWH = getNaturalSize(this.src)
            ctx.drawImage(this, 0, 0, imgWH.width, imgWH.height,
                0, 0, w, h);
            render()
        }

        function colorRGB2Hex(imageData) {
            var rgba = imageData.data
            var r = parseInt(rgba[0]);
            var g = parseInt(rgba[1]);
            var b = parseInt(rgba[2]);
            var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            return hex;
        }

        function render() {
            var $td = $('.vip-rand-chart').find('td');
            var pLeft = $('.vip-rand-chart').offset().left;
            $td.each(function () {
                var $line = $(this).find('.rand-line')
                var _left = $line.offset().left;
                var offsetLeft = _left - pLeft
                var imageData = ctx.getImageData(offsetLeft, 1, 1, 1)
                var color = colorRGB2Hex(imageData)
                $(this).css('color', color)
                $line.css('border-left', '1px dashed ' + color)
            })
        }


    })
})

$(function () {
    if ($(window).width() < 1420) {
        $('.index-right-float').hide();
        $('.top-menu').hide();
    }
});

window.onresize = function () {
    if ($(window).width() < 1420) {
        $('.index-right-float').hide();
        $('.top-menu').hide();
    } else {
        $('.index-right-float').show();
        $('.top-menu').show();
    }
};
