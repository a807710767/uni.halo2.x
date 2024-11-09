<template>
	<view class="my-contact">
		<view class="top y juc-cen ali-cen">
			<u-image :src="$halo.info.logo" width="150rpx" height="150rpx" shape="circle" class="logo mb10">
			</u-image>
			<view class="title mb10" v-if="$halo.info.title">
				{{$halo.info.title}}
			</view>
			<view class="sub-title mb10">
				{{$halo.info.subTitle}}
			</view>
			<view class="x">
				<u-icon :name="item.icon" v-for="(item,index) in $halo.otherPlatforms" :key="index" class="m10"
					size="40rpx"></u-icon>
			</view>
		</view>
		<view class="y list">
			<view class="item x ali-cen" v-for="(item,index) in $halo.otherPlatforms" :key="index">
				<view class=" x label ali-cen">
					<u-icon :name="item.icon" class="mr10" size="24rpx"></u-icon>
					<view class="">
						{{item.name}}
					</view>
				</view>
				<view class="content" @click="handleCopy(item)">
					{{item.url}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			handleCopy(item) {
				uni.setClipboardData({
					data: item.url,
					success: function() {
						uni.showToast({
							title: `${item.name}¸´ÖÆ³É¹¦`,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-contact {
		.top {
			width: 100%;
			height: 400rpx;
			border-bottom: 1px #ddd solid;

			.logo {
				border: 1px #ddd solid;
				border-radius: 50%;
			}

			.title {
				font-size: 40rpx;
				font-weight: bold;
			}

			.sub-title {
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.list {
			font-size: 24rpx;

			.item {
				padding: 10rpx;
				margin: 20rpx 20rpx 0;
				background-color: #ECF5FF;
				border-radius: 4px;
				color: #2979FF;
				.label {
					width: 150rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>