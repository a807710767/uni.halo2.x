<template>
	<view class="disclaimers">
		<view class="title">
			{{title}}
		</view>
		<view class="item" v-for="(item, index) in $halo.disclaimers" :key="index">
			{{index+1}}. {{item}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "Disclaimers",
		data() {
			return {
				title: '《博客免责声明》'
			};
		}
	}
</script>

<style lang="scss">
	.disclaimers {
		padding: 10rpx;

		.title {
			text-align: center;
			font-weight: bold;
			font-size: 40rpx;
		}
		.item{
			margin-top: 20rpx;
		}
	}
</style>