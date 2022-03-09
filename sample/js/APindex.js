$(function () {
	// 列印
	$("#btn_print").click(function () {
		localStorage.setItem('uploaddata', JSON.stringify($('#btbody').bootstrapTable('getSelections')));
		$(window).attr('location', '/ap/manage/sample.nsf/print?OpenForm');
	});

	// 查詢
	$("#btn_Search").click(function () {
		// call ajax
		var dpStart = $('#dpStart').val();
		var dpEnd = $('#dpEnd').val();
		var txt_Condition = $('#txt_Condition').val();
		var stype = $('#myTab li.active')[0].title;
		if (dpStart == '') {
			alert("請輸入起始時間")
			return false;
		}
		var jdata = new Object()
		jdata["dpStart"] = dpStart
		jdata["dpEnd"] = dpEnd
		jdata["txt_Condition"] = txt_Condition
		jdata["stype"] = stype
		ajaxPostData("(ajaxGetSearchData.jsonp)", jdata)
	});


	// 批次同意
	$("#btn_appove").click(function () {
		var json = new Object()
		var tbunid = [];
		var $table = $("#btbody").bootstrapTable('getSelections')
		if ($table.length == 0) {
			alert("請選擇資料!!!");
		} else {
			$table.forEach(i => {
				tbunid.push("unid:" + i.unid)
			})
			json["LoginUser"] = $('#LoginUser').val();
			json["DataType"] = "Multi";
			json["Flag"] = "Appove";
			json["Data"] = tbunid;
			ajaxPostData("(ajaxPostMultiSign.jsonp)", json)
		}

	});

	// 批次拒絕
	$("#btn_reject").click(function () {
		var json = new Object()
		var tbunid = [];
		var $table = $("#btbody").bootstrapTable('getSelections')
		if ($table.length == 0) {
			alert("請選擇資料!!!");
		} else {
			$table.forEach(i => {
				tbunid.push("unid:" + i.unid)
			})
			json["LoginUser"] = $('#LoginUser').val();
			json["DataType"] = "Multi";
			json["Flag"] = "Reject";
			json["Data"] = tbunid;
			ajaxPostData("(ajaxPostMultiReject.jsonp)", json)
		}
	});

	// 批次入庫
	$("#btn_insert").click(function () {
		var json = new Object()
		var tbunid = [];
		var $table = $("#btbody").bootstrapTable('getSelections')
		if ($table.length == 0) {
			alert("請選擇資料!!!");
		} else {
			$table.forEach(i => {
				tbunid.push("unid:" + i.unid)
			})
			json["LoginUser"] = $('#LoginUser').val();
			json["DataType"] = "Multi";
			json["Data"] = tbunid;
			ajaxPostData("(ajaxPostMultiWarehouse.jsonp)", json)
		}
	});

	// 批次退樣
	$("#btn_return").click(function () {
		var json = new Object()
		var tbunid = [];
		var $table = $("#btbody").bootstrapTable('getSelections')
		if ($table.length == 0) {
			alert("請選擇資料!!!");
		} else {
			$table.forEach(i => {
				tbunid.push("unid:" + i.unid)
			})
			json["LoginUser"] = $('#LoginUser').val();
			json["DataType"] = "Multi";
			json["Data"] = tbunid;
			ajaxPostData("(ajaxPostMultiReturn.jsonp)", json)
		}
	});

	// 批次轉出
	$("#btn_mutilout").click(function () {
		var obj = new Object();
		var text = "";
		obj["name"] = "mutilout";
		obj["width"] = "400";
		obj["title"] = "批次轉出";
		modalOptionTalbe(obj)
		obj = {}
		$('#btn_confirm').attr('onclick', 'mutilout()');

		text += '<div class="form-group">';
		text += '<div class="row">';

		obj["size"] = "12";
		obj["label"] = "接收人";
		obj["name"] = "receive";
		obj["width"] = "1000";
		obj["title"] = "選擇人員";
		text += (btnSelect(obj))
		obj = {}

		text += '</div>';
		text += '</div>';

		$("#content_mutilout").empty();
		$("#content_mutilout").append(text);

		$(".modal-body").css("height", "auto");

		$("#Modal_out .modal-body").css("height", "460px");
		$("#Modal_receive .modal-body").css("height", "460px");


		$(".input-group-btn .btn.btn-secondary").css("height", "34px");

		modal_tagger()

		if ($("#btbody").bootstrapTable('getSelections').length == 0) {
			alert("請選擇資料!!!")
		} else {
			$("#Modal_mutilout").modal('show');
		}
	});

	// 作廢
	$("#btn_cancel").click(function () {
		alert("媽! 我在作廢");
	});




	// 初始化datepicker
	setjsdatepicker();
	iniVwlist("byprojectno")
	// 權限檢查
	checkrole('who', 1);
}); // end ready

