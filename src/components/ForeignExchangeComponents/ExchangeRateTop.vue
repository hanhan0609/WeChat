<template>
    <view>
        <view class="header">
            <view class="name">{{ currency }}</view>
            <view :class="classFlag ? 'datetime-body-click' : 'datetime-body'" v-if="pageTopFlag == 'foreignExchangeMarket'">
			    <uni-datetime-picker 
                    type="date" 
                    v-model="currentDate"
                    @change="onChangeMarket"
                    :end="defaultDate"
                >
                    {{ currentDate }}
                </uni-datetime-picker>
		    </view>
            <view :class="classFlag ? 'datetime-body-click' : 'datetime-body'" v-if="pageTopFlag == 'foreignExchangeDetail'">
			    <uni-datetime-picker 
                    type="date" 
                    v-model="detailQryDate" 
                    @change="onChangeDetail"
                    :end="defaultDate"
                >
                    {{ detailQryDate }}
                </uni-datetime-picker>
		    </view>
            <view class="set-body" v-if="pageTopFlag == 'message'">
                <!-- <navigator class="navigator" url="" hover-class="none">
                    创建提醒
                </navigator> -->
            </view>
            <view class="searchbar-body" v-if="pageTopFlag == 'newsInfo'">
                <uni-search-bar 
                    radius="5" 
                    :placeholder="this.$t('News.placeholder')" 
                    clearButton="auto" 
                    cancelButton="none" 
                    v-model="searchValue" 
                    @input="input" 
                    @confirm="search"
                >
                </uni-search-bar>
            </view>
        </view>
    </view>
</template>

<script>
import {dateFormat} from '@/uilts/formatData';

    export default {
        props: {
            currency: String,
            pageTopFlag: String
        },
        data() {
            let defaultDate = dateFormat('yyyy-mm-dd',uni.getStorageSync('default_date'));
            let detailQryDate = uni.getStorageSync('market_qrydate');
            return {
                classFlag: false,
                defaultDate: defaultDate,
                currentDate: defaultDate, // 默认日期
                detailQryDate: detailQryDate,
                searchValue: ''
            }
        },

        methods: {
            dateTimePickerClick() {
                this.classFlag = true;
                setTimeout(() => {
                    this.classFlag = false;
                }, 100);
            },
            // 汇市行情日期change
            onChangeMarket(e) {
                uni.setStorageSync('market_qrydate', e);
                this.currentDate = e;
                this.$emit('qryDateChange', e);
            },

            // 汇率详情日期change
            onChangeDetail(e) {
                this.currentDate = e;
                this.$emit('qryDateChange', e);
            },

            // 点击回车搜索事件
            search(res) {
                this.$emit('searchHandle', res.value)
			},

            // 搜索框输入值改变搜索事件
            input(res) {
                this.$emit('searchHandle', res)
            }
        }
        
    }
</script>

<style lang="scss">
    @import 'style/ForeignExchangeComponents/ExchangeRateTop.scss';
</style>