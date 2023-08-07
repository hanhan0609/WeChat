import CryptoJS from "crypto-js";
import { BASE_URL, jwtConfig } from "@/server/http";
import jwt from "jsonwebtoken";
/**
 * API-加密
 * @description 使用加密秘钥，对 需要加密的参数 进行加密
 */
export let AESencrypt = (src, key) => {
	debugger;
	console.log(key, "key");
	let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(src), CryptoJS.enc.Utf8.parse(key), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	});
	encrypted = encrypted.ciphertext.toString();
	const encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted);
	return CryptoJS.enc.Base64.stringify(encryptedHexStr);
};

/**
 * API-获取key
 * 接口地址：http://wx.visionfin.cn:9500/CLOUD-BASE/loginManager/getKey/账号
 * 请求方式：POST
 * 请求示例：http://wx.visionfin.cn:9500/CLOUD-BASE/loginManager/getKey/admin123
 */
export let GetKey = async UserName => {
	let url = BASE_URL + `/CLOUD-BASE/loginManager/getKey/${UserName}`;
	let res = await uni.request({
		url,
		method: "POST",
	});
	console.group(res.status, res.data);
	if (res.data.status === 200) {
		console.group(res.data, "res.data.data");
		return res.data.data;
	} else {
		console.group(res, "res.status");

		uni.showToast({
			icon: "none",
			title: "获取key失败",
			duration: 2000,
		});
	}
};

/**
 * API-账号密码加密登陆
 * @description  发送加保密过的账号密码=>请求数据
 * @port  /user/getdata
 * @method POST
 * @param {string} uname
 * @param {string} upwd
 * 接口地址：http://wx.visionfin.cn:9500/CLOUD-WX/weixin/pwd
 * 请求方式：POST
 * 请求示例：{String,Object,Object}  pwdLogin(obj)
 */
export let submitLogin = async (model, title) => {
	uni.showLoading({
		mask:true,
		title,
	});
	console.log(model);
	let key = await GetKey(model.userName); // 后台获取加密的key
	let { userPwd } = model;
	console.log(key);
	// const key='3e783056-6905-4d'
	let AESres = AESencrypt(userPwd, key);
	console.log(AESres);
	model.userPwd = AESres;
	let url = BASE_URL + "/CLOUD-WX/weixin/pwd";
	let lang = uni.getStorageSync('lang')
	let res = await uni.request({
		url,
		method: "POST",
		data: model,
		header:{
			Language:lang
	},
	});
	console.log(res,'res');
	let { code, data, message } = res.data;
	uni.hideLoading();
	if (code === "00000000") {
		let Token = jwt.sign({ id: data.token }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
		uni.setStorageSync("vision_access_token", Token); //缓存token
		uni.setStorageSync("vision_user_id", data.userId); //缓存ID
		uni.switchTab({
			url: "/pages/foreignExchangeMarket/foreignExchangeMarket",
		});
	} else {
		uni.showToast({
			mask:true,
			icon: "none",
			title: message,
			duration: 2000,
		});
	}
	return res;
};
