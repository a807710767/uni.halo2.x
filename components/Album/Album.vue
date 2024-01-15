<template>
	<view class="album">
		<view class="" v-if="value && value.length">
			<view class="" v-if="value.length === 1">
				<u-image :src="item[keyName]" v-for="(item, index) in value" :key="index" width="500rpx" height="500rpx"
					@click="handlePreview(index)" class="mr10 mt10"></u-image>
			</view>
			<view class="x" style="flex-wrap: wrap;" v-else-if="value.length === 4 || value.length === 2">
				<u-image :src="item[keyName]" v-for="(item, index) in value" :key="index" width="240rpx" height="240rpx"
					@click="handlePreview(index)" class="mr10 mt10"></u-image>
			</view>
			<view class="x" style="flex-wrap: wrap;" v-else>
				<u-image :src="item[keyName]" v-for="(item, index) in value" :key="index" width="160rpx" height="160rpx"
					@click="handlePreview(index)" class="mr10 mt10"></u-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Album",
		props: {
			value: {
				type: Array,
				default: []
			},
			keyName: {
				type: String,
				default: 'url'
			}
		},
		computed: {
			urls() {
				if (this.value && this.value.length) {
					const list = this.value.map(item => item[this.keyName])
					return list
				} else {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handlePreview(index) {
				uni.previewImage({
					urls: this.urls,
					current: index,
					showmenu: true
				})
			}
		}
	}
</script>

<style lang="scss">
	.album {
		width: 510rpx;
	}
</style>