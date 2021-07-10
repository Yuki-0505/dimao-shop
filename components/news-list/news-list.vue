<template>
	<view>
		<view class="news-list" v-for="item in list">
			<image :src="item.image_src"></image>
			<view class="right">
				<view class="tit">{{item.name}}</view>
				<view class="info">
					<text>发布时间：2021-7-7</text>
					<text>浏览：50</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list']
	}
</script>

<style lang="scss">
	.news-list {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1rpx solid $shop-color;
		image {
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		}
		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 15rpx;
			.tit {
				font-size: 30rpx;
			}
			.info {
				font-size: 24rpx;
				color: #ccc;
				text:nth-child(2) {
					margin-left: 40rpx;
				}
			}
		}
	}
</style>
