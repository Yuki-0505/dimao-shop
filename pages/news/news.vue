<template>
	<view class="news">
		<news :list="newsList"></news>
	</view>
</template>

<script>
	import news_list from '@/components/news-list/news-list.vue'
	export default {
		components: {
			'news': news_list
		},
		data() {
			return {
				newsList: []
			}
		},
		onLoad() {
			this.getNews()
		},
		methods: {
			getNews() {
				this.$myRequest({
					url: '/api/public/v1/home/floordata'
				}).then(res => {
					res.data.message.forEach(item => {
						this.newsList.push(...item.product_list)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.news {
		
	}
</style>
