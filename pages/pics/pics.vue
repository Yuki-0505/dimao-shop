<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view 
				:class="{active: active === index}" 
				@click="leftClickHandle(index)" 
				v-for="(item, index) in cates" 
				:key="item.cat_id"
			>
				{{item.cat_name}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view @click="previewImg(item.cat_icon)" class="item" v-for="item in secondData" :key="item.cat_id">
				<image :src="item.cat_icon" mode=""></image>
				<text>{{item.cat_name}}</text>
			</view>
			<text v-if="secondData.length">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [],
				active: 0,
				secondData: []
			}
		},
		onLoad() {
			this.getPicsCate()
		},
		methods: {
			getPicsCate() {
				this.$myRequest({
					url: '/api/public/v1/categories'
				}).then(res => {
					console.log(res)
					this.cates = res.data.message
					this.leftClickHandle(0)
				})
			},
			leftClickHandle(index) {
				this.active = index
				// this.secondData = this.cates[index].children
				this.secondData = []
				this.cates[index].children.forEach(item => {
					item.children && this.secondData.push(...item.children)
				})
			},
			previewImg(current) {
				const urls = this.secondData.map(item => item.cat_icon)
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		// background-color: #ccc;
		height: 100%;
		display: flex;
		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1rpx solid #eee;

			view {
				heigth: 60px;
				line-height: 60px;
				color: #333;
				font-size: 30rpx;
				text-align: center;
				border-top: 1rpx solid #eee;
			}
			
			.active {
				color: #fff;
				background-color: $shop-color;
			}
		}
		.right {
			height: 100%;
			width: 530rpx;
			margin: 10rpx auto;
			.item {
				text-align: center;
				font-size: 30rpx;
				line-height: 60rpx;
				image {
					width: 527rpx;
					height: 527rpx;
					border: 1rpx solid #ccc;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
