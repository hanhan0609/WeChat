<template>
    <view>
    <scroll-view class="scroll-view"
                 :scroll-anchoring="true"
                 :scroll-y="true"
                 :scroll-x="true"
                 :lower-threshold="5"
                 @scrolltolower="loadMoreData">
        <uni-table border
                   stripe
                   :emptyText="$t('common.notAnyMore')"
                   style="margin-top: 5px; border-collapse: collapse;table-layout: fixed;">
            <!-- 表头行 -->
            <uni-tr>
                <uni-th @click.native="sortevent"
                        v-for="(item, index) in th"
                        :width="index==0 || index==2||index==7? 56: 90"
                        align="center"
                        :key="index"
                        :id="index">{{ item }}
                    <uni-icons v-if="index >= 1 && index != 2 && index !=7"
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
                        align="center">{{ items.buyCur }}</uni-td>
                <uni-td width="75"
                        align="right">{{ tableMoney(items.buyAmt) }}</uni-td>
                <uni-td width="56"
                        align="center">{{ items.sellCur }}</uni-td>
                <uni-td width="75"
                        align="right">{{ tableMoney(items.sellAmt) }}</uni-td>
                <uni-td width="75"
                        align="right">
                        <text 
                            :style="{color:items.plAmt>=0?'#D9001B':'#92ED15'}">
                            {{ tableMoney(items.plAmt) }}
                        </text>
                </uni-td>
                <uni-td width="75"
                        align="center">{{ NumToStr(items.transDate) }}</uni-td>
                <uni-td width="75"
                        align="center">{{ NumToStr(items.valueDate) }}</uni-td>
                <uni-td width="56"
                        align="center">{{ items.businType | titlefilter }}</uni-td>
            </uni-tr>
            <uni-tr>
                <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
                <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
                <uni-td></uni-td>
            </uni-tr>
        </uni-table>
    </scroll-view>
    <view
    style="position: fixed;bottom: 0; width: 100vw;z-index: 10;display: flex;justify-content: space-around;padding: 5px;background-color:#2e3138 ;color: white;border-top: 1px solid white;">
  <view>{{ $t('common.totle') }}</view>
  <view :style="{color:total>=0?'#D9001B':'#92ED15' , margin:'0 -11vw 0 0'}">{{ tableMoney(total) }}</view>
</view>
</view>
</template>

<script>
import { tableMoney, NumToStr } from '@/uilts/uiltsForProfit'
export default {
    props: {
        th: Array,
        td: Array,
        total: Number
    },
    filters: {
        titlefilter: function(value) {
            let td_type={FX_SPOT:'即期',FX_FWD:'远期',FX_OPTION:'期权',CFL_DEAL:'现金流交易',TRANSFER_DEAL:'转账交易'}
            // let td_type = { FX_SPOT: this.$t('Profit.Hedge.td1[0]'), FX_FWD: this.$t('Profit.Hedge.td1[1]'), FX_OPTION: this.$t('Profit.Hedge.td1[2]'), CFL_DEAL: this.$t('Profit.Hedge.td1[3]'), TRANSFER_DEAL: this.$t('Profit.Hedge.td1[4]') }
            return td_type[value]
        }
    },
    onReady() {
    },
    data() {
        return {
            ascending: false,
            descending: true,
            select: null,
            dealTd: [],
            load: 0,
            td1: []
        };
    },
    computed: {
    },
    methods: {
        NumToStr,
        loadMoreData() {
            this.load++
            this.$emit('load', true)
        },
        tableMoney,
        change() {
            this.dealTd = [...this.$props.td].slice(0, 5)


            this.ascending = !this.ascending;
            this.descending = !this.descending;
        },
        dateSort(index) {
            const order = this.ascending ? 1 : -1;
            const word = ['buyCur', 'buyAmt', 'sellCur', 'sellAmt', 'plAmt' ,'transDate', 'valueDate','businType'][index]
            this.$props.td.sort(function (a, b) {
                return order * (a[word] - b[word]);
            });
        },
        moneySort(index) {
            const order = this.ascending ? 1 : -1;
            const word = ['buyCur', 'buyAmt', 'sellCur', 'sellAmt', 'plAmt' ,'transDate', 'valueDate','businType'][index]
            this.$props.td.sort(function (a, b) {
                return order * (a[word] - b[word]);
            });
        },
        sortevent(e) {
            this.select = e.currentTarget.id
            switch (this.select) {
                case '1':
                case '3':
                case '4':
                    this.moneySort(this.select)
                    break;
                case '5':
                case '6':
                    this.dateSort(this.select)
                    break;
            }
            this.change();
        },
    },
    mounted() {

        // this.sortevent({ currentTarget: { id: '2' } })
        // this.$nextTick()

    },
    watch: {
    },
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
