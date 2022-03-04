// 變更網址使用
function hostip() {
    var test = true;
    if (test) {
        return "http://192.168.5.15";
    } else {
        return "https://hq.atl-lab.com.tw";
    }
}

// 共用_呼叫ajax
function ajaxPostData(name, data) {
    data = JSON.stringify(data)
    data = data.replaceAll('{', ' ');
    data = data.replaceAll('}', ' ');
    // data = data.replaceAll('"', ' ');
    data = encodeURI(data, "UTF-8");
    // data = encodeURI(data,"UTF-8");
    try {
        $.ajax({
            url: name + "?OpenAgent",
            dataType: "jsonp",
            data: data,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            type: "POST"
        })
    } catch (err) {
        alert(err.message)
    }
}