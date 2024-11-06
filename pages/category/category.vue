<template>
	<view class="category-view">
		<view class="x" style="height: 100%;width: 100%;">
			<view class="y category">
				<view :class="name === item.metadata?'category-item-active':'category-item'"
					v-for="(item,index) in categories" :key="index" @click="changeCategroy(index)">
					{{item.name}}
				</view>
			</view>
			<view class="y article">
				<swiper :current="swiperIndex" style="width: 100%;height: 100%;" @change="changeSwiper" vertical>
					<swiper-item v-for="(item,index) in categories" :key="index" style="width: 100%;height: 100%;">
						<scroll-view scroll-y v-if="item.list && item.list.length" style="width: 100%;height: 100%;">
							<ArticleItem style="width: 100%" v-for="(article,articleIndex) in item.list" :data="article"
								layout="col" :key="articleIndex">
							</ArticleItem>
						</scroll-view>
						<view class="x ali-cen juc-cen" style="height: 100%;width: 100%;" v-else>
							<u-empty mode="data" src="https://cdnpan.qiwo75.com/halo/nodata.png" iconSize="200"
								textSize="30rpx">
							</u-empty>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<LoadingView ref="LoadingView"></LoadingView>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	import LoadingView from '@/components/Loading/Loading.vue'
	export default {
		data() {
			return {
				name: '',
				swiperIndex: 0,
				categories: [],
			};
		},
		components: {
			LoadingView
		},
		methods: {
			changeSwiper(e) {
				const index = e.detail.current
				const item = this.categories[index]
				this.swiperIndex = index
				this.name = item.metadata
				if (!item.isNew) {
					return
				} else {
					this.getList()
				}
			},
			changeCategroy(index) {
				this.changeSwiper({
					detail: {
						current: index
					}
				})
			},
			getList() {
				this.$refs.LoadingView.open()
				const category = this.categories.filter(item => item.metadata === this.name)
				api.categoryPosts({
					name: this.name,
					page: 1,
					size: 999
				}).then(res => {
					const list = res.items.map(item => {
						return {
							name: item.metadata.name,
							displayName: item.owner.displayName,
							...item.spec,
							...item.stats,
							...item.status
						}
					})
					category[0].list = list
					category[0].isNew = false
					console.log(category[0]);
					this.$set(this.categories, category[0].index, category[0])
					console.log(this.categories);
				}).finally(() => {
					this.$refs.LoadingView.close()
					uni.stopPullDownRefresh()
				})
			},
			getCategory() {
				return api.categories().then(res => {
					this.categories = res.items.map((item, index) => {
						return {
							metadata: item.metadata.name,
							name: item.spec.displayName,
							cover: item.spec.cover,
							index: index,
							isNew: true,
							list: []
						}
					})
				})
			}
		},
		async onPullDownRefresh() {
			await this.getCategory()
			const category = this.categories.filter(item => item.metadata === this.name)
			this.changeSwiper({
				detail: {
					current: category[0].index
				}
			})
		},
		async mounted() {
			await this.getCategory()
			if (this.name) {
				const category = this.categories.filter(item => item.metadata === this.name)
				console.log(category);
				this.changeSwiper({
					detail: {
						current: category[0].index
					}
				})
			}
		},
		onLoad(op) {
			this.name = op.name
			if (!this.name) {
				uni.showModal({
					content: '参数异常',
					showCancel: false,
					success() {
						uni.navigateBack()
					}
				})
				return
			}
		}
	}
</script>

<style lang="scss">
	.category-view {
		height: 100%;
		width: 100%;

		.category {
			height: 100%;
			width: 180rpx;
			flex-shrink: 0;
			background-color: #eee;

			.category-item {
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
			}

			.category-item-active {
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #2979FF;
				color: #fff;
			}
		}

		.article {
			flex: 1;
			height: 100%;
			padding: 10rpx;
		}
	}
</style>