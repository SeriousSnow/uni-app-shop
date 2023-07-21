import {
	ref
} from 'vue'
import {
	defineStore
} from 'pinia'
import {
	goodsListAPI
} from '../api/goods.js'

export const useGoodsStore = defineStore('goods', () => {
	const goodsList = ref([])
	const total = ref(0)
	const isloading = ref(false)

	const getGoodsList = async (data, cb) => {
		isloading.value = true
		const res = await goodsListAPI(data)
		goodsList.value = [...goodsList.value, ...res.message.goods]
		total.value = res.message.total
		isloading.value = false
		// 只要数据请求完毕，就立即按需调用 cb 回调函数
		cb && cb()
	}

	const updateIsLoading = (i) => {
		isloading.value = i
	}

	const updateTotal = (i) => {
		total.value = i
	}
	const clearGoodsList = () => {
		goodsList.value = []
	}

	return {
		goodsList,
		total,
		getGoodsList,
		isloading,
		updateIsLoading,
		updateTotal,
		clearGoodsList
	}
})