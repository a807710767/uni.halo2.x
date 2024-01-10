<template>
	<view class="index">
		<IndexView v-if="index === 'index'"></IndexView>
		<u-tabbar :value="index" @change="changeTab">
			<u-tabbar-item text="首页" name="index" icon="home-fill" @click="click"></u-tabbar-item>
			<u-tabbar-item text="动态" name="shared" icon="moments" @click="click"></u-tabbar-item>
			<u-tabbar-item text="友链" name="links" icon="share-fill" @click="click"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" icon="account-fill" @click="click"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import IndexView from '@/components/IndexView/IndexView.vue'
	export default {
		data() {
			return {
				index: 'index'
			}
		},
		components: {
			IndexView
		},
		methods: {
			changeTab(e) {
				console.log(e);
			},
			click(e) {
				this.index = e
				console.log(e);
			}
		}
	}
</script>

<style>
	.index {
		height: 100%;
		width: 100%;
	}
</style>