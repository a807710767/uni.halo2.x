<template>
	<view class="detail-article">
		<view style="height: 20rpx;">

		</view>
		<view class="head y ali-cen">
			<view class="title">
				{{ data.spec.title}}
			</view>
			<view class="">
				作者：{{data.owner.displayName}}
			</view>
			<view class="" v-if="data.spec">
				时间 ：{{$u.timeFormat(data.spec.publishTime, 'yyyy-mm-dd hh:MM:ss')}}
			</view>
			<u-image :src="data.spec.cover" width="600rpx" height="400rpx" style="margin: 10 auto;"></u-image>
		</view>
		<view class="category-tag">
			<view class="x category" style="flex-wrap: wrap;">
				<view class="mr10">
					分类：
				</view>
				<u-tag v-for="item in data.categories" :key="item" :text="item.spec.displayName" class="mr10">
				</u-tag>
			</view>
			<view class="tag x mt10">
				<view class="mr10">
					标签：
				</view>
				<u-tag v-for="item in data.tags" :key="item" :text="item.spec.displayName" class="mr10" type="warning">
				</u-tag>
			</view>
		</view>
		<view class="content">
			<u-parse :html="data.content.content" selectable show-with-animation></u-parse>
		</view>
		<view style="height: 50rpx;">

		</view>
		<LoadingView ref="LoadingView"></LoadingView>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	import LoadingView from '@/components/Loading/Loading.vue'
	export default {
		components: {
			LoadingView,
		},
		data() {
			return {
				name: '',
				data: {}
			}
		},
		onLoad(op) {
			this.name = op.name
			if (!this.name) {
				uni.showModal({
					title: '异常',
					content: '获取标识异常',
					showCancel: false,
					success() {
						uni.navigateBack()
					}
				})
			}
			this.getDetail()
		},
		onPullDownRefresh() {
			uni.startPullDownRefresh();
			this.getDetail()
		},
		methods: {
			getDetail() {
				this.$refs.LoadingView.open()
				api.details({
					name: this.name
				}).then(res => {
					console.log(res)
					this.data = res
				}).catch(err => {
					console.log(res)
					uni.showModal({
						title: '错误',
						content: '获取文章数据异常',
						showCancel: false,
						success() {
							uni.navigateBack()
						}
					})
				}).finally(() => {
					this.$refs.LoadingView.close()
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-article {
		background-color: #eee;
		box-sizing: border-box;

		.head {
			margin: 0rpx 20rpx 20rpx;
			background-color: #fff;
			border-radius: 5px;
			text-align: center;

			.title {
				font-weight: bold;
				font-size: 36rpx;
			}
		}

		.category-tag {
			padding: 20rpx;
			border-radius: 5px;
			margin: 0rpx 20rpx 20rpx;
			background-color: #fff;
			font-size: 28rpx;
			font-weight: bold;
		}

		.content {
			margin: 0rpx 20rpx 20rpx;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 5px;
		}
	}
</style>