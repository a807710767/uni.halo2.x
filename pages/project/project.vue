<template>
	<view class="project" :style="'--mainColor:' + $halo.info.mainColor">
		<view class="top y juc-cen ali-cen">
			<u-image :src="$halo.info.logo" width="150rpx" height="150rpx" shape="circle" class="logo mb10">
			</u-image>
		</view>
		<u-cell-group>
			<u-cell-item title="作者博客" :arrow="true" @click="handleClick(1)"></u-cell-item>
			<u-cell-item title="码云仓库" :arrow="true" @click="handleClick(2)"></u-cell-item>
			<u-cell-item title="halo官方" :arrow="true" @click="handleClick(3)"></u-cell-item>
			<u-cell-item title="halo文档" :arrow="true" @click="handleClick(3)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			handleClick(type) { // 处理点击事件，根据type跳转到相应的链接。
				if (type === 1) {
					uni.navigateTo({
						url: this.$halo.info.domain
					});
				} else if (type === 2) {
					uni.navigateTo({
						url: 'https://gitee.com/qiwo/uni.halo2.x'
					});
				} else if (type === 3) {
					uni.navigateTo({
						url: 'https://www.halo.run/'
					});
				} else if (type === 4) {
					uni.navigateTo({
						url: 'https://docs.halo.run/'
					});
				}
			}
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