<template>
	<view>
		<view class="x">
			<view class="y">
				<view class="" v-for="(item,index) in categories">
					{{item.name}}
				</view>
			</view>
			<view class="">

			</view>
		</view>
		<LoadingView ref="LoadingView"></LoadingView>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	import LoadingView from '@/components/Loading/Loading.vue'
	export default {
		data() {
			return {
				name: '',
				list: [],
				categories: []
			};
		},
		components: {
			LoadingView
		},
		methods: {
			getList() {
				this.$refs.LoadingView.open()
				if (this.name === 'all') {
					// api.
				} else {
					api.categoryPosts({
						name: this.name
					}).then(res => {
						console.log(res)
						this.list = res
					}).finally(() => {
						this.$refs.LoadingView.close()
						uni.stopPullDownRefresh()
					})
				}
			},
			getCategory() {
				return api.categories().then(res => {
					this.categories = res.items.map(item => {
						return {
							metadata: item.metadata.name,
							name: item.spec.displayName,
							cover: item.spec.cover,
						}
					})
				})
			}
		},
		async onPullDownRefresh() {
			uni.startPullDownRefresh();
			await this.getCategory()
			this.getList()
		},
		mounted() {
			if (this.name) {
				this.getList()
			}
		},
		onLoad(op) {
			this.name = op.name
			if (!this.name) {
				uni.showModal({
					content: '参数异常',
					showCancel: false,
					success() {
						uni.navigateBack()
					}
				})
				return
			}
			this.getCategory()
		}
	}
</script>

<style lang="scss">

</style>