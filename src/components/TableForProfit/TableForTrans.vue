<template>
<view>
    <scroll-view class="scroll-view"
                :scroll-anchoring="true"
                 :scroll-y="true"
                 :scroll-x="true"
                 :lower-threshold="50"
                 @scrolltolower="loadMoreData">
        <uni-table border
                   stripe
                   :emptyText="$t('common.notAnyMore')"
                   style="margin-top: 5px; border-collapse: collapse;table-layout: fixed;">
            <!-- 表头行 -->
            <uni-tr>
                <uni-th @click.native="sortevent"
                        v-for="(item, index) in th"
                        :width="index===1?56:(index==2?120:90)"
                        align="center"
                        :key="index"
                        :id="index">{{ item }}
                    <uni-icons v-if="index >= 2"
                               custom-prefix="iconfont"
                               :type="select == index ? (ascending ? 'icon-reOrderUp' : 'icon-biaoge_paixu_actived') : 'icon-biaoge_paixu'"
                               :color="select == index && ascending ? '#f00' : (select == index && descending ? '#0f0' : '#fff')"
                               size="10" />
                </uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <!-- <uni-tr v-for="(items, index) in dealTd" -->
            <uni-tr v-for="(items, index) in td"
                    :key="index">
                <uni-td width="56"
                        align="center">{{ items.exposureDirection | titlefilter }}</uni-td>
                <uni-td width="56"
                        align="center">{{ items.curr }}</uni-td>
                <uni-td width="75"
                        align="right">{{ tableMoney(items.amount) }}</uni-td>
                <uni-td width="75"
                        align="right">
                        <text 
                            :style="{color:items.plAmt>=0?'#D9001B':'#92ED15'}">
                            {{ tableMoney(items.plAmt) }}
                        </text>
                </uni-td>
                <uni-td width="75"
                        align="center">{{ NumToStr(items.date) }}</uni-td>
                <uni-td width="75"
                        align="center">{{ NumToStr(items.endDate) }}</uni-td>
            </uni-tr>
            <uni-tr>
                <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
                <uni-td></uni-td>
            </uni-tr>
            <!-- <uni-tr>
            <uni-td width="50"
                    align="center">{{ $t('common.totle') }}</uni-td>
            <uni-td></uni-td>
            <uni-td></uni-td>
            <uni-td></uni-td>
            <uni-td width="50"
                    align="center">{{ tableMoney(totle) }}</uni-td>
            <uni-td></uni-td>
        </uni-tr> -->

        </uni-table>
    </scroll-view>
    <view style="position: fixed;bottom: 0; width: 100vw;z-index: 10;display: flex;justify-content: space-around;padding: 5px;background-color:#2e3138 ;color: white;border-top: 1px solid white;">
        <view>{{ $t('common.totle') }}</view>
        <view :style="{color:total>=0?'#D9001B':'#92ED15'}">{{ tableMoney(total) }}</view>
    </view>
</view>
</template>

<script>
import {tableMoney,NumToStr} from '@/uilts/uiltsForProfit'
export default {
    props: {
        th: Array,
        td: Array,
        total: Number,
    },
    onReady() {
    },
    filters:{
        titlefilter:function(value){
            
            let td_type={'0':'空头','1':'多头'}
            // let td_type={'001':this.$t('Profit.Trans.td1[0]'),'002':this.$t('Profit.Trans.td1[1]')}
            return td_type[value]
        }
    },
    data() {
        return {
            ascending: false,
            descending: true,
            select: null,
            dealTd: [],
            load:0
        };
    },
    computed: {
    },
    methods: {
        NumToStr,
        loadMoreData() {
           this.load++
           this.$emit('load',true)

         },
        tableMoney,
        change() {
            this.dealTd = [...this.$props.td].slice(0,5)

            
            this.ascending = !this.ascending;
            this.descending = !this.descending;
        },
        dateSort(index) {
            const order = this.ascending ? 1 : -1;
            const word = ['exposureDirection', 'curr', 'amount','plAmt', 'date', 'endDate'][index]
            this.$props.td.sort(function (a, b) {
                return order * (a[word] - b[word]);
            });
        },
        moneySort(index) {
            const order = this.ascending ? 1 : -1;
            const word = ['exposureDirection', 'curr', 'amount','plAmt', 'date', 'endDate'][index]
            this.$props.td.sort(function (a, b) {
                return order * (a[word] - b[word]);

            });
        },
        sortevent(e) {
            this.select = e.currentTarget.id
            console.log(e);
            switch (this.select) {
                case '2':
                case '3':
                    this.moneySort(this.select)
                    break;
                case '4':
                case '5':
                    this.dateSort(this.select)
                    break;
            }
            this.change();
        },
    },
    mounted() {
        // this.sortevent({ currentTarget: { id: '2' } })
    },
    watch: {},
};
</script>

<style lang="scss">
.scroll-view {
    height: calc(100vh - 71px - 250px - 6vh - 10vh - 36px - 32px - 0.5rem);
    -webkit-overflow-scrolling:touch;
    overflow-y: scroll
}
::-webkit-scrollbar{
    display: none;
}
</style>
