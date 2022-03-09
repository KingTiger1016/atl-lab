$(function () {
    
	$("#btn_yes").click(function(){
		// 按下新增名片後變更onclick
		$(".btn.btn-primary").attr('onclick', 'savecardDoc("(ajaxPostCardData.jsonp)")')
        // console.log('check_yes');
		agreeModal();
    });
	
	$("#btn_no").click(function(){
		// 按下新增名片後變更onclick
		$(".btn.btn-primary").attr('onclick', 'savecardDoc("(ajaxPostCardData.jsonp)")')
        // console.log('check_no');
		agreeModal();
    });
    
	$("#btn_modify").click(function(){
    	// modify("modify");
    });
		
	
	$("#btn_insert").click(function(){
		let searchParams = new URLSearchParams(window.location.search)
		let unid = searchParams.get('unid')
		var json = new Object();
		json["LoginUser"] = $('#LoginUser').val();
		json['DataType'] = "sampleinsert";
		json['unid'] = unid;
		json['Flag'] = "insert";
		ajaxPostData("(ajaxPostsampleStatus.jsonp)", json)
	});
	
	$("#btn_return").click(function(){
		let searchParams = new URLSearchParams(window.location.search)
		let unid = searchParams.get('unid')
		var json = new Object();
		json["LoginUser"] = $('#LoginUser').val();
		json['DataType'] = "samplereturn";
		json['unid'] = unid;
		json['Flag'] = "return";
		ajaxPostData("(ajaxPostsampleStatus.jsonp)", json)
	});
		
	$("#btn_inStockName").click(function(){
		var json = new Object();
	    json["DataType"] = "inStockName";
	    ajaxPostData("(ajaxGetATLstaff.jsonp)",json)
	});
	
    $("#btn_cancel").click(function(){
    	modify("cancel");
    });
    
    $("#txt_ProjectNo").focusout(function(){
    	var jdata = new Object();
    	jdata["ProjectNo"]=$("#txt_ProjectNo").val();
    	jdata["DataType"]="GetProjectNo";
    	ajaxPostData("(ajaxGetProjectNo.jsonp)",jdata);
    });
    
    // 抓取該案件編號底下的資料
    $("#btn_ProjectNo").click(function(){
    	var json = new Object();
    	json["ProjectNo"]=$("#txt_ProjectNo").val();
    	json["DataType"]="GetSDataByProject";
    	json["LoginUser"] = $('#LoginUser').val();
    	// console.log(json)
    	ajaxPostData("(ajaxGetSDataByProject.jsonp)",json);
    })
    
	initmodel()
	
	// 判斷關閉條件
	initform();
}); // end ready

