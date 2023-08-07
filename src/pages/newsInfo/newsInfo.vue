<template>
    <view class="container">
        <ExchangeRateTop :currency="currency" :pageTopFlag="pageTopFlag" @searchHandle="searchHandle"></ExchangeRateTop>
        <!-- <view class="swiper">
            <uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
                <swiper autoplay="true" class="swiper-box" @change="change">
                    <swiper-item v-for="(item ,index) in info" :key="index">
                        <view class="swiper-item">
                            <image :src="item.url"></image>
                        </view>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>
        </view> -->
        <view class="list">
            <uni-list>
                <uni-list-item 
                    v-for="(filterMessageData, index) in filterMessageData"
                    v-bind:key="index"
                    ellipsis="4"
                    thumb-size="lg"
                    :title="filterMessageData.title" 
                    :thumb="filterMessageData.img_path" 
                    :to="`../../packageNavigate/pages/NewsInfoDetail?url=` + encodeURIComponent(filterMessageData.url) "
                >
                </uni-list-item>
            </uni-list>
        </view>
    </view>
</template>

<script>
import ExchangeRateTop from '../../components/ForeignExchangeComponents/ExchangeRateTop.vue';

    export default {
		components: {ExchangeRateTop},
		data() {
            return {
                totalCount: null,
                pageSize: 8, //每页10条数据
                page: 0, //第几页
                currency: 'VisionFin Forex',
                pageTopFlag: 'newsInfo',
                searchValue: '',
                info: [
                    {
                        url: 'http://i6.hexun.com/2022-10-29/207000444.jpg',
                        content: '汇市周评：FED放缓升息预期美元回落，欧洲央行升息欧元回升'
                    }, 
                    {
                        url: 'https://i-cncdn.investing.com/news/USDollars_800x533_L_1605553287.jpg',
                        content: '外汇欧市：美元指数飙升0.6%收复103关口 欧元重挫0.90%'
                    }, 
                    {
                        url: 'https://img.caixin.com/2023-03-15/167889341558938_480_320.jpg',
                        content: '三大报价平台下架债券实时报价 风波何来'
                    }
                ],
                messageData: [],
                filterMessageData: [],
                current: 0,
                mode: 'nav',
            }
        },

        onLoad() {
            // setTimeout(function () {
            //     console.log('start pulldown');
            // }, 1000);
            // uni.startPullDownRefresh();
        },

        onPullDownRefresh() {
            uni.stopPullDownRefresh();
            // this.qryNewsInfoData();
            // setTimeout(function () {
            //     uni.stopPullDownRefresh();
            // }, 1000);
        },

        onReachBottom() {
            console.log('onReachBottom', 'onReachBottom')
            // let allTotal = this.page * this.pageSize;
            //     if(allTotal < this.totalCount){
                    //当前条数小于总条数 则增加请求页数
                    this.page ++;
                    this.qryNewsInfoData() //调用加载数据方法
                // }else{
                //     // console.log('已加载全部数据')
                // }
        },

        onReady() {
            this.qryNewsInfoData();
        },

        methods: {
            async qryNewsInfoData() {
                const Authorization = uni.getStorageSync('vision_access_token');
                
                let res = await uni.request({
                    header:{
                        Authorization: Authorization,
                        language: uni.getStorageSync('lang')
                    },
                    url: 'https://www.visionfin.cn/app/APPServlet?tranCode=Finc&subTranCode=qry&page=' + this.page + '&pageSize=' + this.pageSize,
                    method: 'POST',
                    data: {},
                })
                let { statusCode, data:{returnCode} } = res;
                if (statusCode === 200 && returnCode === "0000") {
                    let newsInfoData = res.data.dataSetResult.data;
                    this.messageData = [...this.messageData, ...newsInfoData];
                    this.filterMessageData = [...this.filterMessageData, ...newsInfoData];
                } else {
                    return uni.showToast({
                        title: this.$t('common.apiError')
                    });
                }
                
            },
            clickItem(e) {
				this.swiperDotIndex = e;
			},
            change(e) {
				this.current = e.detail.current;
			},

            onClick() {
                uni.navigateTo({
                    url: '../components/NewsInfoDetail/NewsInfoDetail'
                })
            },

            // 子组件搜索回调
            searchHandle(val) {
                // 搜索框输入值
				this.searchValue = val;
                
                // 模糊查询
                if (this.searchValue == '') {
                    this.filterMessageData = this.messageData;
                } else {
                    this.filterMessageData = this.messageData.filter((item) => {
                        return item.title.indexOf(this.searchValue) !== -1;
                    })
                }
			},
        }
    }
</script>

<style lang="scss">
::v-deep.uni-list--border::after{
    background-color: #545353 !important;
}
    @import 'style/newsInfo/newsInfo.scss';
</style>