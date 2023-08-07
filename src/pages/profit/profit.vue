<template>
    <view class="container">
        <!-- F1：logo 和 币种 -->
        <top-for-profit v-if="current === 0" @passCUR="passCUR" :whetherEXP="current"/>
        <top-for-profit v-if="current === 1" @passCUR="passCUR" :whetherEXP="current"/>
        <top-for-profit v-if="current === 2" @passCUR="passCUR" :whetherEXP="current"/>
        <top-for-profit v-if="current === 3" @passCUR="passCUR" :whetherEXP="current"/>

        <!-- F3：四个小菜单-->
        <view class="uni-padding-wrap uni-common-mt">
            <uni-segmented-control :current="current"
                                   :values="items"
                                   :style-type="styleType"
                                   :active-color="activeColor"
                                   @clickItem="onClickItem"
                                   style="width: 100vw;" />
        </view>

        <!-- F4：柱状图-->
        <view style="display: flex;justify-content: center;margin-bottom: 0.5rem;">
            <view class="charts-box">
                <qiun-data-charts type="column"
                                  :opts="opts"
                                  :chartData="chartData"
                                  :animation="false"
                                  v-model="chartData"
                                  :canvas2d="true"
                                  canvasId="jLZushbTynJKANBrUpgNSxymmDnXAWez"
                                  />
            </view>
        </view>

        <!-- F5：内容 -->
        <view class="something">
            <view v-if="current === 0"><!--敞口-->
                <Exposure @passArry="passArry"/>
            </view>
            <view v-if="current === 1"><!--订单损益-->
                <Trans @passArry="passArry"/>
            </view>
            <view v-if="current === 2"><!--套保损益-->
                <Hedge @passArry="passArry"/>
            </view>
            <view v-if="current === 3"><!--交易损益-->
                <Deal @passArry="passArry"/>
            </view>
        </view>
    </view>
</template>

<script>
import TopForProfit from '@/components/TopForProfit/TopForProfit.vue'
import Exposure from '@/components/ProfitDetail/Exposure.vue';
import Trans from '@/components/ProfitDetail/Trans.vue';
import Deal from '@/components/ProfitDetail/Deal.vue';
import Hedge from '@/components/ProfitDetail/Hedge.vue';
import config from '@/uilts/profitUChart.config';
export default {
    components: { TopForProfit, Exposure, Trans, Deal, Hedge },
    watch: {
        CUR(newVal, oldVal) {
            uni.setStorageSync('CUR', newVal)
            this.drew()
        },
        current(newVal, oldVal){
            console.log(newVal,'current');
        }
    },
    data() {
        return {
            items: [this.$t('Profit.menu[0]'), this.$t('Profit.menu[1]'), this.$t('Profit.menu[2]'), this.$t('Profit.menu[3]')],//小标题
            current: 0,
            styleType: 'button',
            // styleType: 'text',
            activeColor: '#3278ff',
            chartData: {},
            opts: config(30000000),
            CUR: 1,//默认CNY汇率为1
        };
    },
    methods: {
        passCUR(val) {//选择币种后从子组件触发传递
            console.log('父组件接收币种', val);
            const {currencyPairs,frate}=val
            this.CUR = frate
        },
        passArry(val) {//选接收子组件的指定值 指定绘制哪一个vux
            this.drewPicker = val
            this.drew()
            this.$nextTick()
        },
        onClickItem(e) {//通过点击不同小菜单来控制数据中不同的属性
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex
            }
            this.drew()
           
        },
        drew() {//绘制柱状图
            const{cur,name,select}= this.drewPicker
            const { categories } = this.$store.state.uchartData[name]; 
            // const data =this.$store.state.uchartData[name][cur].series[0].data.map((item) => Math.floor(item / this.CUR.rate));//币种处理
            let data 
            if(select===null){//判断是否有表格数据
                //币种处理
                data = this.$store.state.uchartData[name][cur].series[0].data.map((item) =>{
                    let c =item / this.CUR
                    return c.toFixed(2)
                })
            console.group(this.drewPicker,this.$store.state.uchartData[name][cur],data,name);

            }else{
                //币种处理
                // if(name=='Exposure'){
                //     data = this.$store.state.uchartData[name][select][cur].series[0].data.map((item) => Math.floor(item * this.CUR))
                // }else{
                //     data = this.$store.state.uchartData[name][select][cur].series[0].data.map((item) => Math.floor(item / this.CUR))
                // }
                data = this.$store.state.uchartData[name][select][cur].series[0].data.map((item) =>{
                    let c =item / this.CUR
                    return c.toFixed(2)
                });
                console.group(this.drewPicker,this.$store.state.uchartData[name][select][cur],data,name);

            }
            console.groupEnd()
            this.chartData = JSON.parse(JSON.stringify({
                categories: categories,
                series: [{
                    data:data,
                    name:'金额'
                }]
            }));
            //1.2e4代表科学计数法 1.2*10^4
            let max =Math.ceil(Math.max(...data)/10) * 40//设置y轴最大(正负差值大)
            let max2 =Math.ceil(Math.max(...data)/10) * 12 //设置y轴最大(正负差值小)
            let min =Math.floor( Math.min(...data)/10) * 40 //设置-y最大(正负差值大)
            let min2 =Math.floor( Math.min(...data)/10) * 12//设置-y最大(正负差值小)

            //调用配置函数返回canvas配置
            // if(max*min<=0){
            //     if(max==0&&min==0){
            //         this.opts=config(10,-10,true)
            //     }
            //     else if(Math.abs(max/min)>10 ){//(正值abs大)
            //         this.opts=config(max2,min,true)
            //     }else if(Math.abs(min/max)>10){//(负值abs大)
            //         this.opts=config(max,min2,true)
            //     }else{//(正负差值小)
            //         this.opts=config(max2,min2,true)
            //     }
                
            // }else{
            //     this.opts=config(max2,0)
            // }

            if(max * min >0){
                max>0 ? 
                this.opts=config(max2,0,true)
                :this.opts=config(0,min2,true)

                console.log('max * min >0');
            }else if( max==0 && min==0 ){
                this.opts=config(10,-10,true)
                console.log('max==0 && min==0');
            }else if(max * min <=0){
                console.log('max * min <=0');
                if(Math.abs(max/min)>20){
                    this.opts=config(max2,min,true)//(正值abs大)
                    console.log('正值abs大',max/min,min,max,data);

                }else if(Math.abs(min/max)>20){
                    this.opts=config(max,min2,true)//(负值abs大)
                    console.log('负值abs大',min/max,min,max,data);

                }else{
                    this.opts=config(max2,min2,true)//(正负差值小)
                    console.log('正负差值小');

                }
            }
            
        }
    },
    async onReady() {
    }
}
</script>
<style>
page {
    background: #2d3138;
}
</style>
<style lang="scss" scoped>
@import '@/style/Profit/Profit.scss';
</style>
