import http from '@/utils/http.js';

export function detailGoodsAPI(goods_id) {
	return http({
		url: '/api/public/v1/goods/detail',
		method: 'get',
		data: {
			goods_id
		}
	})
}