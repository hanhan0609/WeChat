<template>
	<view class="list">
        <uni-list>
            <uni-list-chat 
                class=""
                v-for="(currencyData, index) in currencyData" 
                v-bind:key="index"
                :title="lang == 'zh_CN' ? currencyData.currencyPairsCN : currencyData.currencyPairs"
                :note="dateFormat('mm/dd', currencyData.dataDate) + ' ' + currencyData.currencyPairs"
                :to="`../../packageNavigate/pages/ExchangeRateDetail?currencyData=` + JSON.stringify(currencyData) + `&chooseIndex=` + index"
            >
                <uni-icons
                    class="time-icons"
                    custom-prefix="iconfont"
                    type="icon-shijian-copy"
                    color="#F59A23"
                    size="20"
                />
                <view class="chat-custom-right">
                    <view class="chat-custom-text">{{ currencyData.frate }}</view>
                    <view :class="currencyData.difference >= 0 ? 'right-bottom-red' : 'right-bottom-green'">{{ currencyData.difference + '(' + currencyData.percent.toFixed(4) + '%)' }}</view>
                </view>
		    </uni-list-chat>
        </uni-list>
	</view>
</template>

<script>
import {dateFormat} from '@/uilts/formatData';

export default {
    props: {
        currencyData: Array,
    },
    data() {
        return {
            lang: uni.getStorageSync('lang'),
        }
    },
    methods: {
        dateFormat,
        onClick() {
            uni.navigateTo({
                url: '../components/ForeignExchangeComponents/ExchangeRateDetail'
            });
        }
    }
}
</script>

<style lang="scss">
    
</style>