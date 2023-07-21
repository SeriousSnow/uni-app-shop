import http from '@/utils/http.js';

export function goodsListAPI(data) {
	return http({
		url: '/api/public/v1/goods/search',
		method: 'get',
		data
	})
}