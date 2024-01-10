<template>
	<scroll-view class="my-view">
		
	</scroll-view>
</template>

<script>
	import LoadingView from '../Loading/Loading.vue'
	export default {
		name:"MyView",
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
			onShow() {
				console.log('onshow');
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-view{
	
}
</style>