// menu傳資料的值
function iniVwlist(value) {
	switch (value) {
		case "byprojectno":
			btnshowhide("show");
			break;
		case "byowner":
			btnshowhide("show");
			break;
		case "byclosed":
			btnshowhide("");
			break;
		case "byalldocs":
			btnshowhide("show");
			break;
		case "byvoid":
			btnshowhide("");
			break;
		case "checklist":
			btnshowhide("checklist");
			break;
		default:
			btnshowhide("hide");
			break;
	}
	// console.log(value)
	$('#btbody').bootstrapTable('destroy');
	var json = new Object()
	json["LoginUser"] = $('#LoginUser').val()
	json["DataType"] = value
	ajaxPostData("(ajaxGetMyData.jsonp)", json)
}

function modal_tagger() {
	$("#btn_receive").click(function () {
		// btnselect("txt_receive");
		var json = new Object();
		json["DataType"] = "staff_receive";
		ajaxPostData("(ajaxGetATLstaff.jsonp)", json)
	});

}

// 簽收樣品
function signIn(unid) {
	// console.log(unid)
	var json = new Object()
	json["LoginUser"] = $('#LoginUser').val();
	json["DataType"] = "sampleSignIn";
	json["unid"] = unid;
	ajaxPostData("(ajaxPostsampleSignIn.jsonp)", json)
}

function signOut(unid) {
	var obj = new Object();
	var text = "";
	obj["name"] = "signOut";
	obj["width"] = "400";
	obj["title"] = "原因";
	modalOptionTalbe(obj)
	obj = {}
	$('#btn_confirm').attr('onclick', 'callreject("' + unid + '")');

	text += '<div class="form-group">';
	text += '<div class="row">';
	text += '<label for="textarea-input">原因</label>';
	text += '<textarea data-required="true" data-minlength="5" name="textarea-input" id="textarea-input" cols="10" rows="8" class="form-control"></textarea>';
	text += '</div>';
	text += '</div>';
	$("#content_signOut").empty();
	$("#content_signOut").append(text);

	$(".modal-body").css("height", "auto");
	$("#Modal_signOut").modal('show');
}

function callreject(unid) {
	// console.log(unid)
	// 判斷空值
	var json = new Object()
	if ($('#textarea-input').val().trim() == "") {
		alert("駁回原因必須填寫!!!");
		return false;
	} else {
		json["LoginUser"] = $('#LoginUser').val();
		json["DataType"] = "sampleSignIn";
		json["unid"] = unid;
		// 拒絕原因
		json["memo"] = $('#textarea-input').val();
		ajaxPostData("(ajaxPostReject.jsonp)", json)
	}
}

// 表格初始化
function tableinit(data, columns) {
	// 待簽核4個欄位
	if (columns.length == 11) {
		data.forEach((i, j) => {
			// data[j]["content"] = i.lastOwner.split("/")[0] + " 轉樣品:" + i.SampleName + " 給您";
			// data[j]["content"] = i.lastOwner.split("/")[0].split("=")[1]+"移轉樣品給你("+i.SampleName+")";
			data[j]["mover"] = i.lastOwner.split("/")[0].split("=")[1];
		})
	}
	data.forEach((i, j) => {
		data[j]["owner"] = i.owner.split("/")[0].split("=")[1];
		data[j]["returnName"] = i.returnName.split("/")[0].split("=")[1];
		data[j]["insertDate"] = i.insertDate.substring(10, 0);
		data[j]["returnDate"] = i.insertDate.substring(10, 0);
		data[j]["voidDate"] = i.insertDate.substring(10, 0);
		// .substring(10,0)
		// insertDate
	})

	console.log(data, columns);
	/*
	$('#btbody').bootstrapTable({
		data:data,
		columns:columns
		// treeShowField: 'ProjectNo',
		// parentIdField: 'pid',
	});
	*/

	var $table = $('#btbody')
	$('#toolbar').find('select').change(function () {
		$table.bootstrapTable('destroy').bootstrapTable({
			data: data,
			exportDataType: $(this).val(),
			exportTypes: ['excel'],
			columns: columns
			/*
			columns: [
			  {
				field: 'state',
				checkbox: true
				// visible: $(this).val() === 'selected'
			  }
			]
			*/
		})
	}).trigger('change')

	// console.log(data,columns);
}

//匯出的function 名稱要固定
function ExportXlsEvent() {
	/*
	var data = new Object()
	var unid = [];
	$('#btbody').bootstrapTable('getData').forEach(i=>{
		unid.push({unid:i.sdocUNID});
	})
	data["LoginUser"] = $("#LoginUser").val();
	data["Data"] = unid;
	data["DataType"] = "nowView";
	ajaxPostData("(ajaxPostParkExportXLS.jsonp)", data)
	*/
}

