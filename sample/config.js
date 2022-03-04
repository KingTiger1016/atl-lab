// config()["XXX"] 引用方法
function config() {
	var config = new Object()
	config["salseorder"] = [
	{
		id:"232",
		name:"桃園銷貨單"
	},{
		id:"232-1",
		name:"桃園銷貨單-外包"
	},{
		id:"235",
		name:"五股銷貨單"
	},{
		id:"235-1",
		name:"五股銷貨單-外包"
	},{
		id:"236",
		name:"預開發票"
	}
	]

    config["columns"] = {
        ck: {
            field: 'ck',
            checkbox: true
        },
        ProjectNo: {
            field: 'ProjectNo',
            title: '案件編號',
            sortable: true,
            order: 'desc',
            filterControl: 'input',
            cellStyle: "cellStyle"
        },
        SampleNo: {
            field: 'SampleNo',
            title: '樣品編號',
            sortable: true,
            filterControl: 'input',
            class: "col-md-3",
            cellStyle: "cellStyle"
        },
        SampleName: {
            field: 'SampleName',
            title: '樣品名稱',
            sortable: true,
            filterControl: 'input'
        },
        CustName: {
            field: 'CustName',
            title: '客戶',
            sortable: true,
            visible: false,
            filterControl: 'input',
            cellStyle: "cellStyle"
        },
        Sales: {
            field: 'Sales',
            title: '業務',
            sortable: true,
            filterControl: 'input',
            cellStyle: "cellStyle"
        },
        PM: {
            field: 'PM',
            title: 'PM',
            sortable: true,
            visible: false,
            filterControl: 'input',
            cellStyle: "cellStyle"
        },
        insertDate: {
            field: 'insertDate',
            title: '入庫日期',
            sortable: true,
            visible: false,
            filterControl: 'input'
        },
        owner: {
            field: 'owner',
            title: '目前擁有者',
            sortable: true,
            filterControl: 'input',
            cellStyle: "cellStyle"
        },
        voidDate: {
            field: 'voidDate',
            title: '作廢日期',
            sortable: true,
            filterControl: 'input',
            class: 'hidden-xs hidden-sm'
        },
        returnDate: {
            field: 'returnDate',
            title: '退樣日期',
            sortable: true,
            filterControl: 'input',
            class: 'hidden-xs hidden-sm'
        },
        returnName: {
            field: 'returnName',
            title: '退樣人員',
            sortable: true,
            filterControl: 'input',
            class: 'hidden-xs hidden-sm'
        },
        content: {
            field: 'content',
            title: '主旨內容',
            sortable: true,
            filterControl: 'input',
            width:'50%',
            cellStyle: "cellStyle"
        },
        memo: {
            field: 'memo',
            title: '備註',
            sortable: true,
            filterControl: 'input',
            cellStyle: "cellStyle",
            visible: false,
        },
        name: {
            field: 'name',
            title: '申請人',
            sortable: true,
            filterControl: 'input'
        },
        date: {
            field: 'date',
            title: '申請日期',
            sortable: true,
            filterControl: 'input'
        },
        sign: {
            field: 'sign',
            title: '簽核',
            align: 'center',
            formatter:'operateFormatter'
        },
        open: {
            field: 'open',
            title: '開啟',
            align: 'center',
            formatter:'operateFormatterRead'
        },
        sampleLocation:{
            field: 'sampleLocation',
            title: '庫位',
            sortable: true,
            filterControl: 'input',
            class: 'hidden-xs hidden-sm'
        }
    }
    return config
}