function initmodel(){
	var today = new Date();
	var hour = today.getHours();
	var mindate = 0
	if(hour>=16){mindate=1}
	$('#txt_inStockDate').datepicker({
		maxDate:mindate,
		'dateFormat':'yy/mm/dd'
	}).datepicker("setDate", new Date());
	
	$('#txt_returnDate').datepicker({
		'dateFormat':'yy/mm/dd'
	}).datepicker("setDate", new Date());
	
	$('#txt_createDate').datepicker({
		dateFormat:'yy/mm/dd',
		maxDate:0,
		minDate:0
    }).datepicker("setDate",'now').prop('disabled', true);
	$("#txt_CreateName").val($("#LoginUser").val().split("/")[0].split("=")[1])
	
	var data = [
	  {
	    children: [
    	  {
		    id:"A", text:"A 『主』測試物件(EUT)", selected:true
		  },
		  {
		    id:"B", text:"B 電池(Battery)"
		  },
		  {
		    id:"C", text:"C 充電器(Adapter)"
		  },
		  {
		    id:"D", text:"D 傳輸線 (USB Cable)"
		  },
		  {
		    id:"E", text:"E 耳機"
		  },
		  {
		    id:"F", text:"F RF Cable"
		  },
		  {
		    id:"G", text:"G RS232 Cable"
		  },
		  {
		    id:"H", text:"H HDMI Cable"
		  },
		  {
		    id:"I", text:"I AV I/O Cable"
		  },
		  {
		    id:"J", text:"J RJ45網路線"
		  },
		  {
		    id:"K", text:"K Audio cable音源線"
		  },
		  {
		    id:"L", text:"L D-Sub(VGA) Cable"
		  },
		  {
		    id:"M", text:"M 模組(Module)"
		  },
		  {
		    id:"N", text:"N RJ11電話線"
		  },
		  {
		    id:"O", text:"O 轉接線（頭）"
		  },
		  {
		    id:"P", text:"P 電源線(Power"
		  },
		  {
		    id:"R", text:"R 轉板(治具)"
		  },
		  {
		    id:"S", text:"S 假電池"
		  },
		  {
		    id:"T", text:"T 天線"
		  },
		  {
		    id:"U", text:"U 支架(支撐架)"
		  },
		  {
		    id:"V", text:"V 搖控器"
		  },
		  {
		    id:"W", text:"W 背夾/背蓋"
		  },
		  {
		    id:"X", text:"X 座充"
		  },
		  {
		    id:"Y", text:"Y 車充"
		  },
		  {
		    id:"Z", text:"Z 充電夾(※對主產品進行「充電」「供電」)"
		  },
		  {
		    id:"Q", text:"Q 其他………"
		  },
		]
	  }
	];
	
	$('#s1_basic').select2({
		"data": data,
		allowClear: true,
		placeholder: "Select...",
		width:"100%"
	})
    
	$('#s2_basic').select2({
		"data": data,
		allowClear: true,
		placeholder: "Select...",
		width:"100%"
	})
	
	$('#s3_basic').select2({
		"data": data,
		allowClear: true,
		placeholder: "Select...",
		width:"100%"
	})
	
	// 預設隱藏欄位
	$('#txt_returnDate').hide();
	$('#txt_returnName').hide();
	$('#btn_returnDate').hide();
	$('#btn_returnName').hide();
	
	$('#btn_insert').hide();
	$('#btn_return').hide();
	$('#btn_modify').hide();
	$('#btn_cancel').hide();
	$('.inittitle').hide();
	$("#btn_yes").hide();
	$("#btn_no").hide();
	$("#btn_ProjectNo").prop('disabled', true);
	$("#txt_ProjectNo").prop('readonly', false);
	
	info([{
		logAction:"New",
		logMemo:"建立新樣品文件",
		logTime:"Now",
		logWho:$("#LoginUser").val()
	}]);
	
	var json = new Object()
	json["LoginUser"] = $('#LoginUser').val();
	json["DataType"]="GetSaleAssistant";
	ajaxPostData("(ajaxGetSaleAssistant.jsonp)", json);
	
}

// 讀網址及叫後後台傳資料
function initform(){
	let searchParams = new URLSearchParams(window.location.search)
	if(searchParams.has('unid')){
		let unid = searchParams.get('unid')
		// 全部鎖起來
		$("input").prop('disabled', true);
		$("#s1_basic").prop('disabled', true);
		$("#btn_returnName").prop('disabled', true);
		$("#btn_inStockName").prop('disabled', true);
		$("#btn_ProjectNo").prop('disabled', true);		
		$("#classify").prop('disabled', true);
		$('#txt_returnDate').show();
		$('#txt_returnName').show();
		$('.inittitle').show();
		$('#btn_returnDate').show();
		$('#btn_returnName').show();
		$('#btn_cancel').show();
		$('#btn_modify').show();
		$("#btn_submit").hide();
		$('#btn_insert').hide();
		$('#btn_return').hide();
		
		var json = new Object()
		json['unid'] = unid;
		json["LoginUser"] = $('#LoginUser').val();
		json['DataType'] = "GetSampleData";
		ajaxPostData("(ajaxGetSampleData.jsonp)", json)
	}
}

