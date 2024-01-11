<template>
	<scroll-view class="index-view" scroll-y :refresher-triggered="triggered" @refresherrefresh="handleRefresh"
		refresher-enabled :refresher-threshold="50" :scroll-into-view="scrollId">
		<view class="" v-if="index === 'index'">
			<view class="x ali-cen">
				<u--image :src="halo.info.logo" width="50rpx" height="50rpx" shape="circle"></u--image>
				<view class="title">
					{{ halo.info.title }}
				</view>
				<view class="">
					-
				</view>
				<view class="sub-title" v-if="halo.info.subTitle">
					{{ halo.info.subTitle }}
				</view>
			</view>
			<view class="x">

			</view>
			<!-- 轮播图 -->
			<block v-if="swiperList && swiperList.length">
				<u-swiper :list="swiperList" @click="clickSwiper" indicator circular indicatorStyle="bottom"
					indicatorActiveColor="#1F76FF" height="300" radius="20"></u-swiper>
			</block>
			<!-- 分类 -->
			<block v-if="categories && categories.length">
				<view class="category x" v-if="categories.length <= 10">
					<u--image v-for="(item, index) in categories" :key="index" :src="item.cover" width="128rpx"
						height="128rpx" radius="12" class="m10"></u--image>
				</view>
				<view class="category y" v-else>
					<view class="x">
						<u--image v-for="(item, index) in categoriesTop" :key="index" :src="item.cover" width="128rpx"
							height="128rpx" radius="12" class="m10"></u--image>
					</view>
					<view class="x">
						<u--image v-for="(item, index) in categoriesBottom" :key="index" :src="item.cover"
							width="128rpx" height="128rpx" radius="12" class="m10"></u--image>
					</view>
				</view>
			</block>
			<!-- tags -->
			<block v-if="tags && tags.length">
				<u-tabs :current="tagIndex" id="tages" :list="tags" keyName="displayName" :activeStyle="activeStyle"
					lineHeight="10" :inactiveStyle="inactiveStyle" @click="handleTags"></u-tabs>
				<swiper :current="tagIndex" @change="handleSwiper" :style="`height:calc( ${articleHeight}px - 20rpx);width: 100%;`">
					<swiper-item v-for="(item,index) in tags" :key="index" class="list-swiper-item" style="">
						<scroll-view scroll-y v-if="index === tagIndex" style="width: 100%;height: 100%;">
							<ArticleItem v-for="(article,articleIndex) in articleList" :data="article"
								:key="articleIndex">
							</ArticleItem>
						</scroll-view>
						<view v-else>
							kong空
						</view>
					</swiper-item>
				</swiper>
			</block>
		</view>
		<LoadingView ref="LoadingView"></LoadingView>
	</scroll-view>
</template>

<script>
	import LoadingView from '../Loading/Loading.vue'
	import ArticleItem from '../ArticleItem/ArticleItem.vue'
	import api from '@/api/index.js'
	export default {
		name: "IndexView",
		components: {
			LoadingView,
			ArticleItem
		},
		props: {
			index: {
				type: String
			}
		},
		data() {
			return {
				tagIndex: 0,
				swiperList: [],
				triggered: false,
				categories: [],
				categoriesTop: [],
				categoriesBottom: [],
				tags: [],
				activeStyle: {
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				},
				inactiveStyle: {
					color: '#606266',
					transform: 'scale(1)'
				},

				size: 20,
				page: 1,
				total: 0,
				articleList: [],
				articleHeight: 300,
				scrollId: ''
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				this.page = 1
				this.$refs.LoadingView.open()
				const sys = await this.$u.sys()
				this.articleHeight = sys.windowHeight - 50 - 44
				await this.getSwiperList()
				await this.getCategory()
				await this.getTags()
				await this.getPostsList()
				this.triggered = false
				this.$refs.LoadingView.close()
			},
			onShow() {
				console.log('onshow');
			},
			handleRefresh() {
				this.triggered = true
				this.init()
			},
			async getPostsList(name) {
				let res = {}
				if (this.page !== 1 && this.list >= this.total) {
					return
				}
				if (this.tagIndex === 0) {
					res = await api.pages({
						page: this.page,
						size: this.size
					})
				} else {
					res = await api.tagsPosts({
						page: this.page,
						size: this.size,
						name
					})
				}
				this.total = res.total
				if (res.items && res.items.length) {
					const list = res.items.map(item => {
						return {
							name: item.metadata.name,
							...item.stats,
							...item.spec
						}
					})
					if (this.page === 1) {
						this.articleList = list
					} else {
						this.articleList.push(...list)
					}
				}
				console.log(this.articleList[0])
				this.scrollId = ''
				return res
			},
			handleTags(item) {
				this.tagIndex = item.index
			},
			handleSwiper(e) {
				const index = e.detail.current
				const item = this.tags[index]
				this.tagIndex = item.index
				this.page = 1
				this.getPostsList(item.name)
				this.scrollId = 'tages'
			},
			getTags() {
				return api.tags().then(res => {
					console.log(res);
					const list = res.items.map((item, index) => {
						return {
							name: item.metadata.name,
							index: index + 1,
							...item.spec
						}
					})
					this.tags = [{
						name: 'all',
						displayName: '全部',
						index: 0
					}]
					this.tags.push(...list)
				})
			},
			getCategory() {
				return api.categories().then(res => {
					this.categories = res.items.map(item => {
						return {
							metadata: item.metadata.name,
							name: item.spec.displayName,
							cover: item.spec.cover,
						}
					})
					if (this.categories.length > 10) {
						this.categoriesTop = []
						this.categoriesBottom = []
						const midSize = Math.ceil(this.categories.length / 2)
						this.categories.forEach((item, index) => {
							if (index < midSize) {
								this.categoriesTop.push(item)
							} else {
								this.categoriesBottom.push(item)
							}
						})
					}
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
			font-size: 30rpx;
			font-weight: bold;
			margin: 10rpx 20rpx;
		}

		.category {
			flex-wrap: nowrap;
			overflow-x: auto;
		}

		#tages {
			position: sticky;
			top: 0;
			z-index: 10;
			background-color: #fff;
		}

		.list-swiper-item {
			height: 100%;
		}
	}
</style>