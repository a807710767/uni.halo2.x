<template>
	<view class="article-item" @click="handleDetail">
		<view class="y" v-if="$halo.info.layout === 'col'">
			<u-image :src="data.cover" class="cover"></u-image>
			<view class="p10">
				<view class="title ">
					{{data.title}}
				</view>
				<view class="excerpt u-line-2 mt10">
					{{data.excerpt}}
				</view>
				<view class="x mt10">
					<u-tag v-for="item in data.categories" :key="item" :text="$halo.categoriesMap[item]" plainFill plain
						size="mini" class="m10"></u-tag>
					<u-tag v-for="item in data.tags" :key="item" :text="$halo.tagsMap[item]" icon="tags-fill" plainFill
						plain size="mini" type="warning" class="m10"></u-tag>
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
		<view class="x" v-if="$halo.info.layout === 'row'">
			<u-image :src="data.cover" width="230rpx" height="230rpx" class="cover-row"
				:loadingIcon="$halo.info.logo"></u-image>
			<view class="y juc-bet">
				<view class="y">
					<view class="title u-line-2">
						{{data.title}}
					</view>
					<view class="excerpt u-line-2 mt10">
						{{data.excerpt}}
					</view>
				</view>
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
</template>

<script>
	export default {
		name: "ArticleItem",
		props: {
			data: {
				type: Object,
				default: {}
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
			height: 300rpx;
			margin-bottom: 10rpx;
		}

		.title {
			font-size: 36rpx;
			font-weight: bold;

		}

		.excerpt {
			font-size: 28rpx;
			color: #888;
		}

		.bottom {
			color: #737373;
			font-size: 28rpx;
		}


		.cover-row {
			flex-shrink: 0;
			margin-right: 20rpx;
		}
	}
</style>