// ajax回傳資料回來
function insertdata(jdata){
	// console.log(jdata);
	$("#txt_createDate").val(jdata.sysCreated);
	$("#txt_Owner").val(jdata.currentOwner.split("/")[0].split("=")[1]);
	$("#txt_CreateName").val(jdata.sysAuthor.split("/")[0].split("=")[1]);
	$("#txt_SampleNo").val(jdata.sampleNo);
	$("#txt_ProjectNo").val(jdata.projectNo);
	$("#txt_PriceNo").val(jdata.quoNo);
	$("#txt_CustomNo").val(jdata.custNo);
	$("#txt_CustomName").val(jdata.custName);
	$("#txt_Sales").val(jdata.ownSales);
	
	// $("#txt_assales").val(jdata.ownAssistant);
	// 看James怎麼回傳
	$("#txt_assales").select2().val(jdata.ownAssistantID+"|"+jdata.ownAssistant).trigger("change");
	
	$("#txt_PM").val(jdata.ownPM);
	$("#txt_Ware").val(jdata.sampleLocation);
	$("#txt_inStockDate").val(jdata.inStockDate.split(" ")[0]);
	$("#txt_inStockName").val(jdata.inStockName.split("/")[0].split("=")[1]);
	$("#txt_returnDate").val(jdata.returnDate.split(" ")[0]);
	$("#txt_returnName").val(jdata.returnName.split("/")[0].split("=")[1]);
	$("#txt_SampleName").val(jdata.sampleName);
	$('#classify').val(jdata.classify);
	$("#s1_basic").select2().select2('val',jdata.sampleType);
	$("#txt_Memo").val(jdata.memo);
	

	// 新增資料
	// console.log(jQuery.parseJSON(jdata.syslogs.replaceAll("'",'"')));
	info(jQuery.parseJSON(jdata.syslogs.replaceAll("'",'"')).reverse());
	if(jdata.mutiFlag=="1"){
		// $("#btn_yes").show();
		// $("#btn_no").show();
		$('#txt_returnDate').show();
		$('#txt_returnName').show();
		$('#btn_returnDate').show();
		$('#btn_returnName').show();
		$('.inittitle').show();
	}
	
	if($("#LoginUser").val().split("/")[0].split("=")[1]==$("#txt_Owner").val()){
		modify("modify");
	}
	
	if($("#sampleSetting").val()=="1"){
		$('#btn_insert').show();
		$('#btn_return').show();
		$('#btn_cancel').show();
	}else{
		$('#btn_insert').hide();
		$('#btn_return').hide();
		$('#btn_cancel').hide();
	}
	
	if(jdata.returnName == ""){
		$('#btn_return').show();
	}else{
		$('#btn_return').hide();
		$('#btn_cancel').hide();
	}
	
	// 作廢 or 退樣
	if(jdata.voidFlag=="1" || jdata.returnFlag != ""){
		$("li button").hide();
		$("#btn_submit").hide();
		$("#btn_close").show();
	}
	
	
	
	
	
	
	/*
	if(jdata.inStockName == ""){
		$('#btn_insert').show();
	}else{
		$('#btn_insert').hide();
	}
	*/
	
}

// modify
function modify(option){
	switch (option){
		case "modify":
			// 編輯，要顯示送出。
			$("#btn_submit").attr('onclick', 'savemodify()')
			$("#btn_submit").show();
			$("#txt_Memo").prop('disabled', false);
			$("#txt_Ware").prop('disabled', false);
			$('#btn_ProjectNo').prop('disabled', false);
			$("#txt_SampleName").prop('disabled', false);			
			$("#classify").prop('disabled', false);
			$("#txt_assales").prop('disabled', true);
			// 樣品名稱的修改功能開放給業助及客服使用 20220308
			if($("#sampleNameFlag").val()=="0"){$("#txt_SampleName").prop('disabled', true);};
			// 歸類的修改功能開放給業助及客服及FAE(youci.chang, wllie.luo)使用
			if($("#sampleClassifyFlag").val()=="0"){$("#classify").prop('disabled', true);};
			break;
		default:
			// cancel 或 delete
			var json = new Object()
			if (option == "cancel"){
				if (confirm('確定要作廢嗎?')) {
					let searchParams = new URLSearchParams(window.location.search)
					unid = searchParams.get('unid')
					var json = new Object()
					json['unid'] = unid;
					json["LoginUser"] = $('#LoginUser').val();
					json['DataType'] = "PostsampleVoid";
					ajaxPostData("(ajaxPostsampleVoid.jsonp)", json)
				}
			}else{
				if (confirm('確定要刪除嗎?')) {
					json["sDocFlag"] = "Del";
				}
			}
			
	} // switch
} // function

