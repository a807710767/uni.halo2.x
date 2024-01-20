<template>
	<view class="project" :style="'--mainColor:' + $halo.info.mainColor">
		<view class="top y juc-cen ali-cen">
			<u-image :src="$halo.info.logo" width="150rpx" height="150rpx" shape="circle" class="logo mb10">
			</u-image>
		</view>
		<u-cell-group>
			<u-cell-item title="作者博客" :arrow="true"></u-cell-item>
			<u-cell-item title="码云仓库" :arrow="true"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.project {
		.top {
			width: 100%;
			height: 200rpx;
			background-color: var(--mainColor);

			.logo {
				border: 1px #ddd solid;
				border-radius: 50%;
			}
		}
	}
</style>