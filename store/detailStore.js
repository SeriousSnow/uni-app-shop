import {
	defineStore
} from 'pinia'
import {
	reactive,
	ref
} from "vue"
import {
	detailGoodsAPI
} from '@/api/detail.js'

export const useDetailStore = defineStore('detail', () => {
	const data = reactive({
		goods_info: {}
	})

	const getGoodsDetail = async (goods_id) => {
		const res = await detailGoodsAPI(goods_id)
		// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
		res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
			'<img style="display:block;" ').replace(/.webp/g, '.jpg')
		data.goods_info = res.message
	}

	return {
		data,
		getGoodsDetail
	}
})