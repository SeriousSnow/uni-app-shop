<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		useSetBadge
	} from '@/composables/useSetBadge.js'
	import {
		useCartStore
	} from '@/store/cartStore.js'
	import {
		reactive,
		watch
	} from "vue";

	// 显示够无车角标
	const {
		setBadge
	} = useSetBadge()
	onShow(() => {
		setBadge()
	})

	const cart = useCartStore()
	const data = reactive({
		options: [{
			text: '删除', // 显示的文本内容
			style: {
				backgroundColor: '#C00000' // 按钮的背景颜色
			}
		}]
	})

	const radioChangeHandler = (e) => {
		cart.updateGoodsState(e)
	}

	// 商品的数量发生了变化
	const numberChangeHandler = (e) => {
		cart.updateGoodsCount(e)
		setBadge()
	}

	// 点击了滑动操作按钮
	const swipeActionClickHandler = (goods) => {
		cart.removeGoodsById(goods.goods_id)
		setBadge()
	}
</script>

<template>
	<view class="cart-container" v-if="cart.cart.length !== 0">
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表区域 -->
		<uni-swipe-action>
			<block v-for="(g, i) in cart.cart" :key="i">
				<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
				<uni-swipe-action-item :right-options="data.options" @click="swipeActionClickHandler(g)">
					<!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
					<my-goods :g="g" :show-radio="true" @radio-change="radioChangeHandler"
						@num-change="numberChangeHandler" :show-num="true"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算区域 -->
		<my-settle></my-settle>
	</view>

	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;

		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				margin-left: 10px;
			}
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>