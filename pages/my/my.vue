<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app'

	// 显示够无车角标
	import {
		useSetBadge
	} from '@/composables/useSetBadge.js'
	const {
		setBadge
	} = useSetBadge()
	onShow(() => {
		setBadge()
	})
</script>

<template>
	<view>
		My
	</view>
</template>

<style lang="scss">

</style>