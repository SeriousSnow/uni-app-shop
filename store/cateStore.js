import {
	defineStore
} from 'pinia'
import {
	ref
} from "vue"
import {
	cateListAPI
} from '@/api/cate.js'

export const useCateStore = defineStore('cate', () => {
	const cateList = ref([])
	const cateLevel2 = ref([])

	const getCateList = async () => {
		const res = await cateListAPI()
		console.log(res.message);
		cateList.value = res.message
		cateLevel2.value = res.message.map(item => item.children)
		console.log(cateLevel2.value);
	}

	return {
		cateList,
		getCateList,
		cateLevel2
	}
})