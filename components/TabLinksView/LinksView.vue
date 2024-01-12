<template>
	<view class="links-view">
		<u-navbar title="友链" fixed placeholder leftIcon=" " :bgColor="$halo.info.mianColor"
			:titleStyle="{color:$halo.info.mianTextColor}">
		</u-navbar>
		<scroll-view class="body" :style="'height: calc(100% - 46px - '+ $u.sys().statusBarHeight+'px);'"  scroll-y :refresher-triggered="triggered" @refresherrefresh="handleRefresh"
			refresher-enabled :refresher-threshold="50" v-if="index === 'links'">

		</scroll-view>
	</view>
</template>

<script>
	import LoadingView from '../Loading/Loading.vue'
	import api from '@/api/index.js'
	export default {
		name: "LinksView",
		props: {
			index: {
				type: String
			}
		},
		data() {
			return {
				triggered: true
			};
		},
		components: {
			LoadingView
		},
		methods: {
			async init() {
				await this.getLinks()
				this.triggered = false
			},
			handleShow() {
				uni.setNavigationBarTitle({
					title: '友链'
				})
				console.log('onshow');
			},
			handleRefresh() {
				this.page = 1
				this.triggered = true
				this.init()
			},
			getLinks() {
				api.links().then(res => {
					console.log('links', res);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.links-view {
		height: 100%;
		width: 100%;
		.body{
			width: 100%;
			overflow-y: auto;
			box-sizing: border-box;
		}
	}
</style>