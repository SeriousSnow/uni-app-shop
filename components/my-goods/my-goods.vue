<script setup>
	import {
		computed,
		ref
	} from "vue";

	/* 
		g  商品的信息对象
		showRadio  是否展示图片左侧的 radio
		showNum  是否展示价格右侧的 NumberBox 组件
	 */
	const props = defineProps({
		g: {
			type: Object,
			default: {},
		},
		showRadio: {
			type: Boolean,
			default: false,
		},
		showNum: {
			type: Boolean,
			default: false,
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

	const emit = defineEmits(["radio-change", "num-change"])
	const radioClickHandler = () => {
		// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
		// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
		emit("radio-change", {
			// 商品的 Id
			goods_id: props.g.goods_id,
			// 商品最新的勾选状态
			goods_state: !props.g.goods_state
		})
	}

	// NumberBox 组件的 change 事件处理函数
	const numChangeHandler = (val) => {
		// 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
		emit('num-change', {
			// 商品的 Id
			goods_id: props.g.goods_id,
			// 商品的最新数量
			goods_count: +val
		})
	}
</script>

<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<!-- 存储在购物车中的商品，包含 goods_state 属性，表示商品的勾选状态 -->
			<radio :checked="g.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="g.goods_small_logo || defaultPic.value" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{g.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{tofixed(g.goods_price)}}</view>
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="g.goods_count" @change="numChangeHandler"
					v-if="showNum"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.goods-item {
		// 让 goods-item 项占满整个屏幕的宽度
		width: 750rpx;
		// 设置盒模型为 border-box
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

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
			flex: 1;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>