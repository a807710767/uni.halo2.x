<template>
	<scroll-view class="links-view">
		
	</scroll-view>
</template>

<script>
	import LoadingView from '../Loading/Loading.vue'
	export default {
		name:"LinksView",
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
.links-view{
	
}
</style>