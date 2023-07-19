import {
	ref
} from 'vue'
import {
	defineStore
} from 'pinia'
import {
	swiperListAPI,
	navListAPI,
	floorListAPI
} from '@/api/home.js'

export const useHomeStore = defineStore('home', () => {
	// state 轮播图列表数据
	const swiperList = ref([])
	const navList = ref([])
	const floorList = ref([])

	// action 获取轮播图数据的方法
	const getSwiperList = async () => {
		const res = await swiperListAPI()
		swiperList.value = res.message;
	}

	const getNavList = async () => {
		const res = await navListAPI()
		navList.value = res.message;
	}

	const getFloorList = async () => {
		const res = await floorListAPI()
		res.message.forEach(floor => {
			floor.product_list.forEach(prod => {
				prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split(
					'?')[1]
			})
		})
		console.log(res.message);
		floorList.value = res.message;
	}

	return {
		swiperList,
		getSwiperList,
		navList,
		getNavList,
		floorList,
		getFloorList
	}
})