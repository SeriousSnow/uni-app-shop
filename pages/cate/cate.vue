<script setup>
	import {
		ref
	} from "vue"
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useCateStore
	} from '@/store/cateStore.js'

	const cate = useCateStore()
	const wh = ref(0)
	const active = ref(0)
	const scrollTop = ref(0)

	onLoad(() => {
		// 获取当前系统的信息
		const sysInfo = uni.getSystemInfoSync()
		// 为 wh 窗口可用高度动态赋值
		wh.value = sysInfo.windowHeight - 50

		cate.getCateList()
	})

	const activeChanged = (index) => {
		active.value = index
		scrollTop.value = scrollTop.value === 0 ? 1 : 0
	}

	const gotoGoodsList = (item3) => {
		uni.navigateTo({
			url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
		})
	}

	function gotoSearch() {
		uni.navigateTo({
			url: '/subpkg/search/search'
		})
	}
</script>


<template>
	<my-search @click="gotoSearch"></my-search>
	<view class="scroll-view-container">
		<!-- 左侧的滚动视图区域 -->
		<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
			<block v-for="(item, index) in cate.cateList" :key="index">
				<view :class="['left-scroll-view-item', index === active ? 'active' : '']"
					@click="activeChanged(index)">{{item.cat_name}}</view>
			</block>
		</scroll-view>
		<!-- 右侧的滚动视图区域 -->
		<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
			<!-- 二级区域 -->
			<view class="cate-lv2" v-for="(item2, index2) in cate.cateLevel2[active]" :key="index2">
				<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
				<!-- 三级区域 -->
				<view class="cate-lv3-list">
					<view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="index3"
						@click="gotoGoodsList(item3)">
						<!-- 图片 -->
						<image :src="item3.cat_icon"></image>
						<!-- 文本 -->
						<text>{{item3.cat_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<style scoped lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 240rpx;

			.left-scroll-view-item {
				line-height: 120rpx;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 24rpx;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: '';
						display: '';
						width: 6rpx;
						height: 60rpx;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.right-scroll-view {
			background-color: #ffffff;

			.cate-lv2-title {
				font-size: 28rpx;
				font-weight: bold;
				text-align: center;
				padding: 30rpx 0;
			}

			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					width: 33.33%;
					margin-bottom: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

				}

				image {
					width: 120rpx;
					height: 120rpx;
				}

				text {
					font-size: 24rpx;
				}
			}
		}
	}
</style>