// 編輯後儲存
function savemodify(){
	let searchParams = new URLSearchParams(window.location.search)
	unid = searchParams.get('unid')
    var txt_Ware = $('#txt_Ware').val().trim()
    var txt_Memo = $('#txt_Memo').val().trim()
	var classify = $('#classify').val()
	var txt_SampleName = $('#txt_SampleName').val().trim()
	
	if(txt_Ware==""){alert("庫位不得為空白");return false;}
	if(txt_SampleName==""){alert("樣品名稱不得為空白");return false;}
	
    //組JSON字串後傳
    var json = new Object()
    json["LoginUser"] = $('#LoginUser').val();
    json["DataType"]="SaveModifySample";
    json["unid"] = unid;
    json["location"] = txt_Ware;
    json["samplename"] = txt_SampleName;
    json["classify"] = classify
    json["memo"] = txt_Memo;
    // console.log(json);
	ajaxPostData("(ajaxPostsampleEditData.jsonp)", json)
}

// 異動紀錄
function info(data){
	/*
	data=[{
		logWho:"JamesTsai/ATL",
		logAction:"動作",
		logTime:"2021/10/21 10:15",
		logMemo:"備註"
	}];
	*/
	// console.log(data);
	var text='';
	data.forEach(i => {
		text += '<div class="feed-item feed-item-bookmark">';
		text += '<div class="feed-icon">';
		text += '<i class="fa fa-bookmark"></i>';
		text += '</div> <!-- /.feed-icon -->';
		text += '<div class="feed-subject">';
		text += '<p>'+ i.logWho.split("/")[0].split("=")[1] +'</p>'; 
		text += '<p>動作:'+ i.logAction +'<hr>備註:'+ i.logMemo +'</p>';
		text += '</div> <!-- /.feed-subject -->';
		text += '<div class="feed-content">';
		text += '</div> <!-- /.feed-content -->';
		text += '<div class="feed-actions">';
		text += '<a href="javascript:;" class="pull-right"><i class="fa fa-clock-o"></i>'+ i.logTime +'</a>';
		text += '</div> <!-- /.feed-actions -->';
		text += '</div> <!-- /.feed-item -->';
	});
	$("#profile").empty();
	$("#profile").append(text);
}

