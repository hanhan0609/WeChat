<template>
	<view class="content">
		<view>
			<img
				class="logo2"
				src="../../static/image/visioninfo.jpg" />
		</view>
		<!-- 登录表单输入 -->
		<uni-forms :modelValue="formData">
			<!-- 账号 -->
			<uni-forms-item
				:label="$t('login.account')"
				name="name">
				<!-- VisionFin账号 -->
				<input
				placeholder-style="color:#d6d6d6"
					type="text"
					v-model="uname"
					:placeholder="$t('login.visionFinAccount')" />
			</uni-forms-item>
			<!-- 密码 -->
			<uni-forms-item
				:label="$t('login.password')"
				name="name">
				<!-- 请输入密码 -->
				<input
				placeholder-style="color:#d6d6d6"
					type="text"
					v-model="upwd"
					:placeholder="$t('login.enterPassword')"
					:password="hidePwd" />
			</uni-forms-item>
			<!-- 登录 -->
			<button
				class="button"
				@click="submit">
				{{ $t("login.title") }}
			</button>
		</uni-forms>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="error" cancelText="" :confirmText="$t('common.closeText')" :title="$t('common.infoText')" :content="content" @confirm="dialogConfirm"
			@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<view class="login-bottom">
			<user-agreement />
		</view>
	</view>
</template>

<script>
	import UserAgreement from "@/components/UserAgreement/UserAgreement.vue";
	import{submitLogin} from './stroe/loginSlice.js'
	export default {
		components: { UserAgreement },

		onReady() {
		},
		data() {
			return {
				hidePwd: true, //是否隐藏密码
				uname: "", //用户名
				upwd: "", //密码
				focusedInput: "", //当前获得输入焦点的元素名
				content:""
			};
		},
		methods: {
			dialogClose() {
			},
			dialogConfirm() {
			},
			clearInput(event) {
				this.inputClearValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon() {
				this.inputClearValue = "";
				this.showClearIcon = false;
			},
			changePassword() {
				this.showPassword = !this.showPassword;
			},
			async submit() {
				if(this.$store.state.agreement1===false){
					// this.content="请同意用户隐私协议"
					this.content=this.$t('login.plaseAgree')
					this.$refs.alertDialog.open()//弹出层
					return
				}
				if(!this.uname || !this.upwd){
					// this.content="账户密码不能为空"
					this.content=this.$t('login.pwdOrNameNot')
					this.$refs.alertDialog.open()//弹出层
					return
				}
				let value = {
					userName: this.uname,
					userPwd: this.upwd,
					loginChannel: "weixin",
					orgUserType: "1",
					userType: "1",
				};
				let {statusCode,data:{data}} = await submitLogin(value,this.$t('common.loading'));//解构
				console.log(statusCode,data);
			},
		},
	};
</script>

<style lang="scss">
::v-deep .uni-dialog-button:nth-child(1){
	display: none
	}
	@import "@/style/Login/Login.scss";
</style>
