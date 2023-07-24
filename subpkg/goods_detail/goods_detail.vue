<script setup>
	import {
		useDetailStore
	} from '@/store/detailStore.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		computed,
		reactive,
		watch
	} from "vue";
	import {
		useCartStore
	} from '@/store/cartStore.js'

	const detail = useDetailStore()
	const cart = useCartStore()
	const data = reactive({
		// 左侧按钮组的配置对象
		options: [{
			icon: 'shop',
			text: '店铺'
		}, {
			icon: 'cart',
			text: '购物车',
			info: cart.total
		}],
		// 右侧按钮组的配置对象
		buttonGroup: [{
				text: '加入购物车',
				backgroundColor: '#ff0000',
				color: '#fff'
			},
			{
				text: '立即购买',
				backgroundColor: '#ffa200',
				color: '#fff'
			}
		]
	})


	onLoad((options) => {
		detail.getGoodsDetail(options.goods_id)
	})

	const preview = (i) => {
		// 调用 uni.previewImage() 方法预览图片
		uni.previewImage({
			// 预览时，默认显示图片的索引
			current: i,
			// 所有图片 url 地址的数组
			urls: detail.data.goods_info.pics.map(x => x.pics_big)
		})
	}

	const onClick = (e) => {
		if (e.content.text === '购物车') {
			// 切换到购物车页面
			uni.switchTab({
				url: '/pages/cart/cart'
			})
		}
	}

	// 右侧按钮的点击事件处理函数
	const buttonClick = (e) => {
		// 1. 判断是否点击了 加入购物车 按钮
		if (e.content.text === '加入购物车') {

			// 2. 组织一个商品的信息对象
			const goods = {
				goods_id: detail.data.goods_info.goods_id, // 商品的Id
				goods_name: detail.data.goods_info.goods_name, // 商品的名称
				goods_price: detail.data.goods_info.goods_price, // 商品的价格
				goods_count: 1, // 商品的数量
				goods_small_logo: detail.data.goods_info.goods_small_logo, // 商品的图片
				goods_state: true // 商品的勾选状态
			}
			// 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
			cart.addToCart(goods)
		}
	}

	const total = computed(() => {
		return cart.total
	})

	watch(total,(newVal, oldVal) => {
		const findResult = data.options.find((x) => x.text === '购物车')
		if (findResult) {
			findResult.info = newVal
		}
	})
</script>

<template>
	<!-- 轮播图区域 -->
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<swiper-item v-for="(item, i) in detail.data.goods_info.pics" :key="i">
			<image :src="item.pics_big" @click="preview(i)"></image>
		</swiper-item>
	</swiper>
	<!-- 商品信息区域 -->
	<view class="goods-info-box">
		<!-- 商品价格 -->
		<view class="price">￥{{detail.data.goods_info.goods_price}}</view>
		<!-- 信息主体区域 -->
		<view class="goods-info-body">
			<!-- 商品名称 -->
			<view class="goods-name">{{detail.data.goods_info.goods_name}}</view>
			<!-- 收藏 -->
			<view class="favi">
				<uni-icons type="star" size="18" color="gray"></uni-icons>
				<text>收藏</text>
			</view>
		</view>
		<!-- 运费 -->
		<view class="yf">快递：免运费</view>
	</view>
	<rich-text :nodes="detail.data.goods_info.goods_introduce"></rich-text>
	<!-- 商品导航组件 -->
	<view class="goods_nav">
		<!-- fill 控制右侧按钮的样式 -->
		<!-- options 左侧按钮的配置项 -->
		<!-- buttonGroup 右侧按钮的配置项 -->
		<!-- click 左侧按钮的点击事件处理函数 -->
		<!-- buttonClick 右侧按钮的点击事件处理函数 -->
		<uni-goods-nav :fill="true" :options="data.options" :buttonGroup="data.buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<style scoped lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	.goods-detail-container {
		// 给页面外层的容器，添加 50px 的内padding，
		// 防止页面内容被底部的商品导航组件遮盖
		padding-bottom: 50px;
	}

	.goods_nav {
		// 为商品导航组件添加固定定位
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>