<template>
	<view>
		<view class="tips-wrap" v-if="showTips" :style="{'top':top,'left': paddingLeft}">
			<view class="tips-top">
				<img class="tips-img" src="https://i.postimg.cc/HsdBgJXp/tips.png" alt="">
				<view class="top-text">
					<text>添加到我的小程序</text>
					<text>访问小程序更便捷</text>
				</view>
			</view>
			<view class="tip-bottom" @click="closeTips">
				我知道了
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TipsTop",
		data() {
			return {
				isFirst: true, //是否首次
				showTips: false, //是否展示
				top: '',
				right: '',
				paddingLeft: '',
			};
		},
		onReady() {
			this.getTopAndLeft()
			this.showTips = true;
			// //获取本地缓存
			let firstInit = uni.getStorageSync('isFirst');

			if (firstInit) {
				this.showTips = false;
			} else {
				this.showTips = true;
			}
		},
		methods: {
			getTopAndLeft() {
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect() // 获取胶囊的位置
				console.log(menuButtonInfo, 'menuButtonInfo')
				this.top = `${menuButtonInfo.bottom + 4}px` // 赋值高度
				this.right = menuButtonInfo.right + 'px' // 赋值left
				/**
				 * 区分安卓和ios系统  安卓和ios胶囊真机差16px
				 */
				if (['ios'].includes(uni.getSystemInfoSync().platform)) {
					this.paddingLeft = `${menuButtonInfo.left - 108}px`
				} else {
					this.paddingLeft = `${menuButtonInfo.left - 92}px` // 193为箭头到左侧的宽度
				}
			},
			closeTips() {
				this.showTips = false;
				uni.setStorage({
					key: 'isFirst',
					data: '0'
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
	.tips-wrap {
		position: fixed;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 340rpx;
		height: 209rpx;
		display: flex;
		background: url(https://i.postimg.cc/htVRhQhf/tipsbg.png) no-repeat;
		background-size: 340rpx 209rpx;
		filter: drop-shadow(0rpx 0rpx 6rpx 16rpx #fff);
	}

	.tips-top {
		height: 129rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: bold;
		.tips-img {
			height: 64rpx;
			width: 64rpx;
			margin-right: 10rpx;
		}

		.top-text {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	.tip-bottom {
		border-top: 2rpx solid rgba(105, 103, 103, .16);
		height: 70rpx;
		line-height: 70rpx;
		width: 100%;
		text-align: center;
		color: #FFC75A;
		font-size: 26rpx;
		font-weight: 600;
	}

	.closeIcon {
		font-size: 20rpx !important;
		margin-left: 10rpx;
		padding: 0 8rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
	}
</style>