function formatData(data) {
    var arr = [];
    for (var i in data) {
        arr.push(i + "=" + data[i])
    }
    return arr.join("&");
}