<template>
	<view class="links-view">
		<scroll-view class="links-view" scroll-y :refresher-triggered="triggered" @refresherrefresh="handleRefresh"
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
			onShow() {
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
	}
</style>