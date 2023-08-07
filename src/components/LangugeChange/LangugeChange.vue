<template>
    <view class="lang">
        <uni-data-select
        v-model="value"
        :localdata="range"
        @change="switchChangeLocale"
        :clear="false"
      ></uni-data-select>
    </view>
</template>

<script>
export default {
data() {
    return {
        value: 0,
        range: [
          { value: 0, text: "简体中文" ,img:'@/static/zh.png'},
          { value: 1, text: "English",img:'@/static/us.png' },
        ],
    }
},
mounted(){
  this.onLocaleChange({ code: "zh-Hans" })
  uni.setStorageSync('lang', 'zh_CN');
},
methods: {
    change(e) {
        console.log("lang更改", e);
    },
    onLocaleChange(e) {
      console.log('lang的值',e);
      uni.setLocale(e.code);
      this.$i18n.locale = e.code;
      if(e.code!=='en'){
        uni.setStorageSync('lang', 'zh_CN');
      }
    },
    switchChangeLocale(e) {
      console.log("lang更改", e);
      e ?  this.onLocaleChange({ code: "en" }): this.onLocaleChange({ code: "zh-Hans" });
    },
}
}
</script>

<style lang="scss">

</style>
