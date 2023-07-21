<script setup>
	import {
		computed,
		ref
	} from "vue";

	defineProps({
		g: {
			type: Object,
			defaul: {},
		}
	})

	const defaultPic = ref(
		'@/static/logo.png'
	)

	// 计算属性替代过滤器
	const tofixed = computed(() => {
		return function(num) {
			return Number(num).toFixed(2)
		}
	})
</script>

<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<image :src="g.goods_small_logo || defaultPic.value" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{g.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{tofixed(g.goods_price)}}</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>