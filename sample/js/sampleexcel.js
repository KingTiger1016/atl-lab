$(function () {
	$("#btn_submit").click(function(){
		// var json = $('#btbody').bootstrapTable('getData');
	    //呼叫ajax
		
		// 後端接資料要這樣的格式
		/*
		json.forEach(i=>{
			i["LoginUser"] = $('#LoginUser').val(); 
		})
		*/
		
		var data = $('#btbody').bootstrapTable('getData');
		data.forEach((i,j)=>{
			data[j]["ProjectNo"] = i.ProjectNo.trim();
			// data[j]["SampleName"] = i.SampleName.trim();
			data[j]["SampleType"] = i.SampleType.trim();

            if(typeof i.SampleNo=="undefined" || i.SampleNo.trim() == ""){
				data[j]["SampleNo"] = "-";
			}else{
				data[j]["SampleNo"] = i.SampleNo.trim();
			}
			
			if(typeof i.memo=="undefined" || i.memo.trim() == ""){
				data[j]["memo"] = "-";
			}else{
				data[j]["memo"] = i.memo.trim();
			}
			if(typeof i.warehouse=="undefined" || i.warehouse.trim() == ""){
				data[j]["warehouse"] = "-";
			}else{
				data[j]["warehouse"] = i.warehouse.trim();
			}
			if(typeof i.classify=="undefined" || i.classify.trim() == ""){
				data[j]["classify"] = "-";
			}else{
				data[j]["classify"] = i.classify.trim();
			}
			data[j]["LoginUser"] = $('#LoginUser').val();
		})
		
		var json = new Object();
		json["Data"] = data;
		json["DataType"] = "SaveSample";
		// console.log(json);
		ajaxPostData("(ajaxPostsampleexcel.jsonp)", json);
    });
	
	$("#btn_uploader").click(function(){
		window.open('_blank').location= hostip() + '/ap/inse_upl204.nsf/O/5649C28F30AB21D3482587C7000F2FF0?OpenDocument'
		// uploader("5649C28F30AB21D3482587C7000F2FF0")
    });
	
	$("#upload").click(function(){
		$('#btbody').bootstrapTable('removeAll');
		uploadfile();
		$('.btn.btn-default.fileupload-exists').click();
	});
	
    // 初始化
	setjsdatepicker();
	inittable();
	// 權限檢查
	checkrole('who',1);
	
}); // end ready

//權限檢查
function checkrole(jdata, flag){
	// 1:document ready
	// 2:callback
	if(flag===1){
		// ajaxPostData(name, json)
		console.log('第一次進程式');
	}else{
		console.log('判斷權限');
		if(jdata == '有權限'){
			$('#role_delete').show();
			$('#role_cancel').show();
		}else{
			$('#role_delete').hide();
			$('#role_cancel').hide();
		}
	}
}

// 設定初始化界面
function setjsdatepicker(){
	  var startDateTextBox = $('#dpStart');
	  var endDateTextBox = $('#dpEnd');
	  startDateTextBox.datepicker({ 
	  	dateFormat: 'yy/mm/dd',
	  	onClose: function(dateText, inst) {
	  		if (endDateTextBox.val() != '') {
	  			var testStartDate = startDateTextBox.datepicker('getDate');
	  			var testEndDate = endDateTextBox.datepicker('getDate');
	  			if (testStartDate > testEndDate)
	  				endDateTextBox.datepicker('setDate', testStartDate);
	  		}
	  		else {
	  			endDateTextBox.val(dateText);
	  		}
	  	},
	  	onSelect: function (selectedDateTime){
	  		endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate') );
	  	}
	  });
	  endDateTextBox.datepicker({ 
		dateFormat: 'yy/mm/dd',
	  	onClose: function(dateText, inst) {
	  		if (startDateTextBox.val() != '') {
	  			var testStartDate = startDateTextBox.datetimepicker('getDate');
	  			var testEndDate = endDateTextBox.datetimepicker('getDate');
	  			if (testStartDate > testEndDate)
	  				startDateTextBox.datetimepicker('setDate', testEndDate);
	  		}
	  		else {
	  			startDateTextBox.val(dateText);
	  		}
	  	},
	  	onSelect: function (selectedDateTime){
	  		startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate') );
	  	}
	  });
}

