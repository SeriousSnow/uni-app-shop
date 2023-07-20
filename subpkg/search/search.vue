<script setup>
	import {
		ref
	} from "vue";
	import {
		searchListAPI
	} from "../../api/search.js"
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const timer = ref(null)
	const kw = ref('')
	const searchResults = ref([])
	const historyList = ref([])


	onLoad(() => {
		historyList.value = JSON.parse(uni.getStorageSync('kw') || '[]')
	})


	const input = (e) => {
		clearTimeout(timer.value)
		timer.value = setTimeout(() => {
			// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
			kw.value = e
			getSearchList(kw.value)
		}, 1000)
	}

	const getSearchList = async (kw) => {
		if (kw === '') {
			searchResults.value = []
			return
		}
		const res = await searchListAPI(kw)
		console.log(res.message);
		searchResults.value = res.message

		saveSearchHistory()
	}

	function gotoDetail(goods_id) {
		uni.navigateTo({
			// 指定详情页面的 URL 地址，并传递 goods_id 参数
			url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
		})
	}

	function saveSearchHistory() {
		historyList.value.unshift(kw.value)
		// 数组去重（利用set）
		historyList.value = [...new Set(historyList.value)]
		// 存储到本地
		uni.setStorageSync('kw', JSON.stringify(historyList.value))
	}

	function cleanHistory() {
		// 清空 data 中保存的搜索历史
		historyList.value = []
		// 清空本地存储中记录的搜索历史
		uni.setStorageSync('kw', '[]')
	}
	
	function gotoGoodsList(kw) {
		uni.navigateTo({
			url: '/subpkg/goods_list/goods_list?query=' + kw
		})
	}
</script>


<template>
	<view class="search-box" style="background-color: #c00000;">
		<!-- 使用 uni-ui 提供的搜索组件 -->
		<uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
	</view>
	<!-- 搜索建议列表 -->
	<view class="sugg-list" v-if="searchResults.length !== 0">
		<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
			<view class="goods-name">{{item.goods_name}}</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
	<!-- 搜索历史 -->
	<view class="history-box" v-else>
		<!-- 标题区域 -->
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
		</view>
		<!-- 列表区域 -->
		<view class="history-list">
			<uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			uni-tag {
				margin-top: 5px;
				margin-right: 10px;
			}
		}
	}
</style>