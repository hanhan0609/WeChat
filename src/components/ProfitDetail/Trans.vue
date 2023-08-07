<template>
	<view class="main">
		<view class="time">
			<!-- 选择日期与自定义 -->
			<picker-view :value="value"
						 v-model="value"
						 @change="onClickItem"
						 class="dates"
                         mask-class="mask"
                         indicator-class="indicator">
				<picker-view-column>
					<view class="date"
						  v-for="(item, index) in items"
						  :key="index"
						  style="line-height: 34px; text-align: center; font-weight: 700; vertical-align: middle">{{ item }}
					</view>
				</picker-view-column>
			</picker-view>
			<!-- 显示日期与反显-->
            <uni-datetime-picker :clear-icon="false"
                                 :border="false"
                                 v-model="range[0]"
                                 type="date"
                                 :disabled="disabled"
                                 :end="end" 
								 :placeholder="$t('common.starDate')"/>
            <uni-datetime-picker :clear-icon="false"
                                 :border="false"
                                 v-model="range[1]"
                                 type="date"
                                 :disabled="disabled"
								 :start="range[0]"
                                 :end="end" 
								 :placeholder="$t('common.endDate')"/>
		</view>
		<view class="table">
			<view style="width: 100vw">
				<view class="tabledetail">
					<uni-segmented-control :current="select"
										   :values="selects"
										   style-type="text"
										   :active-color="activeColor"
										   @clickItem="isSelect" /><!--是否交割-->
					<!-- 交割表格内容 -->
					<view v-if="select === 0"><!--已交割的内容-->
						<table-for-trans :td="td"
										 :th="th"
										 :total="total"
										 @load="load" />
					</view>
					<view v-if="select === 1"><!--未交割的内容-->
						<table-for-trans :td="td"
										 :th="th"
										 :total="total"
										 @load="load" />
					</view>
				</view>
			</view>
			<!-- <view v-if="current === 1">
                <text class="content-text">1周的内容</text>
            </view>
            <view v-if="current === 2">
                <text class="content-text">1月的内容</text>
            </view>
            <view v-if="current === 3">
                <text class="content-text">自定义的内容</text>
            </view> -->
		</view>
	</view>
</template>

<script>
import { tableMoney, dateDeal, StrToNum } from '@/uilts/uiltsForProfit';
import { inquire } from '@/server/http';
import TableForTrans from '@/components/TableForProfit/TableForTrans.vue';

