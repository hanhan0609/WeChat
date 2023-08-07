<template>
    <view>
        <ExchangeRateTop :currency="currency" :pageTopFlag="pageTopFlag"></ExchangeRateTop>
        <view class="list">
            <uni-list>
                <uni-list-chat 
                    v-for="(messageData, index) in messageData"
                    v-bind:key="index"
                    ellipsis="3"
                    showArrow
                    :title="messageData.title" 
                    avatar="/static/image/message.png" 
                    :note="messageData.description"
                >
                </uni-list-chat>
            </uni-list>
        </view>
        <!-- <uni-fab
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			@trigger="trigger"
		></uni-fab> -->
    </view>
</template>

<script>
import ExchangeRateTop from '../../components/ForeignExchangeComponents/ExchangeRateTop.vue';
import { postApi } from '@/server/http';
import { getDate } from '@/uilts/formatData';

    export default {
        components: {
            ExchangeRateTop
        },

        data() {
            return {
                totalCount: null,
                pageSize:10, //每页10条数据
                page:1, //第几页
                currency: 'VisionFin Forex',
                pageTopFlag: 'message',
                horizontal: 'right',
                vertical: 'bottom',
                direction: 'vertical',
                content: [{
						iconPath: '/static/QR.png',
						selectedIconPath: '',
						text: '相册',
						active: false
					},
					{
						iconPath: '/static/QR.png',
						selectedIconPath: '',
						text: '首页',
						active: false
					},
					{
						iconPath: '/static/QR.png',
						selectedIconPath: '',
						text: '收藏',
						active: false
					}
				],
                messageData: []
            }
        },

        onLoad() {
            // setTimeout(function () {
            //     console.log('start pulldown');
            // }, 1000);
            // uni.startPullDownRefresh();
        },

        onShow() {
            this.qryMsgData('refresh');
        },

        onPullDownRefresh() {
            // uni.stopPullDownRefresh();
            this.qryMsgData('refresh');
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        },

        onReachBottom() {
            console.log('onReachBottom', 'onReachBottom')
            let allTotal = this.page * this.pageSize;
                if(allTotal < this.totalCount){
                    //当前条数小于总条数 则增加请求页数
                    this.page ++;
                    this.qryMsgData() //调用加载数据方法
                }else{
                    return uni.showToast({
                        title: this.$t('common.notAnyMore')
                    });
                }
        },

        onReady() {
            this.qryMsgData('refresh');
        },

        methods: {
            async qryMsgData(refreshFlage) {
                let params = {
                    url: '/CLOUD-WX/weixin/getMessage',
                    Loadtitle:this.$t('common.loading'),
                    method: 'POST',
                    data: {
                        currentPage: this.page,
                        pageSize: this.pageSize,
                        beginDate: getDate(new Date()).fullDate
                    }
                }
                const res = await postApi(params);
                let { data:{status}, data:{data}, data:{code} } = res;
                if (status===200 && code==='00000000') {
                    this.totalCount = data.totalCount;
                    if (refreshFlage === 'refresh') {
                        this.messageData = [];
                    }
                    this.messageData = Array.from(new Set([...this.messageData, ...data.recordList]));
                } else {
                    return uni.showToast({
                        title: data.message
                    });
                }
                
            }
        }
    }
</script>

<style lang="scss">
    @import 'style/message/message.scss'

    // .uni-fab {
    //     width: 90vw !important;
    //     height: 90vh !important;
    // }

    // .uni-fab__content {
    //     width: 90vw !important;
    //     height: 90vh !important;
    //     justify-content: center !important; 
    // }

    // .uni-fab__item--active {
    //     width: 90vw !important;
    //     height: 27wh !important;
    // }

    // .uni-fab__item-image {
    //     width: 90vw !important;
    //     height: 22vh !important;
    // }
</style>