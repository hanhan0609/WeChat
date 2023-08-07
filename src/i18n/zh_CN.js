module.exports = {
	login:{
		title: "登录",
		wechatButtonText:"通过微信登录",
		otherButtonText:"其他登录方式",
		useIDPWLogin:"账号密码登录",
		agree:"同意",
		userAgreement:"《用户协议》",
		and:"和",
		privacyPolicy:"《隐私政策》",
		agreeTitle:"用户隐私",
		visionFinAccount:"智汇保账号",
		account:"账号",
		enterPassword :"请输入密码",
		password:"密码",
		plaseAgree:"请同意用户隐私协议",
		pwdOrNameNot:"账号或密码不能为空"
	},
	Exchange: {
		title: "汇市行情",
		listName: ["货币对", "基准币种", "目标币种", "开盘价格", "收盘价格", "价格波动"],
		average: {
			name: '汇率'
		},
		detailTitle: "汇率详情"
	},
	Profit: {
		title: "损益",
		menu:['敞口', '订单损益', '套保损益', '交易损益'],
		Exposure:{
			canvasTitle:['确定性未交割','高度可能未交割','已交割敞口'],
		},
		Trans:{
			tableTitle:['敞口方向', '敞口币种', '敞口金额','交割损益', '敞口日期', '到期日期', ],
			selectTitle:["已交割订单损益","未交割订单损益"],
			td1:['确定性','高度可能性'],
		},
		Hedge:{
			tableTitle:['买入币种', '买入金额', '卖出币种', '卖出金额', '交割损益','交易日期', '起息日期','交易类型'],
			selectTitle:["已交割套保损益", "未交割套保损益"],
			td1:['即期','远期','期权','现金流交易','转账交易']
		},
		Deal:{
			canvasTitle:['总盈亏', '盈利金额', "亏损金额"],
			listTitle:['即期','远期','期权'],
		},
	},
	Message: {
		title: "消息",
	},
	News: {
		title: "资讯",
		placeholder: '请输入搜索内容'
	},
	common:{
		date:['1日', '1周', '1月', '自定义'],
		loading:"加载中",
		totle:"总计",
		notAnyMore:"暂无更多数据",
		closeText:"关闭",
		confirmText:"确定",
		infoText:"提示",
		apiError: "请求接口失败！",
		starDate:"开始日期",
		endDate:"结束日期",
	}
}