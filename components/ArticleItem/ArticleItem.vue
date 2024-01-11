<template>
	<view class="article-item">
		<view class="">
			<u--image :src="data.cover" width="100%" height="300rpx"> </u--image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ArticleItem",
		props: {
			data: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.article-item {
		width: 100%;
		background-color: #f23;
		padding: 10rpx;
		margin-bottom: 10rpx;
	}
</style>