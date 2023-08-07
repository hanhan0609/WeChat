import Vue from "vue"; //首先引入vue
import Vuex from "vuex"; //引入vuex
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// state 类似 data
		//这里面写入数据
		chooseIndex: 0,
        exchangeRateListData: [],
        detailQryDate: '',
		agreement: false,
		agreement1: false,
		uchartData: {
			Exposure: {
				categories: [],
				0: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
				1: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
				2: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
				3: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
			},
			Trans: {
				categories: [],
				0: {
					0: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					1: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					2: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					3: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
				},
				1: {
					0: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					1: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					2: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					3: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
				},
			},
			Hedge: {
				categories: [],
				0: {
					0: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					1: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					2: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					3: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
				},
				1: {
					0: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					1: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					2: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
					3: {
						series: [
							{
								name: "金额",
								data: [],
							},
						],
					},
				},
			},
			Deal: {
				categories: [],
				0: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
				1: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
				2: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
				3: {
					series: [
						{
							name: "金额",
							data: [],
						},
					],
				},
			},
		},
		tableData:{
			Trans:{
				0:{
					0:[],
					1:[],
					2:[],
					3:[],
				},
				1:{
					0:[],
					1:[],
					2:[],
					3:[],
				}
			},
			Hedge:{
				0:{
					0:[],
					1:[],
					2:[],
					3:[],
				},
				1:{
					0:[],
					1:[],
					2:[],
					3:[],
				}
			}
		},
		tableDataPages:{
			Trans:{
				0:{
					0:{},
					1:{},
					2:{},
					3:{},
				},
				1:{
					0:{},
					1:{},
					2:{},
					3:{},
				}
			},
			Hedge:{
				0:{
					0:{},
					1:{},
					2:{},
					3:{},
				},
				1:{
					0:{},
					1:{},
					2:{},
					3:{},
				}
			}
		},
		DealLableData:{
			0:{},
			1:{},
			2:{},
			3:{}
		},
		pickVal:0,
		comDate:[],
		tableTotal:{
			Trans:{
				0:{
					0:{},
					1:{},
					2:{},
					3:{},
				},
				1:{
					0:{},
					1:{},
					2:{},
					3:{},
				}
			},
			Hedge:{
				0:{
					0:{},
					1:{},
					2:{},
					3:{},
				},
				1:{
					0:{},
					1:{},
					2:{},
					3:{},
				}
			}
		}
	},
	getters: {
		// getters 类似 computed
		// 在这里面写个方法
	},
	mutations: {
		// mutations 类似methods
		// 写方法对数据做出更改(同步操作)
		CheckedAndAgree1(state,data) {
			state.agreement1 = data;
			// console.log(state.agreement);
		},
		CheckedAndAgree(state,data) {
			state.agreement = data;
			// console.log(state.agreement);
		},
		saveUchartData(state, chartData) {
			state.uchartData[chartData.name][chartData.cur].series[0].data = chartData.data;
			state.uchartData[chartData.name].categories = chartData.categories;
			console.log(state.uchartData, chartData);
		},
		saveUchartDatas(state, chartData) {
			state.uchartData[chartData.name][chartData.select][chartData.cur].series[0].data =chartData.data;
			state.uchartData[chartData.name].categories = chartData.categories;
			console.log(state.uchartData, chartData);
		},
		saveTableDatas(state,tableData){
			state.tableData[tableData.name][tableData.select][tableData.cur]=tableData.data
			console.log(state.tableData, tableData);
		},
		saveTableDatasPages(state,obj){
			state.tableDataPages[obj.name][obj.select][obj.cur]=obj.data
			console.log(state.tableDataPages, obj);
		},
		addTableDatas(state,tableData){
			state.tableData[tableData.name][tableData.select][tableData.cur]=[...state.tableData[tableData.name][tableData.select][tableData.cur], ...tableData.data]
			console.log('addTableDatas',state.tableData, tableData);
		},
		saveDealDatas(state,Data){
			state.DealLableData[Data.cur]=Data.data
			console.log(state.DealLableData, Data);
		},
		changePickVal(state,data){
			state.pickVal=data
			console.log('状态变更',state.pickVal);
		},
		changeComDate(state,data){
			state.comDate=data
			// console.log('状态变更',state.comDate);
		},saveSumPlAmt(state,obj){
			state.tableTotal[obj.name][obj.select][obj.cur]=obj.data
			console.log(state.tableTotal, obj,'总计');
		}
	},
	actions: {
		// actions 类似methods
		// 写方法对数据做出更改(异步操作)
	},
});
