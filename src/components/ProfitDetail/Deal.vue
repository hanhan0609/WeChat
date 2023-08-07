<template>
    <view class="main">
        <view class="time">
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
                          style="line-height: 34px; text-align: center; font-weight: 700;vertical-align: middle;">{{ item }}
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


        <view class="table-class">
            <ul class="ul-class">
                <li v-for="(item, index) in yigepen"
                    class="li-class"
                    :key="index">
                    <view class="view-class">{{ label[index] }}</view>
                    <view class="view-class">{{ tableMoney(item) }}</view>
                </li>
            </ul>
        </view>

    </view>
</template>

<script>
import { tableMoney, dateDeal, StrToNum } from '@/uilts/uiltsForProfit'
import { inquire } from '@/server/http';
export default {
    created() {


    },
    data() {
        return {
            end: dateDeal(0, new Date()).range[1],
            yigepen: {},//数据接收
            value: [0],//日期选择的index
            current: 0,//日期选择的内容
            items: [this.$t('common.date[0]'), this.$t('common.date[1]'), this.$t('common.date[2]'), this.$t('common.date[3]')],//日期标题
            range: [],//日期接收
            disabled: true,
            // label:{sumAmt:'总盈亏',profitAmt:'盈利金额',lossAmt:'亏损金额'},//界面上的list标题
            // categories:['即期','远期','期权'],//canvans的标题
            label: { sumAmt: this.$t('Profit.Deal.canvasTitle[0]'), profitAmt: this.$t('Profit.Deal.canvasTitle[1]'), lossAmt: this.$t('Profit.Deal.canvasTitle[2]') },//界面上的list标题
            categories: [this.$t('Profit.Deal.listTitle[0]'), this.$t('Profit.Deal.listTitle[1]'), this.$t('Profit.Deal.listTitle[2]')],//canvans的标题
            seriesData: []//canvans的数据
        }
    },
    computed: {
    },
    methods: {
        tableMoney,
        onClickItem(e) {
            if (this.current !== e.detail.value[0]) {
                this.current = e.detail.value[0]
            }
            let now = new Date()
            let { disabled, range } = dateDeal(this.current, now)
            this.disabled = disabled
            this.range = range
        },
    },
    // beforeMount() {
    //     this.value = [[this.$store.state.pickVal][0]]
    //     this.current = [this.$store.state.pickVal][0]
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
    watch: {
        async range(newval) {
            if (newval.length === 0) {//判断是否选择日期
                return
            }
            if(newval[0]=='' || newval[1]==''){//判断两个日期有没有值
                return
            }
            //判断是否缓存
            if (this.current !== 3 && this.$store.state.uchartData.Deal[this.current].series[0].data.length !== 0) {
                this.$emit('passArry', { cur: this.current, name: 'Deal', select: null })//子传父 传递当前是什么组件 传递选择了什么日期

                this.yigepen = this.$store.state.DealLableData[this.current]

                this.$nextTick()
                // console.group('交易存入的vuex数据66', this.$store.state.uchartData.Deal);
                // console.groupEnd();
                return
            }
            this.yigepen = await inquire('/CLOUD-WX/weixin/getPLAmt', { ...StrToNum(this.range), cur: "CNY" }, this.$t('common.loading'))//获取新的日期的数据
            this.seriesData = this.yigepen.barChart;//柱形图数据
            this.yigepen = Object.entries(this.yigepen)//剔除柱形图数组数据
                .filter(([key, value]) => !Array.isArray(value))
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
            this.$store.commit('saveDealDatas', { cur: this.current, data: this.yigepen })
            this.$store.commit('saveUchartData', { name: 'Deal', cur: this.current, data: this.seriesData, categories: this.categories })//存储数据到vuex
            this.$emit('passArry', { cur: this.current, name: 'Deal', select: null })//子传父 传递当前是什么组件 传递选择了什么日期
            this.$nextTick()
            // console.group('交易存入的vuex数据2', this.$store.state.uchartData.Deal);
            // console.groupEnd();
        },
    }
}
</script>

<style lang="scss">
@import '@/style/Profit/ProfitDetail/Deal.scss';
</style>

