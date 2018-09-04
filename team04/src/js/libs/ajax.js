function ajax(opt) {
    //扩展
    var json = opt || {};
    var url = json.url;
    if (!url) {
        return;
    }
    var type = json.type || 'get';
    var sync = json.sync || true;
    var data = json.data || {};
    //创建对象
    var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.Xmlhttp');
    //建立连接
    xml.open(type, url, sync);
    //响应
    xml.onload = function(res) {
            if (res.target.status === 200) {
                console.log(res.target.response);
                try {
                    json.success && json.success(JSON.parse(res.target.response));
                } catch (e) {
                    json.success && json.success(res.target.response);
                }

            }
        }
        //发送请求
    switch (type.toUpperCase()) {
        case 'GET':
            xml.send();
            break;
        case 'POST':
            xml.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xml.send(formatDate(data));
    }
}

function formatDate(data) {
    var arr = [];
    for (var i in data) {
        arr.push(i + '=' + data[i]);
    }
    return arr.join('&');
}