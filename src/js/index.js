$.ajax({
    url: '/api/list',
    success: function(res) {
        res = JSON.parse(res);
        var html = '';
        res.forEach(function(file) {
            html += '<li><a href="javascript:void(0)">' + file.tit + '</a></li>';
        })
        $('.lists>ul').html(html);
        var bs = new BScroll('.lists', {
            scrollX: true,
            click: true,
            probeType: 2
        });
        $('.list ul li').on('click', 'a', function() {
            $(this).addClass('active').parent().siblings().children().removeClass('active');
        })
    }
})

var swiper = new Swiper('.banner', {
    autoplay: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination'
    }
});