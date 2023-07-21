<script setup>
	import {
		reactive,
		ref
	} from "vue";
	import {
		onLoad,
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import {
		useGoodsStore
	} from '@/store/goodsStore.js'


	const queryObj = reactive({
		// 查询关键词
		query: '',
		// 商品分类Id
		cid: '',
		// 页码值
		pagenum: 1,
		// 每页显示多少条数据
		pagesize: 10
	})
	const goods = useGoodsStore()


	onLoad((options) => {
		// 将页面参数转存到 this.queryObj 对象中
		queryObj.query = options.query || ''
		queryObj.cid = options.cid || ''

		goods.getGoodsList(queryObj)
	})

	onReachBottom(() => {
		if (queryObj.pagenum * queryObj.pagesize >= goods.total) return uni.showToast({
			title: '数据加载完毕!',
			duration: 1000
		})
		if (goods.isloading) return
		// 让页码值自增 +1
		queryObj.pagenum += 1
		// 重新获取列表数据
		goods.getGoodsList(queryObj)
	})

	// 下拉刷新的事件
	onPullDownRefresh(() => {
		// 1. 重置关键数据
		queryObj.pagenum = 1
		goods.updateIsLoading(false)
		goods.updateTotal(0)
		goods.clearGoodsList()

		// 2. 重新发起请求
		goods.getGoodsList(queryObj, () => uni.stopPullDownRefresh())
	})
	
	function gotoDetail(item) {
	  uni.navigateTo({
	    url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
	  })
	}
</script>

<template>
	<view>
		<view class="goods-list">
			<view v-for="(g, i) in goods.goodsList" :key="i" @click="gotoDetail(g)">
				<my-goods :g="g"></my-goods>
			</view>
		</view>
	</view>
</template>


<style scoped lang="scss">

</style>