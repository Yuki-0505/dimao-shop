<template>
	<view class="goods-list">
		<goods-list :goods="goods" @goodsItemClick="goGoodsDetail"></goods-list>
		<view class="isOver" v-if="flag">-----我是有底线的-----</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	import {
		debounce,
		throttle
	} from '../../util/net.js'
	export default {
		components: {
			'goods-list': goodsList
		},
		data() {
			return {
				pagenum: 1,
				goods: [],
				total: 0,
				flag: false
			}
		},
		onLoad() {
			this.getGoodsList()
			this.getMorePage = throttle(() => {
				this.pagenum++
				this.getGoodsList()
			}, 300)
			this.refresh = debounce(() => {
				console.log('refresh')
				this.pagenum = 1
				this.goods = []
				this.flag = false
				this.getGoodsList()
					.then(() => uni.stopPullDownRefresh())
			}, 300)
		},
		methods: {
			// 获取商品列表数据
			getGoodsList() {
				return new Promise((resolve, reject) => {
					this.$myRequest({
						url: '/api/public/v1/goods/search?pagenum=' + this.pagenum,
						method: 'GET'
					}).then(res => {
						const temp = res.data.message.goods
						this.total += temp.length;
						this.goods.push(...temp.filter(item => item.goods_small_logo && item.goods_price))
						if (res.data.message.total <= this.total) {
							this.flag = true
						}
						resolve()
					})
				})
			},
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}
		},
		onReachBottom() {
			if (this.flag) return
			this.getMorePage()
		},
		onPullDownRefresh() {
			console.log('pull down')
			this.refresh()
		}
	}
</script>

<style lang="scss">
	.goods-list {
		background-color: #eee;

		.isOver {
			width: 100%;
			height: 50rpx;
			line-height: 40rpx;
			color: #ccc;
			text-align: center;
			font-size: 32rpx;
		}
	}
</style>
