$(".footerlist").on("click", "dl", function() {
    $(this).addClass("ac").siblings().removeClass("ac");
})