export default {
	components: { TableForTrans },
	async created() {


	},
	onReady() { },
	// beforeMount() {
	// 	this.value = [[this.$store.state.pickVal][0]]
	// 	this.current = [this.$store.state.pickVal][0]
	// },
    mounted() {
		this.range = dateDeal(this.$store.state.pickVal, new Date()).range
		if (this.$store.state.pickVal == 3) {
			this.range = this.$store.state.comDate
			this.disabled=false
		}
        this.value = [[this.$store.state.pickVal][0]]
        this.current = [this.$store.state.pickVal][0]
    },
	beforeDestroy() {
		this.$store.commit('changeComDate', this.range)
		this.$store.commit('changePickVal', this.current)
	},
	data() {
		return {
			end: dateDeal(0, new Date()).range[1],
			yigepen: {}, //数据接收
			td: [], //表数据
			// th: ['敞口方向', '敞口币种', '敞口金额', '敞口日期', '到期日期', '交割损益'], //表头
			th: [this.$t('Profit.Trans.tableTitle[0]'), this.$t('Profit.Trans.tableTitle[1]'), this.$t('Profit.Trans.tableTitle[2]'), this.$t('Profit.Trans.tableTitle[3]'), this.$t('Profit.Trans.tableTitle[4]'), this.$t('Profit.Trans.tableTitle[5]')], //表头
			items: [this.$t('common.date[0]'), this.$t('common.date[1]'), this.$t('common.date[2]'), this.$t('common.date[3]')], //日期标题
			value: [0], //日期选择的index
			activeColor: '#4ba8f1',
			current: 0, //日期选择的内容
			range: [], //日期接收
			select: 0, //交割的index
			// selects: ['未交割订单损益', '已交割订单损益'], //是否交割 标题
			selects: [this.$t('Profit.Trans.selectTitle[0]'), this.$t('Profit.Trans.selectTitle[1]')], //是否交割 标题
			total: 0, //总计金额
			disabled: true,
			portsUrl: ['/CLOUD-WX/weixin/getExposureStlPL', '/CLOUD-WX/weixin/getExposurePL'],
		};
	},
	methods: {
		async load(val) {
			let nowPage = this.$store.state.tableDataPages.Trans[this.select][this.current].currentPage;
			let sumPages = this.$store.state.tableDataPages.Trans[this.select][this.current].totalPages;
			if (nowPage < sumPages) {
				nowPage++;
				let { recordList, totalPages, currentPage } = await inquire(
					this.portsUrl[this.select],
					{ ...StrToNum(this.range), currentPage: nowPage, pageSize: '6' },
					this.$t('common.loading')
				); //获取数据
				this.$store.commit('addTableDatas', {
					name: 'Trans',
					cur: this.current,
					data: recordList,
					select: this.select,
				}); //添加本地table数据
				this.td = this.$store.state.tableData.Trans[this.select][this.current];
				this.$store.commit('saveTableDatasPages', {
					name: 'Trans',
					cur: this.current,
					data: { totalPages, currentPage },
					select: this.select,
				}); //存储分页总页数
			} else {
				uni.showToast({
					icon: 'none',
					title: this.$t('common.notAnyMore'),
					duration: 2000,
				});
			}
		},
		tableMoney(num) {
			return tableMoney(num);
		},
		onClickItem(e) {
			if (this.current !== e.detail.value[0]) {
				this.current = e.detail.value[0];
			}
			let now = new Date();
			let { disabled, range } = dateDeal(this.current, now);
			this.disabled = disabled;
			this.range = range;
		},
		isSelect(e) {
			if (this.select !== e.currentIndex) {
				this.select = e.currentIndex;
			}
		},
		whetherLoading() {
			this.td = this.$store.state.tableData.Trans[this.select][this.current];

			this.$emit('passArry', {
				cur: this.current,
				name: 'Trans',
				select: this.select,
			}); //子传父 传递当前是什么组件 传递选择了什么日期

			//拿到总计金额
			// this.total=this.$store.state.uchartData.Trans[this.select][this.current].series[0].data[this.select]
			this.total=this.$store.state.tableTotal.Trans[this.select][this.current].sumPlAmt
			console.log(this.total,this.$store.state.uchartData.Trans[this.select][this.current].series[0].data);
			this.$nextTick();
		},
		needLoading(sumamt1, sumamt2, recordList, range, select, totalPages, currentPage,sumPlAmt) {
			this.td = recordList;
			this.$store.commit('saveTableDatas', {
				name: 'Trans',
				cur: this.current,
				data: recordList,
				select: select,
			}); //存储数据到vuex

			this.$store.commit('saveTableDatasPages', {
				name: 'Trans',
				cur: this.current,
				data: { totalPages, currentPage },
				select: select,
			}); //存储分页总页数

			this.$store.commit('saveUchartDatas', {
				name: 'Trans',
				cur: this.current,
				data: [sumamt1, sumamt2],
				categories: this.selects,
				select: select,
			}); //存储数据到vuex


			this.$store.commit('saveSumPlAmt', {
				name: 'Trans',
				cur: this.current,
				data: {sumPlAmt},
				select: select,
			});//存储合计数据到vuex


			this.$emit('passArry', {
				cur: this.current,
				name: 'Trans',
				select: select,
			}); //子传父 传递当前是什么组件 传递选择了什么日期

			//拿到总计金额
			// this.total=this.$store.state.uchartData.Trans[select][this.current].series[0].data[select]
			this.total=this.$store.state.tableTotal.Trans[select][this.current].sumPlAmt
			console.log(this.total,[sumamt1, sumamt2]);
			this.$nextTick();
		},
	},
	watch: {
		async range(newval) {
			if (newval.length === 0|| newval.length === 1) {
				return;
			}
			if(newval[0]=='' || newval[1]==''|| (newval.length==2 && typeof newval[0] == 'undefined')){//判断两个日期有没有值
                return
            }
			//判断是否缓存
			if (this.current !== 3 && this.$store.state.uchartData.Trans[this.select][this.current].series[0].data.length !== 0) {
				this.whetherLoading();
				return;
			}
			//判断是否未交割
			let { sumamt1, sumamt2, recordList, totalPages, currentPage,sumPlAmt } = await inquire(
				this.portsUrl[this.select],
				{ ...StrToNum(newval), currentPage: 1, pageSize: '6' },
				this.$t('common.loading')
			); //获取新的日期的数据
			this.needLoading(sumamt1, sumamt2, recordList, newval, this.select, totalPages, currentPage,sumPlAmt);
		},
		async select(newVal) {
			if (this.range.length === 0|| this.range.length === 1) {
				return;
			}
			if(this.range[0]=='' || this.range[1]==''|| (this.range.length==2 && typeof this.range[0] == 'undefined')){//判断两个日期有没有值
                return
            }
			//判断是否缓存
			if (this.current !== 3 && this.$store.state.uchartData.Trans[newVal][this.current].series[0].data.length !== 0) {
				this.whetherLoading();
				return;
			}
			//判断是否未交割
			let { sumamt1, sumamt2, recordList, totalPages, currentPage,sumPlAmt } = await inquire(
				this.portsUrl[this.select],
				{ ...StrToNum(this.range), currentPage: 1, pageSize: '6' },
				this.$t('common.loading')
			); //获取新的日期的数据
			this.needLoading(sumamt1, sumamt2, recordList, this.range, newVal, totalPages, currentPage,sumPlAmt);
		},
	},
};
</script>

<style lang="scss">
@import '@/style/Profit/ProfitDetail/Trans.scss';
</style>
