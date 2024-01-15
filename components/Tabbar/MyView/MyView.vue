<template>
	<view class="my-view" :style="'--mainColor:' + $halo.info.mainColor">
		<u-navbar title="我的" placeholder :is-back="false" :border-bottom="false"
			:background="{background:$halo.info.mainColor}" :title-color="$halo.info.mainTextColor">
		</u-navbar>
		<scroll-view class="body" :style="'height: calc(100% - 46px - '+ $u.sys().statusBarHeight+'px);'" scroll-y
			:refresher-triggered="triggered" @refresherrefresh="handleRefresh" refresher-enabled
			:refresher-threshold="50" v-if="index === 'my'">
			<view class="top y ali-cen juc-cen" :style="'color:' + $halo.info.mainTextColor">
				<u-image :src="$halo.info.logo" width="150rpx" height="150rpx" shape="circle" class="logo mb10">
				</u-image>
				<view class="title mb10" v-if="$halo.info.title">
					{{$halo.info.title}}
				</view>
				<Typewriter class="sub-title mb10" v-if="$halo.info.subTitle" loop :text="$halo.info.subTitle"
					:speed="200" :cursor-text-color="$halo.info.mainTextColor">
				</Typewriter>
				<view class="desc" v-if="$halo.info.desc">
					{{$halo.info.desc}}
				</view>
			</view>
			<view class="x stats juc-around">
				<view class="y ali-cen post">
					<view>{{post}}</view>
					<view class="label">文章总数</view>
				</view>
				<view class="y ali-cen visit">
					<view>{{visit}}</view>
					<view class="label">访客数量</view>
				</view>
				<view class="y ali-cen category">
					<view>{{category}}</view>
					<view class="label">分类总数</view>
				</view>
			</view>
			<view class="y list">
				<view class="x item juc-bet" v-for="(item,index) in list" :key="index" @click="handleClick(index)">
					<u-icon :name="item.image" :label="item.title" margin-left="15rpx"></u-icon>
					<view class="x ali-cen">
						<text class="mr10" style="font-size: 24rpx;color: #999;">{{item.tips}}</text>
						<u-icon name="arrow-right" color="#777"></u-icon>
					</view>
				</view>
			</view>
			<view class="x juc-cen">
				©2023 - 2024 By {{$halo.info.title}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Typewriter from '@/components/Typewriter/Typewriter.vue'
	import LoadingView from '@/components/Loading/Loading.vue'
	import api from '@/api/index.js'
	export default {
		name: "MyView",
		props: {
			index: {
				type: String
			}
		},
		data() {
			return {
				triggered: true,
				category: '--',
				comment: '--',
				post: '--',
				upvote: '--',
				visit: '--',
				list: [{
					image: 'account-fill',
					title: '联系博主',
					tips: '博主社交平台'
				}, {
					image: 'account-fill',
					title: '在线客服',
					tips: '可以留言给我哟'
				}, {
					image: 'account-fill',
					title: '意见反馈',
					tips: '提交使用意见~不定期迭代'
				}, {
					image: 'account-fill',
					title: '关于项目',
					tips: '项目开源简介'
				}, {
					image: 'account-fill',
					title: '免责声明',
					tips: '博客内容的说明'
				}]
			};
		},
		components: {
			LoadingView,
			Typewriter
		},
		mounted() {
			this.getStats()
		},
		methods: {
			handleClick(index) {
				uni.navigateTo({
					url:'/pages/webView/webView?url=' + 'https://mp.weixin.qq.com/wxawap/wapreportwxadevlog?action=complain_feedback&appid=wxbddc360a262ff7b5&embeddedappid=&hostappid=&pageid=pages%2Findex%2Findex.html%3F&from=3&version_type=1&version_code=0&screenshot_localId=weixin%3A%2F%2Fresourceid%2Fda56b19d42698f06bd1589dbe0fa55dc&sessionid=hash=1532625981&ts=1705301577209&host=&version=671100216&device=2&business_appid=&msgid=&public_lib_version=1141&public_lib_version_str=3.3.1&template_id=#wechat_redirect'
				})
			},
			handleShow() {
				uni.setNavigationBarTitle({
					title: '我的'
				})
				console.log('onshow');
			},
			handleRefresh() {
				this.triggered = true
				this.getStats()
			},
			getStats() {
				return api.stats().then(res => {
					this.category = res.category // 分类
					this.comment = res.comment // 评论
					this.post = res.post //文章
					this.upvote = res.upvote // 点赞
					this.visit = res.visit // 访问
				}).finally(() => {
					this.triggered = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes turn {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.my-view {
		height: 100%;
		width: 100%;
		background-color: #eee;

		.body {
			width: 100%;
			overflow-y: auto;
			box-sizing: border-box;

			.top {
				width: 100%;
				background-color: #001220;
				// background-image: url('@/static/images/my-bg.png');
				background-size: 100% 100%;
				padding: 30rpx 20rpx;
				position: relative;
				z-index: 10;
				overflow: hidden;
				backdrop-filter: blur(5rpx);

				&::after {
					content: ' ';
					z-index: -1;
					position: absolute;
					width: 400rpx;
					height: 420rpx;
					top: -230rpx;
					left: -180rpx;
					border-radius: 43% 30% 55% 42%;
					background-color: var(--mainColor);
					animation: turn 10s linear infinite;
				}

				&::before {
					content: ' ';
					z-index: -1;
					position: absolute;
					width: 500rpx;
					height: 400rpx;
					bottom: -200rpx;
					right: -200rpx;
					border-radius: 50% 40% 55% 42%;
					background-color: var(--mainColor);
					animation: turn 8s linear infinite;
				}

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

				.desc {
					font-size: 28rpx;
					white-space: pre;
					text-align: center;
				}
			}

			.stats {
				padding: 20rpx 0;
				background-color: #fff;
				font-size: 28rpx;
				color: var(--mainColor);
				font-weight: bold;

				.category {
					flex: 1;
				}

				.post {
					flex: 1;
				}

				.visit {
					border-left: #ddd solid 1px;
					border-right: #ddd solid 1px;
					flex: 1;
				}

				.label {
					color: #777;
					font-size: 26rpx;
					font-weight: normal;
				}
			}

			.list {
				background-color: #fff;
				margin: 30rpx 10rpx;
				border-radius: 8px;

				.item {
					padding: 10rpx;
					margin: 10rpx;
					border-bottom: 1px #eee solid;

					&:last-child {
						border: none;
					}
				}

			}
		}
	}
</style>