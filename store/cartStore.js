import {
	computed,
	ref
} from 'vue'
import {
	defineStore
} from 'pinia'

export const useCartStore = defineStore('cart', () => {
	const cart = ref(JSON.parse(uni.getStorageSync('cart') || '[]'))

	const addToCart = (goods) => {
		// 根据提交的商品的Id，查询购物车中是否存在这件商品
		// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
		const findResult = cart.value.find((x) => x.goods_id === goods.goods_id)

		if (!findResult) {
			// 如果购物车中没有这件商品，则直接 push
			cart.value.push(goods)
		} else {
			// 如果购物车中有这件商品，则只更新数量即可
			findResult.goods_count++
		}
		saveToStorage()
	}

	const saveToStorage = () => {
		uni.setStorageSync('cart', JSON.stringify(cart.value))
	}

	// 更新购物车中商品的勾选状态
	const updateGoodsState = (goods) => {
		// 根据 goods_id 查询购物车中对应商品的信息对象
		const findResult = cart.value.find(x => x.goods_id === goods.goods_id)
		// 有对应的商品信息对象
		if (findResult) {
			// 更新对应商品的勾选状态
			findResult.goods_state = goods.goods_state
			// 持久化存储到本地
			saveToStorage()
		}
	}

	// 更新购物车中商品的数量
	const updateGoodsCount = (goods) => {
		// 根据 goods_id 查询购物车中对应商品的信息对象
		const findResult = cart.value.find(x => x.goods_id === goods.goods_id)

		if (findResult) {
			// 更新对应商品的数量
			findResult.goods_count = goods.goods_count
			// 持久化存储到本地
			saveToStorage()
		}
	}

	// 根据 Id 从购物车中删除对应的商品信息
	const removeGoodsById = (goods_id) => {
		// 调用数组的 filter 方法进行过滤
		cart.value = cart.value.filter(x => x.goods_id !== goods_id)
		// 持久化存储到本地
		saveToStorage()
	}

	// 更新所有商品的勾选状态
	const updateAllGoodsState = (newState) => {
		// 循环更新购物车中每件商品的勾选状态
		cart.value.forEach(x => x.goods_state = newState)
		// 持久化存储到本地
		saveToStorage()
	}

	// 统计购物车中商品的总数量
	const total = computed(() => {
		let c = 0
		// 循环统计商品的数量，累加到变量 c 中
		cart.value.forEach(goods => c += goods.goods_count)
		return c
	})

	const checkedCount = computed(() => {
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品
		// 再使用 reduce 方法，将已勾选的商品总数量进行累加
		// reduce() 的返回值就是已勾选的商品的总数量
		return cart.value.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count,
			0)
	})

	// 已勾选的商品的总价
	const checkedGoodsAmount = computed(() => {
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品
		// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
		// reduce() 的返回值就是已勾选的商品的总价
		// 最后调用 toFixed(2) 方法，保留两位小数
		return cart.value.filter(x => x.goods_state)
			.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
			.toFixed(2)
	})

	return {
		cart,
		addToCart,
		total,
		saveToStorage,
		updateGoodsState,
		updateGoodsCount,
		removeGoodsById,
		checkedCount,
		updateAllGoodsState,
		checkedGoodsAmount
	}
})