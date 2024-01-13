<template>
	<view>
		<web-view :src="this.url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		methods: {

		},
		onLoad(op) {
			this.url = op.url
			console.log(this.url)
		}
	}
</script>

<style>

</style>