// 待加入
/*
很多都是這樣格式 想說把他們統整在一起 就不用搞得很複雜了

// 選人
1.tablename
2.column
3.columns
function staff_receive(data){
	// console.log(data);
	var columns = config().col_staff
	$("#btreceive").bootstrapTable({
		columns:[columns.ck,columns.employeeID,columns.cDept,columns.cName,columns.eName],
		data:data
	})
	$("#btreceive").bootstrapTable('resetView')
}

*/

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
    $.blockUI({
        message: '<h1>請稍候...</h1>' 
    });
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