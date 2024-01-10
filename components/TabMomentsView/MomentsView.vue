<template>
	<scroll-view class="moments-view">
		
	</scroll-view>
</template>

<script>
	import LoadingView from '../Loading/Loading.vue'
	export default {
		name:"MomentsView",
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
.moments-view{
	
}
</style>