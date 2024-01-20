<template>
	<view class="index-view">
		<u-navbar title="首页" placeholder :is-back="false" :border-bottom="false"
			:background="{background:$halo.info.mainColor}" :title-color="$halo.info.mainTextColor">
		</u-navbar>
		<scroll-view :style="'height: calc(100% - 44px - '+ $u.sys().statusBarHeight+'px);'" scroll-y
			:refresher-triggered="triggered" @refresherrefresh="handleRefresh" refresher-enabled
			@scrolltolower="handleBottom" :refresher-threshold="50" enable-flex :scroll-into-view="scrollId"
			scroll-with-animation v-if="index === 'index'" @scroll="scrollView">
			<view class="body">
				<view class="x ali-cen p10" id="top"
					:style="'background-color: '+$halo.info.mainColor+';color: ' + $halo.info.mainTextColor">
					<u-image :src="$halo.info.logo" width="50rpx" height="50rpx" shape="circle"></u-image>
					<view class="title">
						{{ $halo.info.title }}
					</view>
					<view class="">
						-
					</view>
					<view class="sub-title" v-if="$halo.info.subTitle">
						{{ $halo.info.subTitle }}
					</view>
				</view>
				<view class="y m10 ">
					<u-search disabled @click="handleGoSearch" @custom="handleGoSearch" class="p10"></u-search>
					<view class="x">

					</view>
				</view>
				<!-- 轮播图 -->
				<view class="m10 p10" v-if="swiperList && swiperList.length">
					<u-swiper :list="swiperList" @click="clickSwiper" height="300rpx" radius="10"></u-swiper>
				</view>
				<!-- 分类 -->
				<view class="ml10 mr10 p10" v-if="categories && categories.length">
					<view class="category x" v-if="categories.length <= 10">
						<view class="y ali-cen m10" v-for="(item, index) in categories" :key="index">
							<image :src="item.cover || $halo.info.logo" class="image">
							</image>
							<view class="text">
								{{item.name}}
							</view>
						</view>

					</view>
					<view class="category y" v-else>
						<view class="x">
							<view class="y ali-cen m10" v-for="(item, index) in categoriesTop" :key="index">
								<image :key="index" :src="item.cover || $halo.info.logo" class="image">
								</image>
								<view class="text">
									{{item.name}}
								</view>
							</view>
						</view>
						<view class="x">
							<view class="y ali-cen m10" v-for="(item, index) in categoriesBottom" :key="index">
								<image :key="index" :src="item.cover || $halo.info.logo" class="image">
								</image>
								<view class="text">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- tags -->
				<block v-if="tags && tags.length">
					<view id="tags" class="tags">
						<u-tabs ref="tabsRef" :current="tagIndex" :list="tags" name="displayName"
							@change="handleTags"></u-tabs>
					</view>
					<view class="p20"
						:style="'min-height:calc( '+ articleHeight +'px - 20rpx);width: 100%;box-sizing:border-box'">
						<block v-if="articleList && articleList.length">
							<ArticleItem style="width: 100%" v-for="(article,articleIndex) in articleList"
								:data="article" :key="articleIndex">
							</ArticleItem>
							<u-loadmore :status="articleList.length >= total ? 'nomore':'loading '" dashed line />
						</block>
						<view class="x ali-cen juc-cen"
							:style="'min-height:calc( '+ articleHeight +'px - 20rpx);width: 100%;'" v-else>
							<u-empty mode="data" src="https://cdnpan.qiwo75.com/halo/nodata.png" iconSize="200"
								textSize="30rpx">
							</u-empty>
						</view>
						<view class="x juc-cen p10">
							<u-link href="https://beian.miit.gov.cn/">{{$halo.info.beian}}</u-link>
						</view>
					</view>
					<!-- 高度问题没解决 -->
					<!-- <swiper :current="tagIndex" @change="handleSwiper"
					:style="'min-height:calc( '+ articleHeight +'px - 20rpx);width: 100%;'">
					<swiper-item v-for="(item,index) in tags" :key="index" class="list-swiper-item" style="height: auto;">
						<view class="y" v-if="index === tagIndex" style="width: 100%;">
							<block v-if="articleList && articleList.length">
								<ArticleItem v-for="(article,articleIndex) in articleList" :data="article"
									:key="articleIndex">
								</ArticleItem>
							</block>
							<block v-else>
								<u-empty mode="data" iconSize="200" textSize="30" marginTop="100">
								</u-empty>
							</block>
						</view>
						<view v-else>
							<u-loading-page :image="$halo.info.logo" iconSize="200" fontSize="30" loadingText="切换看数据"
								loading></u-loading-page>
						</view>
					</swiper-item>
				</swiper> -->
				</block>
			</view>
		</scroll-view>
		<LoadingView ref="LoadingView"></LoadingView>
		<transition name="fade">
			<view class="back-top" v-show="showBackTop" @click="handleBackTop">
				<image src="/static/imgs/toTop.gif" class="image"></image>
			</view>
		</transition>
	</view>
