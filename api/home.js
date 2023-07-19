import http from '@/utils/http.js';

/**
 *    走马灯请求
 */
export function swiperListAPI() {
	return http({
		url: '/api/public/v1/home/swiperdata',
		method: 'get'
	})
}

/* 
	分类请求
 */
export function navListAPI() {
	return http({
		url: '/api/public/v1/home/catitems',
		method: 'get'
	})
}

/* 
	楼层请求
 */
export function floorListAPI() {
	return http({
		url: '/api/public/v1/home/floordata',
		method: 'get'
	})
}