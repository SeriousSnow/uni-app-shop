<script setup>
	const emit = defineEmits(['click'])

	defineProps({
		bgcolor: {
			type: String,
			default: '#C00000'
		},
		radius: {
			type: Number,
			// 单位是 px
			default: 30
		}
	})
	// 点击了模拟的 input 输入框
	function searchBoxHandler() {
		// 触发外界通过 @click 绑定的 click 事件处理函数
		emit('click')
	}
</script>


<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{'border-radius': radius + 'rpx'}" @click="searchBoxHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.my-search-container {
		// background-color: #c00000;
		height: 50px;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 72rpx;
		background-color: #ffffff;
		// border-radius: 30rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 30rpx;
			margin-left: 10rpx;
		}
	}
</style>