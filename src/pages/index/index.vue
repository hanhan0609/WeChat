<template>
	<view class="content">
		<view class="langchange">
			<languge-change />
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<img
				class="logo"
				src="../../static/image/visioninfo.jpg" />
			<button
				class="login-btn"
				open-type="getPhoneNumber"
				@getphonenumber="getphonenumber"
				:style="[{ 'letter-spacing': applicationLocale == 'zh-Hans' ? '0.5rem' : '0.1rem' }]">
				<uni-icons
					type="weixin"
					size="26"
					color="#FFF" 
					style="margin-left: 30px;"/>
				<!-- <p>通过微信登录</p> -->
				<view :style="[{'font-weight': '700','margin-right':applicationLocale== 'zh-Hans' ? '45px':'0px',}]">{{ $t("login.wechatButtonText") }}</view>
			</button>
			<view class="login-bottom">
				<!-- 其他登录方式 -->
				<navigator
					url="/pages/Login/Login?title=login"
					class="other-login"
					hover-class="none">
					{{ $t("login.otherButtonText") }}
				</navigator>
				<user-agreement />
			</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="error" cancelText="" :confirmText="$t('common.closeText')" :title="$t('common.infoText')" :content="$t('login.plaseAgree')" @confirm="dialogConfirm"
			@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import LangugeChange from "@/components/LangugeChange/LangugeChange.vue";
	import UserAgreement from "@/components/UserAgreement/UserAgreement.vue";
	import { autoLogin } from "@/server/http";

	// Vue.prototype.$autoLogin = autoLogin;

	export default {
		components: { LangugeChange, UserAgreement },

		data() {
			return {
				title: "Hello",
				phoneNumber: "13782356374",
				applicationLocale: "en",
			};
		},

		onLoad() {
			let systemInfo = uni.getSystemInfoSync(); //获取系统语言
			this.applicationLocale = uni.getLocale(); //获取当前设置语言
			// this.isAndroid = systemInfo.platform.toLowerCase() === 'android';//是不是安卓
			uni.onLocaleChange(e => {
				this.applicationLocale = e.locale; //更改为当前设置语言
				uni.setStorageSync("lang", this.applicationLocale); //保存当前设置语言
			});
			if (uni.getStorageSync("vision_access_token")) {//如果token未失效直接跳转到汇市无需登录
				uni.switchTab({
					url: "/pages/foreignExchangeMarket/foreignExchangeMarket",
				});
			}
			// this.phoneNumber = this.phoneNumber.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2'); // 手机号码中间四位隐藏
			// console.log(this.phoneNumber);
		},
		methods: {
			dialogClose() {
				console.log('点击关闭')
			},
			dialogConfirm() {
				console.log('点击确认')
			},
			async getphonenumber(e) {
				console.log(e,e.detail.code);
				if(this.$store.state.agreement===false){
					this.$refs.alertDialog.open()//弹出层
					return
				}
				let res= await autoLogin(e.detail.code,'加载中')
				console.group(res);
				console.groupEnd()
				let {status,code,message}=res.data
				if(status===200&&code==='00000000'){
					uni.switchTab({
	                    url: '/pages/foreignExchangeMarket/foreignExchangeMarket'
                    }); 

				}else{
					wx.showToast({
						mask:true,
						icon: "none",
						title: message,
						duration: 2000,
					});
				}
				// if (this.phoneNumber) {
				// 	// const res = await autoLogin({
				// 	// 	url: '/CLOUD-WX/weixin/wexinloginPOST',
				// 	// 	data: {
				// 	// 		code: e.detail.code
				// 	// 	}
				// 	// });
				// 	// console.log(res);
				// 	console.log(this.phoneNumber);
				// 	wx.switchTab({
				// 		url: "/pages/foreignExchangeMarket/foreignExchangeMarket",
				// 	});
				// } else {
				// 	wx.showToast({
				// 		icon: "none",
				// 		title: "一键登录失败",
				// 		duration: 2000,
				// 	});
				// }

			},
			register() {},
		},
	};
</script>

<style lang="scss">

::v-deep .uni-dialog-button:nth-child(1){
display: none
}
	@import "../../style/Index/index.scss";
</style>
