<template>
	<view>
		<movable-area class="movable-area" :scale-area="false">
			<movable-view class="movable-view" :class="!isRemove?'animation-info':''" style="pointer-events: auto;"
				@touchstart="touchstart" @touchend="touchend" @change="onChange" direction="all" inertia="true" :x="x"
				:y="y" :disabled="disabled" :out-of-bounds="true" :damping="200" :friction="100">
				<view @click="clickBtn">
					<template v-if="btnObj.name">{{btnObj.name}}</template>
					<u-icon name="list" size="40" v-else></u-icon>
				</view>
				<view v-if="showBtn" v-for="(item,index) in btnObj.childs" :key="index" @click="click(item)"
					class="item-main"
					:class="!isLeft?'item-main'+(index+1)+' toOut'+(index+1):'item-main1'+(index+1)+' toOut1'+(index+1)">
					{{item.name}}
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		props: {
			//菜单数据源
			btnObj: {
				type: Object,
				default: {}
			},
			//是否禁用拖动
			disabled: {
				type: Boolean,
				default: false
			},
			bottom: {
				type: Number,
				default: 150
			},
			right: {
				type: Number,
				default: 40
			},
		},
		data() {
			return {
				left: 0,
				top: 0,
				isRemove: true,
				windowWidth: 0,
				windowHeight: 0,
				btnWidth: 0,
				btnHeight: 0,
				x: 10000,
				y: 10000,
				old: {
					x: 0,
					y: 0
				},
				showBtn: false,
				isLeft: false,
			};
		},
		mounted() {
			this.$nextTick(res => {
				this.getSysInfo()
			})
		},
		methods: {
			getSysInfo() {
				let sysInfo = uni.getSystemInfoSync()
				this.windowWidth = sysInfo.windowWidth
				this.windowHeight = sysInfo.windowHeight
				this.createSelectorQuery().select('.movable-view').boundingClientRect(rect => {
					this.btnWidth = rect.width
					this.btnHeight = rect.height
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(res => {
						this.x = this.windowWidth - this.btnWidth - uni.upx2px(this.right)
						this.y = this.windowHeight - this.btnHeight - uni.upx2px(this.bottom)
						console.log('x,y', this.x, this.y)
					})
				}).exec()
			},
			//移动按钮
			onChange(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			//开始移动
			touchstart(e) {
				this.isRemove = true
			},
			//结束移动
			touchend(e) {
				if (!this.disabled && this.old.x) {
					this.x = this.old.x
					this.y = this.old.y
					let bWidth = (this.windowWidth - this.btnWidth) / 2
					if (this.x < 0 || (this.x > 0 && this.x <= bWidth)) {
						this.$nextTick(res => {
							this.x = uni.upx2px(this.right)
							this.isLeft = true
						})
					} else {
						this.$nextTick(res => {
							this.x = this.windowWidth - this.btnWidth - uni.upx2px(this.right)
							this.isLeft = false
						})
					}
					this.isRemove = false
				}
			},
			clickBtn() {
				this.showBtn = !this.showBtn
			},
			//点击菜单
			click(item) {
				this.$emit('click', item)
			}
		}
	};
</script>

<style scoped>
	.movable-view {
		width: 80rpx;
		height: 80rpx;
		background: #2979FF;
		box-shadow: 0px 4rpx 12rpx 0px #ADC3F8;
		border-radius: 50rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.item-main {
		width: 90rpx;
		height: 90rpx;
		background: linear-gradient(120deg, #6EA8FF, #287BF8);
		box-shadow: 0px 4rpx 12rpx 0px #ADC3F8;
		border-radius: 50rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
	}

	.item-main1 {
		left: -20rpx;
		top: -105rpx;
	}

	.item-main2 {
		left: -105rpx;
		top: -40rpx;
	}

	.item-main3 {
		left: -90rpx;
		top: 65rpx;
	}

	.toOut1 {
		animation: toOut1 0.3s;
	}

	.toOut2 {
		animation: toOut2 0.3s;
	}

	.toOut3 {
		animation: toOut3 0.3s;
	}

	.item-main11 {
		right: -20rpx;
		top: -105rpx;
	}

	.item-main12 {
		right: -105rpx;
		top: -40rpx;
	}

	.item-main13 {
		right: -90rpx;
		top: 65rpx;
	}

	.toOut11 {
		animation: toOut11 0.3s;
	}

	.toOut12 {
		animation: toOut12 0.3s;
	}

	.toOut13 {
		animation: toOut13 0.3s;
	}

	@keyframes toOut1 {
		0% {
			transform: scale(0);
			transform-origin: bottom right;
		}

		100% {
			transform: scale(1);
			transform-origin: top left;
		}
	}

	@keyframes toOut2 {
		0% {
			transform: scale(0);
			transform-origin: center right;
		}

		100% {
			transform: scale(1);
			transform-origin: center left;
		}
	}

	@keyframes toOut3 {
		0% {
			transform: scale(0);
			transform-origin: top right;
		}

		100% {
			transform: scale(1);
			transform-origin: bottom left;
		}
	}

	@keyframes toOut11 {
		0% {
			transform: scale(0);
			transform-origin: bottom left;
		}

		100% {
			transform: scale(1);
			transform-origin: top right;
		}
	}

	@keyframes toOut12 {
		0% {
			transform: scale(0);
			transform-origin: center left;
		}

		100% {
			transform: scale(1);
			transform-origin: center right;
		}
	}

	@keyframes toOut13 {
		0% {
			transform: scale(0);
			transform-origin: top left;
		}

		100% {
			transform: scale(1);
			transform-origin: bottom right;
		}
	}

	.animation-info {
		transition: left .25s ease;
	}

	.movable-area {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999999 !important;
		pointer-events: none;
	}
</style>