<template>
	<view class="">
		<view class="loading" v-if="show">
			<image :src="image" class="image"></image>
			<view class="text">
				{{text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Loading",
		props: {
			text: {
				type: String,
				default: '···加载中···'
			},
			image: {
				type: String,
				default: 'http://cdnpan.qiwo75.com/logo.jpg'
			}
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			open() {
				this.show = true
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.loading {
		position: fixed;
		z-index: 20009;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.9);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 2rpx solid #000;
			padding: 20rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			animation: animate1 5s linear infinite;
		}

		@keyframes animate1 {
			0% {
				transform: rotate(0deg);
			}

			25% {
				transform: rotate(-45deg);
			}

			50% {
				transform: rotate(0deg);
			}

			75% {
				transform: rotate(45deg);
			}

			100% {
				transform: rotate(0deg);
			}
		}
	}
</style>