<template>
	<scroll-view class="index-view" scroll-y :refresher-triggered="triggered" @refresherrefresh="handleRefresh"
		refresher-enabled :refresher-threshold="50">

	</scroll-view>
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
	.links-view {}
</style>