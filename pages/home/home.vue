<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useHomeStore
	} from '@/store/homeStore.js'

	const home = useHomeStore();

	onLoad(() => {
		home.getSwiperList()
		home.getNavList()
		home.getFloorList()
	})

	function navClickHandler(item) {
		if (item.name === '分类') {
			uni.switchTab({
				url: '/pages/cate/cate'
			})
		}
	}
</script>

<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item, index) in home.swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in home.navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in home.floorList" :key="index">
				<!-- 标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层内容图片 -->
				<view class="floor-box">
					<navigator class="left-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<view class="right-box">
						<template v-for="(item2, i2) in item.product_list" :key="i2">
							<navigator v-if="i2 !== 0" :url="item2.url">
								<image :src="item2.image_src" mode="widthFix"
									:style="{width: item2.image_width + 'rpx'}"></image>
							</navigator>
						</template>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;

		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-box {
		height: 400rpx;
		display: flex;

		.left-box {
			margin-left: 10rpx;
		}

		.right-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			image {
				height: 180rpx;
			}
		}
	}
</style>