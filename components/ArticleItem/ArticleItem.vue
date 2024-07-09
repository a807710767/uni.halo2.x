<template>
	<view class="article-item">
		<view class="y" v-if="layoutComp === 'col'">
			<image :src="data.cover || $halo.info.logo" class="cover" @click="handleDetail"></image>
			<view class="p10">
				<view class="title " @click="handleDetail">
					{{data.title}}
				</view>
				<view class="excerpt u-line-2 mt10">
					{{data.excerpt}}
				</view>
				<view class="x mt10" style="flex-wrap: wrap;">
					<u-tag v-for="(item,index) in data.categories" :key="index"
						:text="$halo.categoriesMap[item]" plainFill plain size="mini" class="m10"
						style="flex-shrink: 0;"></u-tag>
					<u-tag v-for="(item,index) in data.tags" :key="index" :text="$halo.tagsMap[item]"
						icon="tags-fill" plainFill plain size="mini" type="warning" class="m10"
						style="flex-shrink: 0;"></u-tag>
				</view>
				<view class="x juc-bet bottom mt10">
					<view class="x">
						<u-icon name="eye-fill" :label="data.visit"></u-icon>
						<view class="mr10">
						</view>
						<u-icon name="account-fill" :label="data.displayName"></u-icon>
					</view>
					<view class="">
						{{ $u.timeFormat(data.publishTime, 'yyyy-mm-dd hh:MM:ss')}}
					</view>
				</view>
			</view>
		</view>
		<view class="x row" v-if="layoutComp === 'row'">
			<image :src="data.cover || $halo.info.logo" mode="aspectFill" class="cover-row" @click="handleDetail">
			</image>
			<view class="y juc-bet">
				<view class="y">
					<view class="title u-line-2" @click="handleDetail">
						{{data.title}}
					</view>
					<view class="excerpt u-line-2 mt10">
						{{data.excerpt}}
					</view>
				</view>
				<view class="y">
					<view class="x mt10" style="flex-wrap: wrap;">
						<u-tag v-for="(item,index) in data.categories" :key="index"
							:text="$halo.categoriesMap[item]" plainFill plain size="mini" class="mr10 mt10"
							style="flex-shrink: 0;"></u-tag>
						<u-tag v-for="(item,index) in data.tags" :key="index" :text="$halo.tagsMap[item]"
							icon="tags-fill" plainFill plain size="mini" type="warning" class="mr10 mt10"
							style="flex-shrink: 0;"></u-tag>
					</view>
					<view class="x mt10">
						<u-icon name="eye-fill" :label="data.visit"></u-icon>
						<view class="mr10">
						</view>
						<u-icon name="account-fill" :label="data.displayName"></u-icon>
					</view>
					<view class="bottom">
						{{ $u.timeFormat(data.publishTime, 'yyyy-mm-dd hh:MM:ss')}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ArticleItem",
		props: {
			data: {
				type: Object,
				default: {}
			},
			layout: {
				type: String,
				default: ''
			}
		},
		computed: {
			layoutComp() {
				if (this.layout) {
					return this.layout
				} else {
					return this.$halo.info.layout
				}
			}
		},
		data() {
			return {};
		},
		methods: {
			handleDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail?name=' + this.data.name
				})
			}
		}
	}
</script>

<style lang="scss">
	.article-item {
		width: 100%;
		background-color: #fff;
		margin-bottom: 20rpx;
		box-shadow: 0rpx 5rpx 12rpx #e2e2e2, inset 0rpx 0rpx 12rpx #e1e1e1;
		border: 1px solid #e7e7e7;
		border-radius: 8px;
		overflow: hidden;
		flex-shrink: 0;
		box-sizing: border-box;

		.cover {
			width: 100%;
			height: 350rpx;
			margin-bottom: 10rpx;
			cursor: pointer;
			flex-shrink: 0;
		}

		.title {
			font-size: 36rpx;
			font-weight: bold;
			cursor: pointer;

		}

		.excerpt {
			font-size: 28rpx;
			color: #888;
		}

		.bottom {
			color: #737373;
			font-size: 28rpx;
			margin-top: 10rpx;
		}

		.row {
			height: 380rpx;
		}

		.cover-row {
			width: 280rpx;
			height: 100%;
			flex-shrink: 0;
			margin-right: 20rpx;
			cursor: pointer;
			flex-shrink: 0;
		}
	}
</style>