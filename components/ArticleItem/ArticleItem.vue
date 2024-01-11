<template>
	<view class="article-item">
		<view class="">
			<u--image :src="data.cover" width="100%" height="300rpx" style="margin-bottom: 10rpx;"></u--image>
			<view class="p10">
				<view class="title ">
					{{data.title}}
				</view>
				<view class="excerpt u-line-2 mt10">
					{{data.excerpt}}
				</view>
				<view class="x mt10">
					<u-tag v-for="item in data.categories" :text="$halo.categoriesMap[item]" plainFill :key="item" plain
						size="mini"></u-tag>
					<u-tag v-for="item in data.tags" :text="$halo.tagsMap[item]" icon="tags-fill" plainFill :key="item"
						plain size="mini" type="warning" class="mr10 mt10"></u-tag>
				</view>
				<view class="x juc-bet bottom mt10">
					<view class="x">
						<u-icon name="eye-fill" :label="data.visit" class="mr10"></u-icon>
						<u-icon name="account-fill" :label="data.displayName"></u-icon>
					</view>
					<view class="">
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
			}
		},
		data() {
			return {
				$halo: {}
			};
		}
	}
</script>

<style lang="scss">
	.article-item {
		width: 100%;
		background-color: #fff;
		margin-bottom: 20rpx;
		box-shadow: 0rpx 10rpx 12rpx #e2e2e2, inset 0rpx 10rpx 12rpx #f0f0f0;
		border-radius: 8px;
		overflow: hidden;
		flex-shrink: 0;

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
	}
</style>