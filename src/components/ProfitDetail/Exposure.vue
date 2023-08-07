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
            // label:{amt1:'确定性未交割敞口',amt2:'高度可能未交割敞口',amt3:'已交割敞口'},//界面上的list标题
            // categories:['确定性未交割敞口','高度可能未交割敞口','已交割敞口'],//canvans的标题
            label: { amt1: this.$t('Profit.Exposure.canvasTitle[0]'), amt2: this.$t('Profit.Exposure.canvasTitle[1]'), amt3: this.$t('Profit.Exposure.canvasTitle[2]') },//界面上的list标题
            categories: [this.$t('Profit.Exposure.canvasTitle[0]'), this.$t('Profit.Exposure.canvasTitle[1]'), this.$t('Profit.Exposure.canvasTitle[2]')],//canvans的标题
            seriesData: [],//canvans的数据
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
        if (this.$store.state.pickVal == 3 && this.$store.state.comDate != []) {
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
            if (this.current !== 3 && this.$store.state.uchartData.Exposure[this.current].series[0].data.length !== 0) {
                
                this.$emit('passArry', { cur: this.current, name: 'Exposure', select: null })//子传父 传递当前是什么组件 传递选择了什么日期
                this.seriesData = this.$store.state.uchartData.Exposure[this.current].series[0].data
                let TableName = ['amt1', 'amt2', 'amt3']
                this.yigepen = TableName.reduce((obj, item, index) => {
                    obj[item] = this.seriesData[index];
                    return obj;
                }, {});
                
                this.$nextTick()
                console.group('敞口存入的vuex数据66', this.$store.state.uchartData.Exposure);
                console.groupEnd();
                return
            }

            // this.yigepen = await inquire('/CLOUD-WX/weixin/getExposureGroup',StrToNum(this.range),'加载中')//获取新的日期的数据
            this.yigepen = await inquire('/CLOUD-WX/weixin/getExposureGroup', StrToNum(this.range), this.$t('common.loading'))//获取新的日期的数据
            this.seriesData = Object.values(this.yigepen);

            this.$store.commit('saveUchartData', { name: 'Exposure', cur: this.current, data: this.seriesData, categories: this.categories })//存储数据到vuex
            this.$emit('passArry', { cur: this.current, name: 'Exposure', select: null })//子传父 传递当前是什么组件 传递选择了什么日期
            this.$nextTick()
            console.group('敞口存入的vuex数据2', this.$store.state.uchartData.Exposure);
            console.groupEnd();
        },
    }
}
</script>

<style lang="scss">
@import '@/style/Profit/ProfitDetail/Exposure.scss';
</style>
