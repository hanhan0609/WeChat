<template>
    <view class="content">
        <ExchangeRateTop :currency="currency" :pageTopFlag="pageTopFlag" @qryDateChange="qryDateChange"></ExchangeRateTop>
        <ExchangeRateList :currencyData="currencyData"></ExchangeRateList>
    </view>
</template>         

<script>
import ExchangeRateTop from '../../components/ForeignExchangeComponents/ExchangeRateTop.vue';
import ExchangeRateList from '../../components/ForeignExchangeComponents/ExchangeRateList.vue';
import { postApi } from '@/server/http';
import {dateFormat} from '@/uilts/formatData';

export default {
    components: {
        ExchangeRateTop,
        ExchangeRateList
    },
    data() {
        return {
            qryDate: '',
            currency: 'VisionFin Forex',
            pageTopFlag: 'foreignExchangeMarket',
            currencyData: []
        }
    },
    onShow() {
        let lang=uni.getStorageSync('lang')
        uni.setLocale(lang);
        this.$i18n.locale = lang;

        //更改底部标题
        uni.setTabBarItem({ index: 0, text: this.$t('Exchange.title'), })
        uni.setTabBarItem({ index: 1, text: this.$t('Profit.title'), })
        uni.setTabBarItem({ index: 2, text: this.$t('Message.title'), })
        uni.setTabBarItem({ index: 3, text: this.$t('News.title'), })

        //token过期
    },
    async onReady() {
        this.qryDate = uni.getStorageSync('default_date');
        await this.forExMarketQry();
        this.$store.state.exchangeRateListData = this.currencyData;
    },
    methods: {
        qryDateChange(val) {
            this.qryDate = dateFormat('yyyymmdd', val);
            this.forExMarketQry();
        },
        async forExMarketQry() {
            let params = {
                title: this.$t('common.apiError'),
                Loadtitle:this.$t('common.loading'),
                url: '/CLOUD-WX/weixin/lastQuotes',
                method: 'POST',
                data: {
                    qryDate: this.qryDate
                }
            }
            const res = await postApi(params);
            let { data:{data} } = res;
            // console.log(res.data,66666);
            // if (res.data.message === "没有访问权限") {
            //         uni.removeStorageSync('vision_user_id');
            //         uni.removeStorageSync('vision_access_token');
            //         uni.reLaunch({
            //             url: '/pages/index/index'
            //         });

            // }
            this.currencyData = data;
        }
    }
    
}

</script>

<style lang="scss">
    @import 'style/ForeignExchangeComponents/ExchangeRateList.scss';

    page {
        background-color: #2C3138;
    }

    .content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>