//共用_呼叫ajax
function ajaxPostData(name, data){
	data = JSON.stringify(data)
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
	  case "GetSaleAssistant":
		  // console.log(jdata);
		  var data = {};
		  var children = [];
		  jdata.forEach((i,j)=>{
			  children.push({
				  id:i.notesID + "|" + i.cName,
				  text:i.cName
			  })
		  })
		  data = [{
				  children:children
		  }]
		  
		  $('#txt_assales').select2({
			"data": data,
			allowClear: true,
			placeholder: "Select...",
			width:"100%"
		  })
		  break;
	  case "GetSampleData":
		  insertdata(jdata[0]);
		  break;
	  case "GetProjectNo":
		  returnGetProjectNo(jdata)
	      break;
	  case "GetSDataByProject":
		  GetSDataByProject(jdata);
		  break;
	  case "GetUserData":
		$('#btselect').bootstrapTable('append',jdata)
	      break;
	  case "inStockName":
		  inStockName(jdata);
		  break;
	  case "samplereturn":
		  if(jdata[0].msg=="success"){
			    alert("退樣成功。")
			    $(window).attr('location','/ap/manage/sample.nsf/sampleindex?OpenForm');
			  }else{
				alert('系統異常，請洽尋資訊。錯誤訊息:samplereturn');
			  }
		  break;
	  case "sampleinsert":
		  if(jdata[0].msg=="success"){
			    alert("入庫成功。")
			    $(window).attr('location','/ap/manage/sample.nsf/sampleindex?OpenForm');
			  }else{
				alert('系統異常，請洽尋資訊。錯誤訊息:samplereturn');
			  }
		  break;
	  case "PostsampleVoid":
		  if(jdata[0].msg=="success"){
		    alert("作廢成功。")
		    $(window).attr('location','/ap/manage/sample.nsf/sampleindex?OpenForm');
		  }else{
			alert('系統異常，請洽尋資訊。錯誤訊息:PostsampleVoid');
		  }
		  break;
	  case "GetUserRole":
		  // checkrole(jdata, 2);
		  //checkrole('koko', 2);
		  break;
	  case "SaveSample":
		// save
		// console.log(jdata);
		if(jdata[0].success=="success"){
			var json = new Object()
		    json["ProjectNo"] = $('#txt_ProjectNo').val();
			json["SampleType"] = $('#s1_basic').val();
			json["SampleName"] = $('#txt_SampleName').val();
			json["warehouse"] = $('#txt_Ware').val();
			json["memo"] = $('#txt_Memo').val();
			json["unid"] = jdata[0].unid;
			json["SampleNo"] = jdata[0].custNo;
			localStorage.setItem('uploaddata', "["+JSON.stringify(json)+"]");
			$(window).attr('location','/ap/manage/sample.nsf/print?OpenForm');
		}else{
			alert('系統異常，請洽尋資訊。錯誤訊息:SampleInsert');
		}
		break;
	  case "SaveModifySample":
		// save
		// console.log(jdata);
		if(jdata[0].success=="success"){
			$(window).attr('location','/ap/manage/sample.nsf/sampleindex?OpenForm');
		}else{
			alert('系統異常，請洽尋資訊。錯誤訊息:SampleInsert');
		}
		break;
	  default:
		// $(window).attr('location','/ap/manage/sample.nsf/sampleindex?OpenForm');
		console.log(jdata)
		return false;
	}
}

// 選人
function inStockName(data){
	// console.log(data);
	var columns = {
		    ck: {
		        field: 'ck',
		        checkbox: true
		    },
		    cDept: {
		        field: 'cDept',
		        title: '部門',
		        sortable: true,
		        order: 'desc',
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    },
		    cName: {
		        field: 'cName',
		        title: '中文姓名',
		        sortable: true,
		        order: 'desc',
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    },
		    eName: {
		        field: 'eName',
		        title: '英文姓名',
		        sortable: true,
		        order: 'desc',
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    },
		    employeeID: {
		        field: 'employeeID',
		        title: '員工編號',
		        sortable: true,
		        order: 'desc',
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    }
	}
	$("#btinStockName").bootstrapTable({
		columns:[columns.ck,columns.employeeID,columns.cDept,columns.cName,columns.eName],
		data:data
	})
}

// 樣品選擇
function GetSDataByProject(data){
	// console.log(data);
	var columns = {
		    sampleNo: {
		        field: 'sampleNo',
		        title: '樣品編號',
		        sortable: true,
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    },
		    sampleName: {
		        field: 'sampleName',
		        title: '樣品名稱',
		        sortable: true,
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    },
		    sampleLocation: {
		        field: 'sampleLocation',
		        title: '庫位',
		        sortable: true,
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    },
		    currentOwner: {
		        field: 'currentOwner',
		        title: '目前擁有者',
		        sortable: true,
		        filterControl: 'input',
		        cellStyle: "cellStyle"
		    }
	}
	
	data.forEach((i,j) => {
		data[j]["currentOwner"] = i.currentOwner.split("/")[0].split("=")[1]
	});
	
	$("#btProjectNo").bootstrapTable({
		columns:[columns.sampleNo,columns.sampleName,columns.sampleLocation,columns.currentOwner],
		data:data
	})
}

