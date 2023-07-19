import http from '@/utils/http.js';

export function cateListAPI() {
	return http({
		url: '/api/public/v1/categories',
		method: 'get'
	})
}