<template>
	<view class="search-list">
		<u-navbar placeholder :border-bottom="false" :background="{background:$halo.info.mainColor}"
			:title-color="$halo.info.mainTextColor" :back-icon-color="$halo.info.mainTextColor">
			<view>
				<u-search v-model="keyword" maxlength="15" :show-action="false" disabled
					@click="handleSearch"></u-search>
			</view>
		</u-navbar>
		<block v-if="list && list.length">
			<view class="y item" v-for="(item,index) in list" :key="index" @click="handleGo(item)">
				<u-parse :html="item.title" :tag-style="style"></u-parse>
				<u-parse :html="item.content" :tag-style="style"></u-parse>
			</view>
		</block>
		<u-empty v-else mode="data" src="https://cdnpan.qiwo75.com/halo/nodata.png" iconSize="200" textSize="30rpx">
		</u-empty>
		<LoadingView ref="LoadingView"></LoadingView>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	import LoadingView from '@/components/Loading/Loading.vue'
	export default {
		data() {
			return {
				keyword: '',
				list: [],
				style: {
					b: 'color:#f00'
				}
			}
		},
		components: {
			LoadingView
		},
		methods: {
			handleGo(item) {
				uni.navigateTo({
					url: '/pages/detail/detail?name=' + item.name
				})
			},
			handleSearch() {
				uni.navigateBack()
			},
			getList() {
				this.$refs.LoadingView.open()
				api.search({
					keyword: this.keyword
				}).then(res => {
					console.log(res)
					this.list = res.hits
				}).finally(() => {
					this.$refs.LoadingView.close()
					uni.stopPullDownRefresh()
				})
			}
		},
		onPullDownRefresh() {
			uni.startPullDownRefresh();
			this.getList()
		},
		onLoad(op) {
			this.keyword = op.keyword
			if (!this.keyword) {
				uni.showModal({
					content: '参数异常',
					showCancel: false,
					success() {
						uni.navigateBack()
					}
				})
				return
			}
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.search-list {
		width: 100%;

		.item {
			margin: 20rpx;
			padding: 20rpx;
			border: 1px solid #ddd;
			border-radius: 4px;
			box-shadow: 6rpx 6rpx 16rpx rgba(0, 0, 0, 0.2),
				-6rpx -6rpx 16rpx rgba(255, 255, 255, 0.8),
				inset 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.2),
				inset 0rpx 0rpx 0rpx rgba(255, 255, 255, 0.8);

			.title {
				font-size: 40rpx;
			}

			.content {
				font-size: 30rpx !important;

				b {
					color: #fff;
				}
			}
		}
	}
</style>