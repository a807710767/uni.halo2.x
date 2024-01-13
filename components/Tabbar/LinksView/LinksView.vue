<template>
	<view class="links-view">
		<u-navbar title="友链" placeholder :is-back="false" :background="{background:$halo.info.mianColor}"
			:title-color="$halo.info.mianTextColor">
		</u-navbar>
		<scroll-view class="body" :style="'height: calc(100% - 44px - '+ $u.sys().statusBarHeight+'px);'" scroll-y
			:refresher-triggered="triggered" @refresherrefresh="handleRefresh" refresher-enabled
			:refresher-threshold="50" v-if="index === 'links'">
			<view class="x juc-bet links-list" v-for="(itemList,indexList) in list" :key="indexList">
				<view class="y m10 p10 ali-cen links-item" v-for="(item,index) in itemList" :key="index" style="">
					<u-image :src="item.logo || $halo.info.logo" width="120rpx" height="120rpx" style="flex-shrink: 0;"
						shape="circle">
					</u-image>
					<view class="y juc-bet" style="flex: 1;width: 100%;">
						<view class="mt10 u-line-2" style="text-align: center;">
							{{item.displayName}}
						</view>
						<view class="x juc-bet p10" style="width: 100%;">
							<view class="link-btn" @click="handleCopy(item)">复制</view>
							<view class="link-btn" @click="handleWebView(item)">打开</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import LoadingView from '@/components/Loading/Loading.vue'
	import api from '@/api/index.js'
	export default {
		name: "LinksView",
		props: {
			index: {
				type: String
			}
		},
		data() {
			return {
				triggered: true,
				list: {},
			};
		},
		components: {
			LoadingView
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				await this.getLinks()
				this.triggered = false
			},
			handleWebView(item) {
				uni.navigateTo({
					url: '/pages/webView/webView?url=' + item.url
				})
			},
			handleCopy(item) {
				uni.setClipboardData({
					data: item.url,
					success: function() {
						uni.showToast({
							title: '复制成功'
						})
					}
				});
			},
			handleShow() {
				uni.setNavigationBarTitle({
					title: '友链'
				})
				console.log('onshow');
			},
			handleRefresh() {
				this.page = 1
				this.triggered = true
				this.init()
			},
			getLinks() {
				api.links().then(res => {
					console.log('links', res);
					this.list = {}
					const map = {}
					const list = res.items.map(item => {
						const newItem = {
							...item.metadata,
							...item.spec
						}
						if (map[newItem.groupName]) {
							map[newItem.groupName].push(newItem)
						} else {
							map[newItem.groupName] = [newItem]
						}
					})
					this.list = map
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.links-view {
		height: 100%;
		width: 100%;

		.body {
			width: 100%;
			overflow-y: auto;
			box-sizing: border-box;

			.links-list {
				flex-wrap: wrap;
				padding: 0rpx 40rpx 20rpx;
			}

			.links-item {
				&:last-child {
					margin-right: auto;
				}

				height: 280rpx;
				flex-shrink: 0;
				width: 200rpx;
				border: 1px solid #ddd;
				font-size: 26rpx;
				font-weight: bold;
				border-radius: 8px;
			}

			.link-btn {
				cursor: pointer;
				font-size: 26rpx;
				color: #2979FF;
				border-bottom: 1px solid #2979FF;
			}

		}
	}
</style>