function inittable(){
	$('#btbody').bootstrapTable({
		columns:config["inittable"]
	});
}

// 上傳資料
function uploadfile() {
	var exceldata
    //Reference the FileUpload element.
    var fileUpload = $("#fileUpload")[0];
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof(FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function(e) {
                	ProcessExcel(e.target.result)
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function(e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    return ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("請使用chrome");
        }
    } else {
        alert("檔案無效或檔名不為英文或數字");
    }
};

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    excelRows = delrepeat(excelRows);
    $('#btbody').bootstrapTable('append', excelRows);
};

// 移除重複
function delrepeat(data){
	var arr = [];
	var returnarr = [];
	var str ='';
	var errmsg = '';
	data.forEach((i,j)=>{
		str =i.ProjectNo+i.SampleType+i.SampleName;
		if(jQuery.inArray( str, arr )!=-1){
			// console.log("樣品編號: "+i.SampleNo+" 重複");
		}else{
			if(i.SampleType.length==1){
				// console.log(i.SampleType)
				returnarr.push(i);
			}else{
				// alert("樣品類別錯誤，只能為A~Z")
				// console.log("樣品類別錯誤，只能為A~Z")
				errmsg+="第"+(j+1).toString()+"筆:樣品類別錯誤，只能為A~Z\n"
				// return false
			}
		}
		arr.push(str);
	})
	
	if(errmsg==''){
		return returnarr
	}else{
		alert(errmsg);
		return []
	}
	
}

//超出表格欄位
function cellStyle(value, row, index) {
	  return {
		  css: {
		    	"overflow":"hidden",
		    	"white-space":"nowrap",
		    	"text-overflow":"ellipsis"
		      }
	    }
	}

// 共用_呼叫ajax
function ajaxPostData(name, data){
	data = JSON.stringify(data)
	// console.log(data);
	data = data.replaceAll('{', ' ');
	data = data.replaceAll('}', ' ');
	// data = data.replaceAll('"', ' ');
	data = encodeURI(data,"UTF-8");
	// data = encodeURI(data,"UTF-8");
    try {
        $.ajax({
            url: name + "?OpenAgent",
            dataType: "jsonp",
            data:data,
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            type: "POST"
        })
    }
    catch(err) {
        alert(err.message)
    }
}

// 後端回傳資料會到這邊 callback
function callback(name, jdata){
	switch(name) {
	  case "GetUserRole":
		// checkrole(jdata, 2);
		checkrole('koko', 2);
		break;
	  case "SampleFinish":
		localStorage.setItem('uploaddata', jdata);
		if(jdata!=[]){
			$(window).attr('location','/ap/manage/sample.nsf/print?OpenForm');  
		}else{
			alert('上傳資料不正確，請重新上傳。')
			return false;
		}
		break;
	  case "SaveSample":
		// save
		var json = new Object()
		var jsonarr =[]
		jdata.forEach(i=>{
			json["ProjectNo"] = i.ProjectNo;
			json["SampleType"] = i.SampleType;
			json["SampleName"] = i.SampleName;
			json["warehouse"] = i.Warehouse;
			json["memo"] = i.memo;
			json["unid"] = i.unid;
			json["SampleNo"] = i.SampleNo;
			jsonarr.push(json);
			json={};
		})
		// console.log(jsonarr);
		alert('匯入成功，跳轉至列印畫面。');
		localStorage.setItem('uploaddata', JSON.stringify(jsonarr));
		$(window).attr('location','/ap/manage/sample.nsf/print?OpenForm');

		break;
	  default:
	    alert("callback錯誤:"+name)
		return false;
	}
}

function hostip(){
	var test = true;
	if(test){
		return "http://192.168.5.12";
	}else{
		return "https://hq.atl-lab.com.tw";
	}
	
}