<template>
	<scroll-view class="my-view">
		<u-navbar title="我的" fixed placeholder leftIcon=" " :bgColor="$halo.info.mianColor"
			:titleStyle="{color:$halo.info.mianTextColor}">
		</u-navbar>
		<scroll-view class="body" :style="'height: calc(100% - 46px - '+ $u.sys().statusBarHeight+'px);'" scroll-y
			:refresher-triggered="triggered" @refresherrefresh="handleRefresh" refresher-enabled
			:refresher-threshold="50" v-if="index === 'links'">

		</scroll-view>
	</scroll-view>
</template>

<script>
	import LoadingView from '../Loading/Loading.vue'
	export default {
		name: "MyView",
		props: {
			index: {
				type: String
			}
		},
		data() {
			return {

			};
		},
		components: {
			LoadingView
		},
		methods: {
			handleShow() {
				uni.setNavigationBarTitle({
					title: '我的'
				})
				console.log('onshow');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-view {
		height: 100%;
		width: 100%;

		.body {
			width: 100%;
			overflow-y: auto;
			box-sizing: border-box;
		}
	}
</style>