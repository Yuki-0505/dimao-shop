<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" mode=""></image>
		<view class="info">
			<view @click="callPhone">联系电话: (0744)8202871 ( 点击拨打 )</view>
			<view>地址: 湖南省张家界市永定区子午路三角坪附近</view>
		</view>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers" :scale="scale"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 110.46972,
				latitude: 29.144074,
				scale: 12,
				markers: [
					{
						longitude: 110.46972,
						latitude: 29.144074,
						iconPath: '../../static/school.png',
						width: 30,
						height: 30
					}
				]
			}
		},
		methods: {
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: '(0744)8202871'
				})
			}
		}
	}
</script>

<style lang="scss">
.contact {
	.img {
		width: 750rpx;
		height: 320rpx;
	}
	.info {
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view {
			line-height: 80rpx;
			border-bottom: 1rpx solid #eee;
		}
	}
	map {
		width: 750rpx;
		height: 750rpx;
	}
}
</style>
