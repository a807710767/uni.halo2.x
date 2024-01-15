<template>
	<view class="moments-view">
		<u-navbar title="朋友圈" placeholder :is-back="false" :border-bottom="false"
			:background="{background:$halo.info.mainColor}" :title-color="$halo.info.mainTextColor">
		</u-navbar>
		<scroll-view class="body" :style="'height: calc(100% - 46px - '+ $u.sys().statusBarHeight+'px);'" scroll-y
			:refresher-triggered="triggered" @refresherrefresh="handleRefresh" refresher-enabled
			:refresher-threshold="50" v-if="index === 'moments'">
			<view class="moments-item" v-for="(item,index) in list" :key="index">
				<view class="content" v-html="item.content">
				</view>
				<album v-model="item.medium" keyName="url"></album>
				<!-- 		<u-album v-if="item.medium && item.medium.length" :urls="item.medium" keyName="url"
					:multipleSize="item.medium.length === 4?'300':'198'" space="10"
					:rowCount="item.medium.length === 4?'2':'3'"></u-album> -->
				<view class="time">
					——{{item.createTime}}
				</view>
			</view>
			<view style="height: 50rpx;">

			</view>
		</scroll-view>
	</view>

</template>

<script>
	import LoadingView from '@/components/Loading/Loading.vue'
	import Album from '@/components/Album/Album.vue'
	import api from '@/api/index.js'
	export default {
		name: "MomentsView",
		props: {
			index: {
				type: String
			}
		},
		data() {
			return {
				triggered: true,
				size: 20,
				page: 1,
				total: 0,
				list: [],
			};
		},
		components: {
			LoadingView,
			Album
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				await this.getData()
				this.triggered = false
			},
			handleShow() {
				uni.setNavigationBarTitle({
					title: '朋友圈'
				})
				console.log('onshow');
			},
			async getData() {
				if (this.page !== 1 && this.list >= this.total) {
					return
				}
				const res = await api.moments({
					page: this.page,
					size: this.size
				})
				console.log('res', res.items[0])
				this.total = res.total
				const list = res.items.map(item => {
					return {
						content: item.moment.spec.content.html,
						medium: item.moment.spec.content.medium,
						createTime: this.$u.timeFormat(new Date(item.moment.spec.releaseTime),
							'yyyy-mm-dd hh:MM:ss')
					}
				})
				if (this.page === 1) {
					this.list = list
				} else {
					this.list.push(...list)
				}

				return res
			},
			handleRefresh() {
				this.page = 1
				this.triggered = true
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.moments-view {
		width: 100%;
		height: 100%;

		.body {
			width: 100%;
			height: calc(100% - 44px);
			overflow-y: auto;
			box-sizing: border-box;
		}

		.moments-item {
			margin: 20rpx;
			box-shadow: 0rpx 10rpx 12rpx #e8e8e8, inset 0rpx 10rpx 12rpx #f0f0f0;
			padding: 20rpx;
			border-radius: 8px;

			.content {
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}

			.time {
				text-align: right;
				font-size: 28rpx;
			}
		}
	}
</style>