// 權限檢查
function checkrole(jdata, flag) {
	if (flag === 1) {
		// ajaxPostData(name, json)
		console.log('第一次進程式');
	} else {
		console.log('判斷權限');
		if (jdata == '有權限') {
			$('#role_delete').show();
			$('#role_cancel').show();
		} else {
			$('#role_delete').hide();
			$('#role_cancel').hide();
		}
	}
}

// 設定初始化界面
function setjsdatepicker() {
	var startDateTextBox = $('#dpStart');
	var endDateTextBox = $('#dpEnd');
	startDateTextBox.datepicker({
		dateFormat: 'yy/mm/dd',
		onClose: function (dateText, inst) {
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
		onSelect: function (selectedDateTime) {
			endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
		}
	});
	endDateTextBox.datepicker({
		dateFormat: 'yy/mm/dd',
		onClose: function (dateText, inst) {
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
		onSelect: function (selectedDateTime) {
			startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
		}
	});
}

// 插入事件
function operateFormatter(value, row, index) {
	if (row.sign == "完成") {
		return [
			'<a href="' + hostip() + '/ap/manage/sample.nsf/sample_empty?OpenForm&unid=' + row.unid + '"><i class="fa fa-folder-open-o" style="color:darkslateblue"></i></a>&nbsp;'
		].join('')
	} else {
		return [
			'<a href="#"><i class="fa fa-check-circle" style="color:blue" onclick="signIn(\'' + row.unid + '\')"></i></a>&nbsp;',
			'<a href="#"><i class="fa fa-times-circle" style="color:red" onclick="signOut(\'' + row.unid + '\')"></i></a>&nbsp;',
			'<a href="' + hostip() + '/ap/manage/sample.nsf/sample_empty?OpenForm&unid=' + row.unid + '"><i class="fa fa-exclamation-circle" style="color:darkslateblue"></i></a>&nbsp;'
		].join('')
		/*
		return [
				  '<a href="#"><i class="fa fa-check-circle" style="color:blue" onclick="agreeModal(\'yes\',\'' + row.docurl + '\',\'' + row.unid + '\')"></i></a>&nbsp;',
				  '<a href="#"><i class="fa fa-times-circle" style="color:red" onclick="agreeModal(\'no\',\'' + row.docurl + '\',\'' + row.unid + '\')"></i></a>&nbsp;',
				  '<a href="' + hostip() + '/ap/manage/PurchaseOrder.nsf/po_empty?OpenForm&unid='+ row.unid +'"><i class="fa fa-exclamation-circle" style="color:darkslateblue"></i></a>'
			].join('')*/
	}
}

function operateFormatterRead(value, row, index) {
	return [
		'<a href="' + hostip() + '/ap/manage/sample.nsf/sample_empty?OpenForm&unid=' + row.unid + '"><i class="fa fa-folder-open-o" style="color:darkslateblue"></i></a>&nbsp;'
	].join('')


}

// 所小表格
function cellStyle(value, row, index) {
	return {
		css: {
			"overflow": "hidden",
			"white-space": "nowrap",
			"text-overflow": "ellipsis"
		}
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
	}
	catch (err) {
		alert(err.message)
	}
}


// 選人
function staff_receive(data) {
	// console.log(data);
	var columns = config().col_staff
	$("#btreceive").bootstrapTable({
		columns: [columns.ck, columns.employeeID, columns.cDept, columns.cName, columns.eName],
		data: data
	})
	$("#btreceive").bootstrapTable('resetView')
}

// 後端回傳資料會到這邊 callback
function callback(name, jdata) {
	$.unblockUI();
	var columns = config().col_index
	// <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents"  data-click-to-select="false" class="col-md-2">簽核</th>
	switch (name) {
		case "byprojectno":
			tableinit(jdata, [columns.ck, columns.ProjectNo, columns.Sales, columns.classify, columns.SampleNo, columns.SampleName, columns.CustName, columns.sampleLocation, columns.PM, columns.insertDate, columns.owner, columns.memo, columns.open])
			break;
		case "byowner":
			tableinit(jdata, [columns.ck, columns.owner, columns.ProjectNo, columns.classify, columns.SampleNo, columns.SampleName, columns.CustName, columns.Sales, columns.sampleLocation, columns.PM, columns.insertDate, columns.memo, columns.open])
			break;
		case "byalldocs":
			// tableinit(jdata,[columns.ck,columns.ProjectNo,columns.SampleNo,columns.SampleName,columns.CustName,columns.Sales,columns.sampleLocation,columns.PM,columns.insertDate,columns.owner,columns.memo,columns.open])
			tableinit(jdata, [columns.ck, columns.ProjectNo, columns.Sales, columns.classify, columns.SampleNo, columns.SampleName, columns.CustName, columns.sampleLocation, columns.PM, columns.insertDate, columns.owner, columns.memo, columns.open])
			break;
		case "byvoid":
			// tableinit(jdata,[columns.ck,columns.ProjectNo,columns.SampleNo,columns.SampleName,columns.CustName,columns.Sales,columns.sampleLocation,columns.PM,columns.insertDate,columns.voidDate,columns.memo,columns.open])
			tableinit(jdata, [columns.ck, columns.ProjectNo, columns.Sales, columns.classify, columns.SampleNo, columns.SampleName, columns.CustName, columns.sampleLocation, columns.PM, columns.insertDate, columns.owner, columns.memo, columns.open])
			break;
		case "byclosed":
			// tableinit(jdata,[columns.ProjectNo,columns.SampleNo,columns.SampleName,columns.CustName,columns.Sales,columns.PM,columns.returnDate,columns.returnName,columns.memo,columns.open])
			tableinit(jdata, [columns.ck, columns.ProjectNo, columns.Sales, columns.classify, columns.SampleNo, columns.SampleName, columns.CustName, columns.sampleLocation, columns.PM, columns.insertDate, columns.owner, columns.memo, columns.open])
			break;
		case "checklist":
			// tableinit(jdata,[columns.ck,columns.content,columns.ProjectNo,columns.classify,columns.Sales,columns.sign])
			tableinit(jdata, [columns.ck, columns.mover, columns.ProjectNo, columns.classify, columns.SampleNo, columns.SampleName, columns.CustName, columns.Sales, columns.PM, columns.memo, columns.sign])
			break;
		case "sampleSignIn":
			if (jdata[0].msg != "success") {
				alert("接收文件失敗，請洽MIS,錯誤訊息如下:" + jdata[0].msg);
			} else {
				iniVwlist("checklist")
			}
			break;
		case "staff_receive":
			staff_receive(jdata);
			break;
		case "Multi":
			// console.log(jdata);
			if (jdata[0].msg != "success") {
				alert("批次處理異常，錯誤訊息如下:" + jdata[0].msg);
			} else {
				alert("批次處理成功!");
				iniVwlist($('#myTab li.active')[0].title)
			}
			break;
		case "GetUserRole":
			// checkrole(jdata, 2);
			checkrole('koko', 2);
			break;
		default:
			// 沒有name
			return false;
	}
}

//設定每個勾選確定後的資料
function SetModaltxt(name) {
	var json = jQuery.parseJSON($("#txt_" + name).text())[0];
	switch (name) {
		case "receive":
			$("#txt_receive").val(json.cName)
			break;
		default:
			console.log(name, json);
			break;
	}
}

// 按鈕隱藏/顯示
function btnshowhide(option) {
	if ($("#sampleSetting").val() == "1" && option != "checklist" && option != "") {
		$("#btn_insert").show();
		$("#btn_return").show();
	} else {
		$("#btn_insert").hide();
		$("#btn_return").hide();
	}
	switch (option) {
		case "show":
			$("#btn_print").show();
			$("#btn_cancel").show();
			$("#btn_mutilout").show();
			$("#btn_appove").hide();
			$("#btn_reject").hide();
			break;
		case "checklist":
			$("#btn_print").hide();
			$("#btn_cancel").hide();
			$("#btn_mutilout").hide();
			$("#btn_appove").show();
			$("#btn_reject").show();
			break;
		case "hide":
			$("li button").hide();
			$("#btn_print").show();
			$("#btn_mutilout").show();
			break;
		default:
			$("li button").hide();
			break;
		/*
		$("#btn_print").hide();
		$("#btn_cancel").hide();
		$("#btn_appove").hide();
		$("#btn_reject").hide();
		$("#btn_mutilout").hide();
		*/
	}
}

function mutilout() {
	var json = new Object()
	var tbunid = [];
	$("#btbody").bootstrapTable('getSelections').forEach(i => {
		tbunid.push("unid:" + i.unid)
	})
	json["LoginUser"] = $('#LoginUser').val();
	json["DataType"] = "Multi";
	json["Data"] = tbunid;
	json["mutiIn"] = jQuery.parseJSON($("#txt_receive").text())[0].notesID
	ajaxPostData("(ajaxPostMultiMoveOut.jsonp)", json)
}
function hostip() {
	var test = true;
	if (test) {
		return "http://192.168.5.15";
	} else {
		return "https://hq.atl-lab.com.tw";
	}

}