module.exports = {
	login:{
		title: "Login",
		wechatButtonText:"Login For Wechat",
		otherButtonText:"Other Login Methods",
		useIDPWLogin:"Account Password Login",
		agree:"Agree",
		userAgreement:"<User Agreement>",
		and:"And",
		privacyPolicy:"<Privacy Policy>",
		agreeTitle:"Uprivacy Of User",
		visionFinAccount:"VisionFin ID",
		account:"ID",
		enterPassword :"Please enter your password",
		password:"PW",
		plaseAgree:"Please agree to the user Privacy Agreement	",
		pwdOrNameNot:"The account password cannot be empty"
	},
	Exchange: {
		title: "Foreign Exchange Market",
		listName: ["Currency Pair", " Base Currency", "Target Currency", "Opening Price", "Closing Price", "Fluctuations In Prices"],
		average: {
			name: 'ExchangeRate'
		},
		detailTitle: "Exchange Rate Details"
	},
	Profit: {
		title: "Profit",
		menu:['Exposure', 'Trans PL', 'Hedge PL', 'Deal PL'],
		Exposure:{
			canvasTitle:['Certainty','HighlyPossible','Closed'],
		},
		Trans:{
			tableTitle:['DIR', 'CUR', 'EXPAmt','ClosePL', 'EXPDate ', 'E Date', ],
			selectTitle:["Delivered", "Undelivered"],
			td1:['Certainty','HighlyPossible'],

		},
		Hedge:{
			tableTitle:['BuyCUR', 'BuyAmt', 'SellCUR', 'SellAmt','ClosePL', 'TransDate', 'ValueDate','Type'],
			selectTitle:["Undelivered", "Delivered"],
			td1:['Spot','Forward','Option','CF','TRS']

		},
		Deal:{
			canvasTitle:['Total PL', 'P Amt', "L Amt"],
			listTitle:['Spot','Forward','Option'],

		},
	},
	Message: {
		title: "Messages",
	},
	News: {
		title: "News",
		placeholder: 'Please enter the search content'
	},
	common:{
		date:['1D', '1W', '1M', 'Customize'],
		loading:"loading",
		totle:"totle",
		notAnyMore:"No More Data Is Available",
		closeText:"Close",
		confirmText:"Confirm",
		infoText:"Info",
		apiError: "Interface request failed!",
		starDate:"Start Date",
		endDate:"End Date",
	}
}