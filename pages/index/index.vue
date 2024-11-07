<template>
	<view class="index" :style="'--subColor: ' + $halo.info.subColor+ ';--mainColor: ' + $halo.info.mainColor">
		<view :style="'height: calc(100% - 51px - ' + $u.sys().safeAreaInsets.bottom +'px);'">
			<IndexView v-show="index === 0" index="index" ref="index"></IndexView>
			<MomentsView v-show="index === 1" index="moments" ref="moments"></MomentsView>
			<LinksView v-show="index === 2" index="links" ref="links"></LinksView>
			<MyView v-show="index === 3" index="my" ref="my"></MyView>
			<OpenScreenView v-if="openScreenIntro" @enter="handleEnter"></OpenScreenView>
		</view>
		<u-popup mode="center" v-model="openAppPopup" :mask-close-able="false" border-radius="40">
			<view class="disclaimers-popup y ali-cen">
				<Disclaimers></Disclaimers>
				<view class="x juc-around mt10" style="width: 100%;">
					<view class="disclaimers-popup-btn-info" @click="handleCloseApp">拒绝</view>
					<view class="disclaimers-popup-btn" @click="handleCloseAppPopup">我已知晓</view>
				</view>
			</view>
		</u-popup>
		<u-tabbar v-model="index" :list="list" @change="changeTab" style="filter: drop-shadow(0px -2rpx 3rpx #2979ff44);" :active-color="$halo.info.mainColor" bg-color="#fff" :border-top="false">
		</u-tabbar>
	</view>
</template>

<script>
	import IndexView from '@/components/Tabbar/IndexView/IndexView.vue';
	import MomentsView from '@/components/Tabbar/MomentsView/MomentsView.vue';
	import LinksView from '@/components/Tabbar/LinksView/LinksView.vue';
	import MyView from '@/components/Tabbar/MyView/MyView.vue';
	import DisclaimersView from '@/components/Disclaimers/Disclaimers'
	import OpenScreenView from '@/components/OpenScreen/OpenScreen.vue';
	import api from '@/api/index.js'
	export default {
		data() {
			return {
				openScreenIntro: false,
				openAppPopup: false,
				index: 0,
				list: [{
					iconPath: 'home',
					selectedIconPath: "home",
					text: '首页',
					name: 'index'
				}, {
					iconPath: 'moments',
					selectedIconPath: "moments",
					text: '朋友圈',
					name: 'moments'
				}, {
					iconPath: 'attach',
					selectedIconPath: "attach",
					text: '友链',
					name: 'links'
				}, {
					iconPath: 'account-fill',
					selectedIconPath: "account-fill",
					text: '我的',
					name: 'my'
				}]
			};
		},
		components: {
			IndexView,
			MomentsView,
			LinksView,
			MyView,
			OpenScreenView
		},
		onLoad() {
			// 	this.counter()
			if (this.$halo.info.openAppPopup) {
				this.openAppPopup = true
			}
			if (this.$halo.info.openScreenIntro) {
				this.openScreenIntro = true
			} else {
				this.changeTab(this.index)
			}
		},
		methods: {
			handleCloseApp() {
				uni.exitMiniProgram()
			},
			handleCloseAppPopup() {
				this.openAppPopup = false
			},
			handleEnter() {
				this.openScreenIntro = false
				this.changeTab(this.index)
			},
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

<style lang="scss">
	.index {
		height: 100%;
		width: 100%;

		/* background-color: #eee; */
		.disclaimers-popup {
			width: 600rpx;
			padding: 20rpx;

			.disclaimers-popup-btn {
				background-color: var(--mainColor);
				color: #fff;
				border-radius: 50rpx;
				padding: 12rpx;
				width: 200rpx;
				font-size: 34rpx;
				text-align: center;
			}

			.disclaimers-popup-btn-info {
				background-color: #fff;
				border: 1rpx solid var(--mainColor);
				color: var(--mainColor);
				border-radius: 50rpx;
				padding: 12rpx;
				width: 200rpx;
				font-size: 34rpx;
				text-align: center;
			}
		}
	}
</style>