</template>

<script>
	import LoadingView from '@/components/Loading/Loading.vue'
	import ArticleItem from '@/components/ArticleItem/ArticleItem.vue'
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
				showBackTop: false,
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
				scrollId: '',
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				uni.setNavigationBarTitle({
					title: this.$halo.info.title + ' - ' + this.$halo.info.subTitle
				})
				this.page = 1
				this.$refs.LoadingView.open()
				const sys = await this.$u.sys()
				console.log('sys', sys, this)
				this.articleHeight = sys.windowHeight - 50 - 90 - sys.statusBarHeight
				await this.getSwiperList()
				await this.getCategory()
				await this.getTags()
				await this.getPostsList()
				this.triggered = false
				this.$refs.LoadingView.close()
			},
			handleShow() {
				uni.setNavigationBarTitle({
					title: this.$halo.info.title + ' - ' + this.$halo.info.subTitle
				})
				// if (this.$refs.tabsRef) {
				// 	this.$refs.tabsRef.init()
				// }
				console.log('indexOnshow');
			},
			scrollView(e) {
				this.$u.debounce(() => {
					if (e.detail.scrollTop > 100) {
						this.scrollId = ''
						this.showBackTop = true
					} else {
						this.showBackTop = false
					}
				}, 300)
			},
			handleBackTop() {
				this.scrollId = 'top'
			},
			handleRefresh() {
				this.page = 1
				this.triggered = true
				this.init()
			},
			handleBottom() {
				if (this.articleList.length >= this.total) {
					return
				}
				this.page = this.page + 1
				this.getPostsList()
				console.log('触底');
			},
			async getPostsList() {
				let res = {}
				this.$refs.LoadingView.open()
				if (this.tagIndex === 0) {
					res = await api.pages({
						page: this.page,
						size: this.size
					})
				} else {
					res = await api.tagsPosts({
						page: this.page,
						size: this.size,
						name: this.tags[this.tagIndex].name
					})
				}
				this.total = res.total
				if (res.items && res.items.length) {
					const list = res.items.map(item => {
						return {
							name: item.metadata.name,
							displayName: item.owner.displayName,
							...item.spec,
							...item.stats,
							...item.status

						}
					})
					if (this.page === 1) {
						this.articleList = list
					} else {
						this.articleList.push(...list)
					}
				} else {
					this.articleList = []
				}
				console.log(this.articleList)
				this.scrollId = ''
				this.$refs.LoadingView.close()
				return res
			},
			handleTags(index) {
				this.tagIndex = index
				this.page = 1
				this.getPostsList()
				this.scrollId = 'tags'
			},
			handleSwiper(e) {
				const index = e.detail.current
				const item = this.tags[index]
				this.tagIndex = item.index
				this.page = 1
				this.getPostsList()
				this.scrollId = 'tags'
			},
			getTags() {
				return api.tags().then(res => {
					console.log(res);
					const list = res.items.map((item, index) => {
						this.$halo.tagsMap[item.metadata.name] = item.spec.displayName
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
						this.$halo.categoriesMap[item.metadata.name] = item.spec.displayName
						return {
							metadata: item.metadata.name,
							name: item.spec.displayName,
							cover: item.spec.cover,
						}
					})
					this.categories.reverse()
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
							image: item.status.displayName,
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

<style lang="scss" scoped>
	.index-view {
		height: 100%;
		width: 100%;
		background-color: #fff;
	}

	.back-top {
		position: fixed;
		right: 80rpx;
		bottom: 30%;
		z-index: 9999;
		width: 40rpx;
		height: 40rpx;

		.image {
			width: 68rpx;
			height: 68rpx;
			border-radius: 50%;
			border: 1px solid #2979FF;
		}
	}

	.body {
		width: 100%;
		box-sizing: border-box;

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

			&::-webkit-scrollbar {
				display: none;
			}

			.image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 8px;
				margin-bottom: 10rpx;
				flex-shrink: 0;
				border-bottom: 1px solid #ddd;
			}

			.text {
				font-size: 28rpx;
				color: #333;
			}
		}

		#tags,
		.tags {
			position: sticky;
			top: 0;
			z-index: 90;
			background-color: #fff;
		}

		.list-swiper-item {
			// height: 100%;
			height: auto;
			// overflow-y: auto;
		}


	}
</style>