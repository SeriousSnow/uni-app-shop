import {
	computed,
	reactive,
	ref
} from 'vue'
import {
	defineStore
} from 'pinia'

export const useUserStore = defineStore('user', () => {
	const data = reactive({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	})

	const updateAddress = (address) => {
		data.address = address

		saveAddressToStorage()
	}

	const saveAddressToStorage = () => {
		uni.setStorageSync('address', JSON.stringify(data.address))
	}

	const addstr = computed(() => {
		if (!data.address.provinceName) return ''
		// 拼接 省，市，区，详细地址 的字符串并返回给用户
		return data.address.provinceName + data.address.cityName + data.address.countyName + data.
		address.detailInfo
	})

	return {
		data,
		updateAddress,
		addstr
	}
})