$(function() {
    var mySwiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination'
        }
    })

    $.ajax({
        url: "/api/list",
        dataType: "json",
        success: function(res) {
            console.log(res)
            if (res.code === 1) {
                var str = "";
                res.data.forEach(function(itm) {
                    str += "<li><img src=" + itm.img + "><p>" + itm.p + "</p><p>" + itm.em + "</p></li>"

                })
                $(".listl").html(str);
            }
        }
    })
})