// txt回傳填入
function returnGetProjectNo(data){
	// 回傳資料判斷
	if(data.length==0){
		// 沒有抓到資料
		$('#txt_PriceNo').val(null);
		$('#txt_CustomNo').val(null);
		$('#txt_CustomName').val(null);
		$('#txt_Sales').val(null);
		$('#txt_assales').val(null);
		$('#txt_PM').val(null);
		$('#btn_ProjectNo').prop('disabled', true);
	}else{
		// 有抓到資料
		$('#txt_PriceNo').val(data[0].quoNo);
		$('#txt_CustomNo').val(data[0].custNo);
		$('#txt_CustomName').val(data[0].custName);
		$('#txt_Sales').val(data[0].sales);
		// $('#txt_assales').val(data[0].assales);
		$('#txt_PM').val(data[0].pm);
		$('#btn_ProjectNo').prop('disabled', false);
		// 暫存資料
		$('#eut_name').val(data[0].eut_name);
		$('#eut_model').val(data[0].eut_model);
	}
	
}


// 存檔
function savecardDoc() {
    //欄位檢查
    var txt_ProjectNo = $('#txt_ProjectNo').val()
    var txt_PriceNo = $('#txt_PriceNo').val()
    var txt_CustomNo = $('#txt_CustomNo').val()
    var txt_CustomName = $('#txt_CustomName').val()
    var txt_Sales = $('#txt_Sales').val()
    var txt_assales = $('#txt_assales').val()
    var txt_SampleName = $('#txt_SampleName').val()
    var s1_basic = $('#s1_basic').val()
    var txt_PM = $('#txt_PM').val()
    var txt_Ware = $('#txt_Ware').val()
    var txt_Memo = $('#txt_Memo').val().replaceAll(",",";")
    var txt_inStockDate = $('#txt_inStockDate').val()
    var txt_inStockName = $('#txt_inStockName').val()
    var classify = $('#classify').val()
    if(jQuery.trim(txt_ProjectNo) == ""){
        alert("請輸入案件編號!!!");
        return false;
    }
    if(jQuery.trim(txt_Sales) == ""){
        alert("請輸入正確的案件編號!!!");
        return false;
    }   
    if(jQuery.trim(txt_SampleName) == ""){
        alert("請輸入樣品名稱!!!");
        return false;
    }    
    if(jQuery.trim(s1_basic) == ""){
        alert("請選擇樣品類別!!!");
        return false;
    }
    
    
    if(jQuery.trim(classify) == ""){alert("請選擇歸類!!!");return false;}

    //組JSON字串後傳
    var json = new Object()
    json["LoginUser"] = $('#LoginUser').val();
    json["ProjectNo"] = txt_ProjectNo;
    json["quono"] = txt_PriceNo;
    json["custno"] = txt_CustomNo;
    json["custname"] = txt_CustomName;
    json["sales"] = txt_Sales;
    
    json["assalesID"] = txt_assales.split("|")[0];
    json["assales"] = txt_assales.split("|")[1];
    
    json["samplename"] = txt_SampleName;
    json["sameletype"] = s1_basic;
    json["pm"] = txt_PM;
    json["location"] = txt_Ware;
    json["inStockDate"] = txt_inStockDate;
    json["inStockName"] = txt_inStockName;
    json["classify"] = classify
    json["memo"] = txt_Memo;   
    json["eut_name"] = $('#eut_name').val();
    json["eut_model"] = $('#eut_model').val();
    json["DataType"]="SaveSample";
    // console.log(json);
    //呼叫ajax
    ajaxPostData("(ajaxPostSampleData.jsonp)", json);
};

function agreeModal(){
	var text = "";
	text += '<div class="form-group">';
	text += '<label for="textarea-input">原因</label>';
	text += '<textarea data-required="true" data-minlength="5" name="textarea-input" id="textarea-input" cols="10" rows="8" class="form-control"></textarea>';
	text += '</div>';
    $("#modal_agree").empty();
	$("#modal_agree").append(text);
}

//設定每個勾選確定後的資料
function SetModaltxt(name){
	var json = jQuery.parseJSON($("#txt_"+name).text())[0];
	switch(name){
		case "ProjectNo":
			// $("#txt_ProjectNo").val(json.cName)
			break;
		case "inStockName":
			$("#txt_inStockName").val(json.notesID.split("=")[1].split("/")[0])
			break;
		default:
			console.log(name, json);
			break;
	}
}