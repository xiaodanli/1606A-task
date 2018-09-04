$(function() {
    var mySwiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination'
        }
    })
    var list = document.querySelector(".headerlist");
    var liw = list.children[0].offsetWidth;
    var len = list.children.length;
    list.style.width = liw * len + 'px';
    var Bscroll = new BScroll('#header', {
        scrollX: true
    })
})