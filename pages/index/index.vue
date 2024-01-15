<template>
	<view class="index">
		<view :style="'height: calc(100% - 51px - ' + $u.sys().safeAreaInsets.bottom +'px);'">
			<IndexView v-if="index === 0" index="index" ref="index"></IndexView>
			<MomentsView v-if="index === 1" index="moments" ref="moments"></MomentsView>
			<LinksView v-if="index === 2" index="links" ref="links"></LinksView>
			<MyView v-if="index === 3" index="my" ref="my"></MyView>
		</view>
		<u-tabbar v-model="index" :list="list" @change="changeTab" :bg-color="$halo.info.mainColor"
			:active-color="$halo.info.mainTextColor" :inactive-color="$halo.info.mainTextColor" :border-top="false">
		</u-tabbar>
	</view>
</template>

<script>
	import IndexView from '@/components/Tabbar/IndexView/IndexView.vue';
	import MomentsView from '@/components/Tabbar/MomentsView/MomentsView.vue';
	import LinksView from '@/components/Tabbar/LinksView/LinksView.vue';
	import MyView from '@/components/Tabbar/MyView/MyView.vue';
	export default {
		data() {
			return {
				index: 1,
				list: [{
					iconPath: 'home',
					selectedIconPath: "home",
					text: '首页',
				}, {
					iconPath: 'moments',
					selectedIconPath: "moments",
					text: '朋友圈',
				}, {
					iconPath: 'attach',
					selectedIconPath: "attach",
					text: '友链',
				}, {
					iconPath: 'account-fill',
					selectedIconPath: "account-fill",
					text: '我的',
				}]
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
				console.log(this.$u.sys().safeAreaInsets);
			},
			click(e) {
				this.index = e;
				console.log(this.$refs[e]);
				this.$refs[e].handleShow()
			}
		}
	};
</script>

<style>
	.index {
		height: 100%;
		width: 100%;
		/* background-color: #eee; */
	}
</style>
