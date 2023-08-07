<template>
    <view class="container">
        <view class="menu">
            <view class="compeny">VisionFin Forex</view>
            <!-- <picker-view :value="value"
                         v-model="value"
                         @change="bindChange"
                         class="picker-view"
                         mask-class="mask"
                         indicator-class="indicator">
                <picker-view-column>
                    <view class="item"
                          v-for="(item, index) in cur"
                          :key="index"
                          style="line-height: 34px; text-align: center; font-weight: 700;vertical-align: middle;">
                          {{item.currencyPairs | slice0_3}}</view>
                </picker-view-column>
            </picker-view> -->
            <view style="width: 100px;display: flex;justify-content: space-around;">
                <uni-tag 
                    v-for="(item, index) in cur"  :key="index"
                    :text="item.currencyPairs | slice0_3" 
                    :type="isClick[index]?'default':'primary'"
                    :circle="true"
                    :inverted="false"
                    :id="index"
                    :class="[isClick[index]?'unselect':'']"
                    @click.native="bindChange($event)"></uni-tag>
            </view>
        </view>
    </view>
</template>

<script>
import { inquire } from '@/server/http';
export default {
    props:['whetherEXP'],
    watch:{
    },
   async created(){
        this.cur= this.$store.state.exchangeRateListData
        console.log(this.cur);
        // let today=uni.getStorageSync('default_date')
        // if(this.cur.length===0){
        //     let today='20220323'
        //     this.cur=await inquire('/CLOUD-WX/weixin/lastQuotes',{qryDate:today},this.$t('common.loading'))//获取新的日期的数据
        // }

        
        let CNY={currencyPairs:"CNY/CNY",frate:1}
        let USD={currencyPairs:"USD/USD",frate:1}
        let CNY_USD={currencyPairs:"CNY/USD",frate:1}

        //*如果为其它tab
        // const regex1 = /\b\/CNY\b/; // 匹配只包含 /CNY 结尾的字符串
        const regex0 = /\bUSD\/CNY\b/; // 匹配只包含 USD/CNY 结尾的字符串

            let pairs=Object.values(this.cur)//{ 0: a, 1: b }=>[a, b]

            // let filteredPairs1 = pairs.filter(pair => regex1.test(pair.currencyPairs));// 过滤符合正则表达式的字符串
            // this.cur1=[CNY,...filteredPairs1]

            let filteredPairs0= pairs.filter(pair => regex0.test(pair.currencyPairs));// 过滤符合正则表达式的字符串
            
            console.log(filteredPairs0,'filteredPairs0',this.$props.whetherEXP);
            
            CNY_USD.frate=1 / filteredPairs0[0].frate
            this.cur0=[USD,CNY_USD]
            this.cur=this.cur0

        //    if(this.$props.whetherEXP===0) {
        //         this.cur=this.cur0//设置在敞口页面--默认值
        //    }else{
        //         this.cur=this.cur1//设置不在敞口页面
        //    }
        //    this.bindChange({target:{value:[0]}})
           this.bindChange({target:{id:'0'}})
    },
    filters:{
        slice0_3:function(value){
            // return value[0]+value[1]+value[2]
            // return value.slice(-3)
            return value.slice(0, 3)
            
        }
    },
    data() {
        return {
            // currency: [{ name: 'HKD', rate: 0.8689 }, { name: 'USD', rate: 6.8119}, { name: 'CNY', rate: 1 }, { name: 'EUR', rate: 7.3897 }, { name: 'JPY', rate: 132.5 }],
            value: [0],
            cur:[],
            cur0:[],
            cur1:[],
            isClick:[true,false],
            
        }
    },
    methods: {
        bindChange(e) {
            console.log(e);
            this.isClick=this.isClick.reverse()
            // let i = e.target.value[0]
            let i = e.target.id
            let {currencyPairs,frate}=this.cur[i]
            console.log('子组件传递 货币选择', [e.target.id], this.cur[i]);
            this.$emit('passCUR',{currencyPairs,frate})
        },

    }
}
</script>

<style lang="scss">
@import '@/style/Profit/TopForProfit/TopForProfit.scss';
</style>
