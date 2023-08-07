/*******对服务器端数据API进行二次封装*******/
import jwt from 'jsonwebtoken';
import {checkForEmptyValues} from '@/uilts/uiltsForProfit'
// secret: 'a7BzdByGfXpHNCberhgVMGIaTxtSBcgS',
export const jwtConfig = {
	secret: '',
	expiresIn: '2 days' // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};
// export const appConfig={
// 	appid:"wxad5f4927df82d423",
// 	secretKey:"ec7ba3a7b0dddb325a38d2aa6fd2bbb0"
// }

export const BASE_URL = process.env.VUE_APP_SYS_URL;
// export const BASE_URL = "http://wx.visionfin.cn:9500";
const header = {
	"content-type": "application/json",
};


/**
 * API-一键登陆
 * 接口地址：http://wx.visionfin.cn:9500/CLOUD-WX/weixin/wexinlogin
 * 请求方式：POST
 * 请求示例：{String,String,String} 
 */
export let autoLogin=async(value,title)=>{
	uni.showLoading({
		title,
		mask:true,
	});
	let url = BASE_URL + '/CLOUD-WX/weixin/wexinlogin';
	let lang = uni.getStorageSync('lang')
	let res = await uni.request({
		header:{
            ...header,
            Authorization:"Login",
						Language:lang
        },
		url,
		method: "POST",
		data:{
			code:value,
			// ...appConfig
		},
	});
	let {status,code,data}=res.data;
	if(status===200&&code==='00000000'){
		let Token=jwt.sign({ id: data.token}, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
		uni.setStorageSync('vision_access_token', Token);//缓存token
		uni.setStorageSync('vision_user_id', data.userId);//缓存ID
	}
	uni.hideLoading();
	return res;
}



/**
 * API-损益-查询
 * 接口地址：http://wx.visionfin.cn:9500${path}
 * 请求方式：POST
 */
export let inquire=async(path,value,title)=>{
	uni.showLoading({
		title,
		mask:true
	});
	// if (checkForEmptyValues(value)) {
	// 	uni.hideLoading();
	// 	return {}
	// }
	let url = BASE_URL + path;
	let Authorization=uni.getStorageSync('vision_access_token')
	let Language = uni.getStorageSync('lang')
	let res = await uni.request({
		header:{
            ...header,
            Authorization,
						Language,
        },
		url,
		method: "POST",
		data:value,
	});
	uni.hideLoading();
	console.log(res);

	if (res.statusCode === 401) {
		uni.removeStorageSync('vision_user_id');
		uni.removeStorageSync('vision_access_token');
		uni.reLaunch({
				url: '/pages/index/index'
		});
	
		uni.showToast({
			title:res.data.message,
			duration: 2000,
			icon:'error'
		});
	}

	

	let sortedKeys = Object.keys(res.data.data).sort();

	let sortedData = {};
	sortedKeys.map(key => {
  	sortedData[key] = res.data.data[key];
	});
	return sortedData;
}









/**
 * API-其它页面-查询
 * 接口地址：http://wx.visionfin.cn:9500${path}
 * 请求方式：POST
 */

export const postApi = (opt) => {
	uni.showLoading({
		title:opt.Loadtitle,
		mask:true
	});
	const Authorization = uni.getStorageSync('vision_access_token');
	return new Promise((resolve, reject) => {
			uni.request({
					header:{
							...header,
							Authorization: Authorization,
							language: uni.getStorageSync('lang')
					},
					url: BASE_URL + opt.url,
					method: opt.method || 'GET',
					data: opt.data || {},
					success(res) {
						let { data:{ data }, data:{ code } } = res;
						if (code === '00000000') {
							resolve(res);
						} else {
							if (res.statusCode === 401) {
								uni.removeStorageSync('vision_user_id');
								uni.removeStorageSync('vision_access_token');
								uni.reLaunch({
										url: '/pages/index/index'
								});}

								uni.showToast({
									title:res.data.message,
									duration: 2000,
									icon:'error'
								});
								
								console.log(res.statusCode,res);
							return 
							}
						},
						fail(err) {
							reject(err);
							return uni.showToast({
								title: opt.title
							});
						},
						complete(value){
							console.log(value,666);
						uni.hideLoading();
					}
			})
	})
}