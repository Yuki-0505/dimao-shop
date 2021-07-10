<template>
	<view class="goods-list">
		<view class="goods-item" v-for="item in goods" :key="item.goods_id" @click="navigator(item.goods_id)">
			<image :src="item.goods_small_logo" mode=""></image>
			<view class="price">
				<text>￥{{item.goods_price}}</text>
				<text>￥{{Math.floor(item.goods_price * 1.2) + 2}}</text>
			</view>
			<view class="name">
				{{item.goods_name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods'],
		methods: {
			navigator(id) {
				this.$emit('goodsItemClick', id)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		margin: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods-item {
			box-sizing: border-box;
			margin: 10rpx 0;
			padding: 15rpx;
			width: 355rpx;
			background-color: #fff;

			image {
				width: 80%;
				height: 284rpx;
				display: block;
				margin: 0 auto;
			}

			.price {
				margin: 20rpx 0 5rpx 0;
				color: $shop-color;
				font-size: 36rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}

			.name {
				font-size: 28rpx;
				padding: 15rpx 0 10rpx 0;
			}
		}
	}
</style>
