import axios from "axios";
import {
	UniAdapter
} from "uniapp-axios-adapter";

const request = axios.create({
	baseURL: "https://api-hmugo-web.itheima.net",
	timeout: 5000,
	adapter: UniAdapter,
});

request.interceptors.request.use((config) => {
	uni.showLoading({
		title: '数据加载中...',
	})
	return config;
});

request.interceptors.response.use((response) => {
	// 统一处理响应,返回Promise以便链式调用
	if (response.status === 200) {
		const {
			data
		} = response;
		if (data && data.meta.status === 200) {
			uni.hideLoading();
			return Promise.resolve(data);
		} else if (data.meta.status !== 200) {
			return uni.showToast({
				title: '数据请求失败！',
				duration: 1500,
				icon: 'none',
			})
		}
	} else {
		return Promise.reject(response);
	}
});

export default request;