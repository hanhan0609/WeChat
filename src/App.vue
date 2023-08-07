<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/static/iconfont.css";
	@import "@/static/iconfont1.css";
	::v-deep.unselect{
	
		text{
			background-color: transparent;
			border-color: #fff;
		}
	}
</style>
