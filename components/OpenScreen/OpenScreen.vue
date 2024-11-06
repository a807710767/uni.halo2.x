<template>
	<view class="open-screen" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" :style="'backdrop-filter: blur('+(15-style.blur)+'px);'">
		<view :class="'y ali-cen top ' + (ishandEnter? 'top-enter' : '')" :style="'opacity: '+style.opacity+';filter: blur('+style.blur+'px)'">
			<image :src="$halo.info.avatar" class="avatar" :style="';transform: rotate('+style.rotate+'deg);'"></image>
			<view class="mt40 font44 font-w">
				{{$halo.info.title}}
			</view>
			<view class="mt20 font30">
				{{$halo.info.subTitle}}
			</view>
			<view class="mt40 enter-btn" @click="handleEnter">
				芝麻开门
			</view>
		</view>
		<view class="y ali-cen bottom">
			<image src="/static/imgs/drawUpHand.png" class="bottom-icon" v-if="moving"></image>
			<image src="/static/imgs/drawUp.png" class="bottom-icon" style="width: 40rpx;height: 40rpx;" v-else></image>
			<view class="mt10">{{bottomText}}</view>
		</view>
	</view>
</template>

<script>
	const enterHeight = 250
	const enterWeight = 50
	export default {
		name: "OpenScreen",
		data() {
			return {
				ishandEnter: false,
				moving: false,
				moveInfo: '',
				bottomText: '··· 上滑进入 ···',
				textList: ['··· 上滑进入 ···', '··· 继续上滑 ···', '··· 松手进入 ···'],
				diffY: 0,
				diffX: 0,
				style: {
					opacity: 1,
					blur: 0,
					rotate: 0
				}

			};
		},
		methods: {
			handleEnter() {
				this.ishandEnter = true
				setTimeout(() => {
					this.$emit('enter')
				}, 600)
			},
			handleTouchStart(e) {
				this.moveInfo = e.changedTouches[0]
			},
			handleTouchMove(e) {
				const diffX = this.moveInfo.clientX - e.changedTouches[0].clientX
				const diffY = this.moveInfo.clientY - e.changedTouches[0].clientY
				console.log(diffX);
				if (diffY > 200) {
					this.bottomText = this.textList[2]
				} else if (diffY > 20) {
					this.moving = true
					this.bottomText = this.textList[1]
				} else {
					this.bottomText = this.textList[0]
				}
				this.diffY = diffY > enterHeight ? enterHeight : diffY
				this.diffX = diffX > enterWeight ? enterWeight : diffY
				const ratioX = diffX / enterWeight
				const ratioY = diffY / enterHeight
				this.style = {
					rotate: 45 * ratioX,
					opacity: 1 - ratioY,
					blur: 15 * ratioY
				}
			},
			handleTouchEnd(e) {
				if (this.diffY === enterHeight) {
					this.$emit('enter')
				}
				this.moveInfo = null
				this.moving = false
				this.diffY = 0
				this.diffX = 0
				this.style = {
					opacity: 1,
					blur: 0,
					rotate: 0
				}
				this.bottomText = this.textList[0]
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	.open-screen {
		position: fixed;
		z-index: 90099;
		inset: 0;
		// background-color: rgba(0, 0, 0, 0.9);
		background-image: linear-gradient(-130deg, #212019, #3f1213, #150603);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 30% 20rpx 50rpx;
		color: #fff;

		.top-enter {
			transform: translateY(-150%);
			filter: blur(10px);
			opacity: 0.5;
			transition: all .5s;
		}

		.top {
			.avatar {
				width: 300rpx;
				height: 300rpx;
				border-radius: 50%;
				border: 10rpx solid #3f1213;
				box-shadow: 0 0 20rpx var(--subColor);
				animation: avatar 1s ease-in-out infinite;
			}

			@keyframes avatar {
				0% {
					box-shadow: 0 0 20rpx var(--subColor);
				}

				25% {
					box-shadow: 0 0 50rpx var(--subColor);
				}

				50% {
					box-shadow: 0 0 20rpx var(--subColor);
				}

				75% {
					box-shadow: 0 0 40rpx var(--subColor);
				}

				100% {
					box-shadow: 0 0 20rpx var(--subColor);
				}
			}

			.enter-btn {
				margin-top: 100rpx;
				letter-spacing: 10rpx;
				font-weight: bold;
				font-size: 36rpx;
				color: #000;
				background-color: #fff;
				padding: 20rpx;
				border-radius: 10rpx;
				animation: enterBtn 1s ease-in-out infinite;
			}
		}

		@keyframes enterBtn {
			0% {
				box-shadow: 0 0 0 10rpx #000, 0 0 0 15rpx #fff;
				transform: scale(1) rotate(1deg);
			}

			25% {
				transform: scale(1.02);
			}

			50% {
				box-shadow: 0 0 0 10rpx #000, 0 0 0 15rpx #fff;
				transform: scale(1);
			}

			75% {
				transform: scale(1.01);
			}

			100% {
				box-shadow: 0 0 0 10rpx #000, 0 0 0 15rpx #fff;
				transform: scale(1);
			}
		}

		.bottom {

			.bottom-icon {
				width: 80rpx;
				height: 80rpx;
			}
		}

		.avatar {}
	}
</style>