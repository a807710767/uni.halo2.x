<template>
	<view class="detail-article">
		<view style="height: 20rpx;">

		</view>
		<view class="head y ali-cen" v-if="data && data.spec">
			<view class="title">
				{{ data.spec.title}}
			</view>
			<view class="">
				作者：{{data.owner.displayName}}
			</view>
			<view class="">
				时间 ：{{$u.timeFormat(data.spec.publishTime, 'yyyy-mm-dd hh:MM:ss')}}
			</view>
			<view class="x">
				<view class="">
					图片：{{data.spec.htmlMetas[0]['count-images']}}
				</view>
				<view class="ml10">
					字数：{{data.spec.htmlMetas[0]['count-words']}}
				</view>
			</view>
			<u-image :src="data.spec.cover" width="600rpx" height="400rpx" style="margin: 10 auto;"></u-image>
		</view>
		<view class="category-tag" v-if="data && data.spec">
			<view class="x category" style="flex-wrap: wrap;">
				<view class="mr10">
					分类：
				</view>
				<u-tag v-for="(item,index) in data.categories" :key="index" :text="item.spec.displayName" class="mr10">
				</u-tag>
			</view>
			<view class="tag x mt10">
				<view class="mr10">
					标签：
				</view>
				<u-tag v-for="(item,index) in data.tags" :key="index" :text="item.spec.displayName" class="mr10"
					type="warning">
				</u-tag>
			</view>
		</view>
		<view class="content" v-if="data && data.content">
			<u-parse :html="data.content.content" selectable show-with-animation :tag-style="style"></u-parse>
		</view>
		<view style="height: 50rpx;">

		</view>
		<LoadingView ref="LoadingView"></LoadingView>
		<RotatingMenu v-if="data && data.spec" :btnObj="btnObj" :bottom="300" @click="handleMenuClick"></RotatingMenu>
		<Poster ref="posterRef"></Poster>
		<u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	import LoadingView from '@/components/Loading/Loading.vue'
	import RotatingMenu from '@/components/RotatingMenu/RotatingMenu.vue'
	import Poster from '@/components/Poster/Poster.vue'
	export default {
		components: {
			LoadingView,
			RotatingMenu,
			Poster
		},
		data() {
			return {
				name: '',
				scrollTop: 0,
				data: {},
				iconStyle: {
					fontSize: '32rpx',
					color: '#fff'
				},
				customStyle: {
					backgroundColor: "#2979ff"
				},
				style: {
					'.language-html': 'color: red;font-size:32rpx'
				},
				btnObj: {
					id: '1',
					childs: [{
						id: '1',
						name: '海报'
					}, {
						id: '2',
						name: '链接'
					}]
				}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
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
				return
			}
		},
		mounted() {
			if (this.name) {
				this.getDetail()
			}
		},
		onPullDownRefresh() {
			uni.startPullDownRefresh();
			this.getDetail()
		},
		methods: {
			handleMenuClick(item) {
				console.log(item)
				if (item.id === '1') {

				} else if (item.id === '2') {
					uni.setClipboardData({
						data: this.$halo.info.domain + this.data.status.permalink,
						success: function() {
							uni.showToast({
								title: `复制成功`,
								icon: 'none'
							})
						}
					})
				}
			},
			getDetail() {
				console.log(this.$refs, this.$refs.LoadingView)
				this.$refs.LoadingView.open()
				api.details({
					name: this.name
				}).then(res => {
					console.log(res)
					this.data = res
					this.$refs.posterRef.drag()
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

		.language-html {
			color: red;
			font-size: 32rpx
		}
	}
</style>