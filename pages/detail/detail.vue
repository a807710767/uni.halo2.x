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
		<u-popup v-model="showShareImg" mode="center" closeable backgroundColor="transparent" close-icon-color="#fff"
			close-icon-size="40">
			<u-image :src="canvasToTempFilePath" width="552" height="720" border-radius="20"></u-image>
			<view class="image-tips mt10">
				可长按保存 / 分享给好友
			</view>
			<view class="x juc-bet ali-cen mt10">
				<u-button size="medium" plain type="success" @click="handleSaveImage">保存图片</u-button>
				<u-button size="medium" plain type="info" @click="showShareImg = false">关闭弹窗</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	import LoadingView from '@/components/Loading/Loading.vue'
	import RotatingMenu from '@/components/RotatingMenu/RotatingMenu.vue'
	import Poster from '@/components/Poster/Poster.vue'
	import richText from '@/lib/richText.js'
	export default {
		components: {
			LoadingView,
			RotatingMenu,
			Poster
		},
		data() {
			return {
				name: '',
				qrCodeUrl: '',
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
				},
				canvasToTempFilePath: '',
				showShareImg: false
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
			handleSaveImage() {
				uni.saveImageToPhotosAlbum({
					filePath: this.canvasToTempFilePath,
					success: function(res2) {
						uni.showToast({
							title: '保存成功',
							icon: "none",
							duration: 5000
						})
						this.showShareImg = false
					},
					fail: function(err) {
						console.log(err);
					}
				})
			},
			async handleMenuClick(item) {
				console.log(item)
				if (item.id === '1') {
					// 已经获取到图片就不需要再获取了
					if (this.canvasToTempFilePath) {
						this.showShareImg = true
						return
					}

					uni.showLoading({
						title: '加载中',
						mask: true
					})
					const qrcode = await api.getQrCode({
						path: `/pages/detail/detail?name=${this.name}`
					})
					this.qrCodeUrl = await this.base64ToTempFilePath(qrcode)
					console.log(this.qrCodeUrl)
					this.canvasToTempFilePath = await this.$refs.posterRef.drag({
						qrCodeUrl: this.qrCodeUrl || this.$halo.info.avatar,
						cover: this.data.spec.cover,
						title: this.data.spec.title,
						headImg: this.$halo.info.avatar,
						displayName: this.data.owner.displayName,
						categories: this.data.categories,
						tags: this.data.tags,
						mainColor: this.$halo.info.mainColor,
						subColor: this.$halo.info.subColor
					})
					console.log(this.canvasToTempFilePath);
					this.showShareImg = true
					uni.hideLoading()
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
				}).then(async res => {
					console.log(res)
					res.content.content = richText.format(res.content.content)
					this.data = res
				}).catch(err => {
					console.log(err)
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
			},
			base64ToTempFilePath(base64Data) {
				return new Promise((resolve, reject) => {
					const fs = uni.getFileSystemManager()
					const fileName = 'temp-image-' + Date.now() // 自定义文件名，可根据需要修改
					const filePath = uni.env.USER_DATA_PATH + '/' + fileName
					// const buffer = uni.base64ToArrayBuffer(base64Data)
					fs.writeFile({
						filePath,
						data: base64Data,
						encoding: 'base64',
						success() {
							resolve(filePath)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
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

		.image-tips {
			color: #fff;
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
		}
	}
</style>