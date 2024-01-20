<template>
	<view class="index">
		<view :style="'height: calc(100% - 51px - ' + $u.sys().safeAreaInsets.bottom +'px);'">
			<IndexView v-show="index === 0" index="index" ref="index"></IndexView>
			<MomentsView v-show="index === 1" index="moments" ref="moments"></MomentsView>
			<LinksView v-show="index === 2" index="links" ref="links"></LinksView>
			<MyView v-show="index === 3" index="my" ref="my"></MyView>
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
	import api from '@/api/index.js'
	export default {
		data() {
			return {
				index: 3,
				list: [{
					iconPath: 'home',
					selectedIconPath: "home",
					text: '首页',
					name:'index'
				}, {
					iconPath: 'moments',
					selectedIconPath: "moments",
					text: '朋友圈',
					name:'moments'
				}, {
					iconPath: 'attach',
					selectedIconPath: "attach",
					text: '友链',
					name:'links'
				}, {
					iconPath: 'account-fill',
					selectedIconPath: "account-fill",
					text: '我的',
					name:'my'
				}]
			};
		},
		components: {
			IndexView,
			MomentsView,
			LinksView,
			MyView
		},
		// onLoad() {
		// 	this.counter()
		// },
		methods: {
			counter() {
				api.counter()
			},
			changeTab(e) {
				console.log(e, this.$u.sys().safeAreaInsets);
				const name = this.list[e].name
				console.log(this.$refs[name]);
				this.$refs[name].handleShow()
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
