<template>
    <view class="">
        <web-view :src="newUrl"></web-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            newUrl: 0
        } 
    },

    onLoad(option) {
        this.newUrl = decodeURIComponent(option.url);
        uni.setNavigationBarTitle({
            title: ''
        });
    },

    onReady() {
        uni.hideShareMenu();
    },

    methods: {
        
    }

}
</script>

<style lang="scss">
    page {
        background-color: rgba(43, 43, 43, 1);
    }

    .container {
        color: rgba(157, 157, 157, 1);

        .title-box {
            font-weight: 900;
            font-size: 22px;
            text-align: center;
            padding: 20px;
        }

        .img-box {
            width: 90vw;
            padding: 0 30rpx;

            image {
                width: 100%;
            }
        }

        .source-box {
            display: flex;
            margin: 10rpx 30rpx;

            .source {
                margin-right: 5PX;
            }
            .author {
                margin-right: 5PX;
            }
        }

        .content {
            margin-top: 20rpx;
            margin-right: 30rpx;
            margin-left: 30rpx;
            line-height: 44rpx;
            letter-spacing: 2px;
            font-size: 24rpx;
        }
    }
    
</style>