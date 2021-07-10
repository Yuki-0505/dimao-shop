<template>
	<view class="goods-detail">
		<swiper indicator-dots autoplay circular interval="1500" duration="500">
			<swiper-item v-for="item in swipers" :key="item.pics_id" @click="previewImg(item.pics_big)">
				<image :src="item.pics_mid"></image>
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{info.goods_price}}</text>
				<text>￥{{Math.floor(info.goods_price * 1.2) + 2}}</text>
			</view>
			<view class="goods-name">{{info.goods_name}}</view>
		</view>
		<view class="box2">
			<view>货号：{{info.goods_id}}</view>
			<view>库存：{{info.goods_number}}</view>
		</view>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<view class="content">
				<rich-text :nodes="info.goods_introduce"></rich-text>
			</view>
		</view>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				id: 0,
				swipers: [],
				info: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
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
			}
		},
		onLoad(options) {
			this.id = options.id
			// this.getSwipers()
			this.getDetailInfo()
		},
		methods: {
			// 获取轮播图数据
			getSwipers() {
				this.swipers = this.info.pics
			},
			getDetailInfo() {
				this.$myRequest({
					url: '/api/public/v1/goods/detail?goods_id=' + this.id
				}).then(res => {
					this.info = res.data.message
					this.getSwipers()
				})
			},
			previewImg(current) {
				const urls = this.swipers.map(item => item.pics_big)
				uni.previewImage({
					current,
					urls
				})
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail {

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10rpx;
			border-bottom: 10rpx solid #eee;

			.price {
				line-height: 80rpx;
				font-size: 35rpx;
				color: $shop-color;

				text:nth-child(2) {
					margin-left: 20rpx;
					font-size: 28rpx;
					color: #ccc;
					text-decoration: line-through;
				}
			}

			.goods-name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.box2 {
			padding: 10rpx;
			border-bottom: 10rpx solid #eee;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.box3 {

			.tit {
				padding-left: 10rpx;
				font-size: 32rpx;
				line-height: 70rpx;
				border-bottom: 1rpx solid #eee;
			}

			.content {
				padding: 10rpx;
				font-size: 0rpx;
				color: #333;
			}
		}
		.goods-nav {
			position: fixed;
			bottom: 0;
			width: 750rpx;
		}
	}
</style>
