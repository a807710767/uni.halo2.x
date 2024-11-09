<template>
	<view class="project" :style="'--mainColor:' + $halo.info.mainColor">
		<view class="top y juc-cen ali-cen">
			<u-image :src="$halo.info.logo" width="150rpx" height="150rpx" shape="circle" class="logo mb10">
			</u-image>
		</view>
		<u-cell-group>
			<u-cell-item title="作者博客" :arrow="true" @click="handleClick(1)"></u-cell-item>
			<u-cell-item title="码云仓库" :arrow="true" @click="handleClick(2)"></u-cell-item>
			<u-cell-item title="github仓库" :arrow="true" @click="handleClick(5)"></u-cell-item>
			<u-cell-item title="halo官方" :arrow="true" @click="handleClick(3)"></u-cell-item>
			<u-cell-item title="halo文档" :arrow="true" @click="handleClick(4)"></u-cell-item>
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
				let url = ''
				if (type === 1) {
					url: this.$halo.info.domain
				}
				else if (type === 2) {
					url: 'https://gitee.com/qiwo/uni.halo2.x'
				}
				else if (type === 3) {
					url: 'https://www.halo.run/'
				}
				else if (type === 4) {
					url: 'https://docs.halo.run/'
				}
				else if (type === 5) {
					url: 'https://github.com/a807710767/uni.halo2.x'
				}
				uni.setClipboardData({
					data: url,
					success: function() {
						uni.showToast({
							title: `复制成功`,
							icon: 'none'
						})
					}
				})
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