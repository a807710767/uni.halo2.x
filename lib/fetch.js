import Vue from 'vue'
import axios from 'axios'
import config from '@/config/index.js'
console.log(config);
let baseURL = config.$halo.info.domain

const instance = axios.create({
	baseURL,
	timeout: 60000
})
// 请求拦截
instance.interceptors.request.use(
	config => {
		if (!config.params) {
			config.params = {};
		}
		if (config.method === 'get') {
			config.params.timestamp = new Date().getTime();
		}
		const token = uni.getStorageSync('userToken')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config
	},
	error => {
		return Promise.reject(error);
	}
);

// 响应拦截
instance.interceptors.response.use(res => {
	if (res.status == 200) {
		// 业务状态
		return res.data;
	} else {
		return Promise.reject(res.data);
	}
}, err => {
	uni.showToast({
		title: '请求错误，请联系管理员 。  ' + err,
		icon: "none",
		duration: 2000
	});
	switch (err.response.status) {
		case 400:
			console.log("错误请求");
			break;
		case 401:

			break;
		case 403:
			console.log("拒绝访问");
			break;
		case 404:
			console.log("请求错误，未找到该资源");
			break;
		case 405:
			console.log("请求方法未允许");
			break;
		case 408:
			console.log("请求超时");
			break;
		case 500:
			console.log("服务器端出错");
			break;
		case 501:
			console.log("网络未实现");
			break;
		case 502:
			console.log("网络错误");
			break;
		case 503:
			console.log("服务不可用");
			break;
		case 504:
			console.log("网络超时");
			break;
		case 505:
			console.log("http版本不支持该请求");
			break;
		default:
			console.log(err.message);
			break;
	}
	return Promise.reject(err);
});

// 自定义适配器 ， 适配uniapp语法
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		let settle = require('axios/lib/core/settle');
		let buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			},
		});
	})
}

export default instance