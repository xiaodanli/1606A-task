function ajax(opt) {
    //console.log(opt.url)
    var json = opt || {}; //判断是否有传入参数 如果opt没有传入参数的话会返回undefined出现报错情况
    var url = json.url;
    if (!url) {
        return;
    }
    //console.log(url)
    var method = json.method || "get"; //设置默认的请求方式
    var async = json.anync || true; //设置默认的异步
    var data = json.data || {};
    var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xml.open(method, url, async);
    xml.onload = function(res) {
        //console.log(res.target)
        //console.log(method)
        if (res.target.status === 200) {
            json.success(res.target.response)
        }
    }
    switch (method.toUpperCase()) {
        case "GET":
            xml.send();
            break;
        case "POST":
            xml.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xml.send(formatData(data))
    }

}