<template>
	<scroll-view class="index-view" :refresher-triggered="triggered" @refresherrefresh="handleRefresh"
		refresher-enabled>
		<view class="" v-if="index === 'index'">
			<view class="x ali-cen">
				<view class="title">
					{{ halo.info.title }}
				</view>
				<view class="sub-title" v-if="halo.info.subTitle">
					- {{ halo.info.subTitle }}
				</view>
			</view>
			<u-swiper :list="swiperList" @click="clickSwiper" indicator circular indicatorStyle="bottom"
				indicatorActiveColor="#1F76FF" height="300" v-if="swiperList.length" radius="20"></u-swiper>
			<view class="category x">
				<u--image v-for="(item, index) in categories" :key="index" :src="item.cover" shape="square"
					width="131rpx" height="131rpx" style="margin: 10rpx;"></u--image>
			</view>

		</view>
	</scroll-view>
</template>

<script>
	import LoadingView from '../Loading/Loading.vue'
	import api from '@/api/index.js'
	export default {
		name: "IndexView",
		props: {
			index: {
				type: String
			}
		},
		data() {
			return {
				swiperList: [],
				triggered: false,
				categories: []
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
				await this.getSwiperList()
				await this.getCategory()
				this.triggered = false
			},
			onShow() {
				console.log('onshow');
			},
			handleRefresh() {
				this.triggered = true
				this.init()
			},
			getCategory() {
				return api.categories().then(res => {
					console.log('categories', res)
					this.categories = res.items.map(item => {
						return {
							metadata: item.metadata.name,
							name: item.spec.displayName,
							cover: item.spec.cover,
						}
					})
					this.categories.push(...this.categories)
				})
			},
			getSwiperList() {
				return api.menus({
					name: 'menu-bLjrr'
				}).then(res => {
					const list = res.menuItems.map(item => {
						return {
							url: item.status.displayName,
							href: item.status.href
						}
					})
					this.swiperList = list
				})
			},
			clickSwiper(e) {
				console.log(this.swiperList[e].href)
			},
			handleGoSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-view {
		width: 100%;
		height: 100%;
		padding: 10rpx;

		.title {
			font-size: 40rpx;
			font-weight: bold;
			margin: 10rpx 20rpx;
		}

		.sub-title {
			font-size: 36rpx;
			font-weight: bold;
		}

		.category {
			width: 100%;
			flex-wrap: wrap;
			max-height: 300rpx;
			overflow-y: hidden;
			overflow-x: auto;
		}
	}
</style>