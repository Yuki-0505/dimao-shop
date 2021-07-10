<template>
	<view class="home">
		<swiper :indicator-dots="true" :autoplay="true" :interval="1500" :duration="500" circular>
			<swiper-item v-for="item in swipers" :key="item.goods_id">
				<!-- <a :href="item.navigator_url"> -->
				<image :src="item.image_src" mode=""></image>
				<!-- </a> -->
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav-item" v-for="(item, index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot-goods">
			<view class="tit">推荐商品</view>
			<goods-list :goods="goods" @goodsItemClick="goGoodsDetail"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		components: {
			'goods-list': goodsList
		},
		data() {
			return {
				swipers: [],
				goods: [],
				navs: [{
						icon: 'iconfont icon-ziyuan',
						title: '帝猫超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						title: '关于我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-tupian',
						title: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-shipin',
						title: '学习视频',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		methods: {
			// 获取轮播图数据
			getSwipers() {
				this.$myRequest({
					url: '/api/public/v1/home/swiperdata',
					method: 'GET'
				}).then((res) => {
					this.swipers = res.data.message
				})
			},
			// 获取热门商品列表数据
			getHotGoods() {
				this.$myRequest({
					url: '/api/public/v1/goods/search',
					method: 'GET'
				}).then(res => {
					this.goods = res.data.message.goods.filter(item => item.goods_small_logo && item.goods_price)
				})
			},
			// 跳转
			navItemClick(url) {
				uni.navigateTo({
					url
				})
			},
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.nav {
			display: flex;
			justify-content: space-between;
			width: 750rpx;

			.nav-item {
				flex: 1;
				text-align: center;

				view {
					margin: 10rpx auto;
					width: 120rpx;
					height: 120rpx;
					line-height: 120rpx;
					color: #fff;
					background: $shop-color;
					font-size: 50rpx;
					border-radius: 50%;
				}

				text {
					font-size: 30rpx;
				}
			}
		}

		.hot-goods {
			background-color: #eee;
			overflow: hidden;

			.tit {
				margin: 7rpx 0;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				letter-spacing: 20rpx;
				color: $shop-color;
				background: #fff;
			}
		}
	}
</style>
