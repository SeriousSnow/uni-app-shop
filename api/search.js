import http from '@/utils/http.js';

export function searchListAPI(kw) {
	return http({
		url: '/api/public/v1/goods/qsearch',
		method: 'get',
		data: {
			query: kw
		}
	})
}