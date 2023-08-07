import Vue from 'vue'
import App from './App'

import zh_CN from '@/i18n/zh_CN'
import en from '@/i18n/en'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import store from '@/store/index.js' 
import {getDefaultDate, dateFormat} from '@/uilts/formatData'

import uView from 'uview-ui'
Vue.use(uView);

// 全局分享
const $x = {}; 
Vue.prototype.$x = $x;
let share=require('uilts/share.js');
Vue.mixin(share);


Vue.config.productionTip = false

App.mpType = 'app'

let language = 'en'   //默认语言
if(uni.getLocale()=='zh-Hans'){  //判断当前设备的语言，我是用的uniapp的方法
	language = 'zh_CN'
}else{
	language = 'en'
}
const i18n = new VueI18n({
	locale: language, // 默认选择的语言
  fallbackLocale: 'zh_CN',
  fallbackRoot: true,
	messages: {
		'en': en,
		'zh_CN': zh_CN
	}
})
Vue.prototype.$_i18n = i18n;




function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

uni.addInterceptor({
  returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res) => {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  },
});

uni.setStorageSync('default_date', getDefaultDate());
uni.setStorageSync('market_qrydate', dateFormat('yyyy-mm-dd', getDefaultDate()));
store.state.detailQryDate = getDefaultDate();

const app = new Vue({
  i18n,
  ...App,
  store
})
app.$mount()
