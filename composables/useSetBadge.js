import {
	ref
} from "vue"
import {
	useCartStore
} from "@/store/cartStore.js";

export const useSetBadge = () => {
	const cart = useCartStore()

	const setBadge = () => {
		// console.log(cart.total);
		// 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
		uni.setTabBarBadge({
			index: 2, // 索引
			text: cart.total + '' // 注意：text 的值必须是字符串，不能是数字
		})
	}

	return {
		setBadge
	}
}