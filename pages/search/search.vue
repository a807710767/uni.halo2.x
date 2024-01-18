<template>
	<view>
		<u-navbar placeholder :border-bottom="false" :background="{background:$halo.info.mainColor}"
			:title-color="$halo.info.mainTextColor" :back-icon-color="$halo.info.mainTextColor">
			<view>
				<u-search v-model="keyword" :show-action="true" action-text="搜索" :action-style="{
					color:'#fff'
				}" @search="handleSearch" @custom="handleSearch" maxlength="15" :focus="focus"></u-search>
			</view>
		</u-navbar>
		<!-- <view class="p10">
			<u-search v-model="keyword" :show-action="true" action-text="搜索" :animation="true" @search="handleSearch"
				@custom="handleSearch" maxlength="15"></u-search>
		</view> -->
		<view class="y p10">
			<view class="title">
				历史搜索：
			</view>
			<view class="x" style="flex-wrap: wrap;">
				<u-tag :text="item" mode="light" v-for="(item,index) in historyList" class="tag" closeable
					@click="handleClick(item)" @close="handleClose(index)" :key="index" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				historyList: [],
				focus: false
			}
		},
		methods: {
			handleClick(item) {
				this.keyword = item
				this.handleSearch()
			},
			handleClose(index) {
				uni.showModal({
					content: '确认删除吗？',
					success: (res) => {
						if (res.confirm) {
							this.historyList.splice(index, 1)
							uni.setStorageSync('history', this.historyList)
						}
					}
				})
			},
			handleSearch() {
				if (this.$u.test.isEmpty(this.keyword)) {
					return
				}
				let list = uni.getStorageSync('history') || []
				if (list && list.length) {
					const hasIndex = list.indexOf(this.keyword)
					if (hasIndex === -1) {
						list.unshift(this.keyword)
						list = list.slice(-15);
					} else {
						list.splice(hasIndex, 1);
						list.unshift(this.keyword);
					}
				} else {
					list.unshift(this.keyword)
				}
				this.historyList = list
				uni.setStorageSync('history', list)
				this.handleGoList()
			},
			handleGoList() {
				uni.navigateTo({
					url: '/pages/searchKeyword/searchKeyword?keyword=' + this.keyword
				})
			},
		},
		onShow() {
			this.historyList = uni.getStorageSync('history') || []
			this.focus = true
		}
	}
</script>

<style lang="scss" scoped>
	.tag {
		flex-shrink: 0;
		margin-top: 20rpx;
		margin-right: 20rpx;
	}
</style>