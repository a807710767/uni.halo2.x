<template>
	<view class="index">
		<view style="height: calc(100% - 51px);">
			<IndexView v-show="index === 'index'" index="index" ref="index"></IndexView>
			<MomentsView v-show="index === 'moments'" index="moments" ref="moments"></MomentsView>
			<LinksView v-show="index === 'links'" index="links" ref="links"></LinksView>
			<MyView v-show="index === 'my'" index="my" ref="my"></MyView>
		</view>
		<u-tabbar :value="index" @change="changeTab">
			<u-tabbar-item text="首页" name="index" icon="home-fill" @click="click"></u-tabbar-item>
			<u-tabbar-item text="动态" name="moments" icon="moments" @click="click"></u-tabbar-item>
			<u-tabbar-item text="友链" name="links" icon="share-fill" @click="click"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" icon="account-fill" @click="click"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import IndexView from '@/components/TabIndexView/IndexView.vue';
	import MomentsView from '@/components/TabMomentsView/MomentsView.vue';
	import LinksView from '@/components/TabLinksView/LinksView.vue';
	import MyView from '@/components/TabMyView/MyView.vue';
	export default {
		data() {
			return {
				index: 'index'
			};
		},
		components: {
			IndexView,
			MomentsView,
			LinksView,
			MyView
		},
		methods: {
			changeTab(e) {
				console.log(e);
			},
			click(e) {
				this.index = e;
				console.log(e);
			}
		}
	};
</script>

<style>
	.index {
		height: 100%;
		width: 100%;
	}
</style>