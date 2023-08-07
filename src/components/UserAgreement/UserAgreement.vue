<template>
	<view class="content">
        <view class="service-terms">
            <checkbox value="cb" :checked="agree" @click="agreeevent" />
                {{ $t('login.agree') }}
            <navigator class="navigator" url="/packageNavigate/pages/LoginAgreement" hover-class="none" >
                {{ $t('login.userAgreement') }}
            </navigator>
                {{ $t('login.and') }}
            <navigator class="navigator" url="/packageNavigate/pages/LoginAgreement" hover-class="none">
                {{ $t('login.privacyPolicy') }}
            </navigator>
        </view>
	</view>
</template>

<script>


export default ({
    created(){
        console.log(this.$root.__route__,'this.$root.__route__',this.$store.state.agreement1);
        if(this.$root.__route__=="pages/index/index"){
            this.agree=this.$store.state.agreement

        }else{
            this.agree=this.$store.state.agreement1

        }
    },
	data() {
		return {
            agree:false,
			applicationLocale: 'en',
		}
	},

	onLoad() {
		let systemInfo = uni.getSystemInfoSync();//获取系统语言
		this.applicationLocale = uni.getLocale();//获取当前设置语言
		uni.onLocaleChange((e) => {
			this.applicationLocale = e.locale;//更改为当前设置语言
			uni.setStorageSync('lang', this.applicationLocale)//保存当前设置语言
		})
	},
	methods: {
        agreeevent(){
            // console.log(this.$root.__route__);
            
            
           
            this.agree=!this.agree
            if(this.$root.__route__=="pages/index/index"){
                this.$store.commit('CheckedAndAgree',this.agree)//存储数据到vuex
                // this.agree=this.$store.state.agreement
                console.log(this.$root.__route__,this.$store.state.agreement);

            }else{
                this.$store.commit('CheckedAndAgree1',this.agree)//存储数据到vuex
                // this.agree=this.$store.state.agreement1
                console.log(this.$root.__route__,this.$store.state.agreement1);

            }
            
        }
		
	}
});
</script>

<style lang="scss">
.service-terms {
    width: 100vw;
    padding: 2vw;
    display: inline-block;
    text-align: center;

    .navigator {
        display: inline-block;
        color: blue;
        margin: 0 1vw 0 1vw;
    }
}
</style>
