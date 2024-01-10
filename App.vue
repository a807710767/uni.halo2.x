<script>
	import api from '@/api/login.js'
	import storage from '@/lib/storage.js'
	export default {

		onLaunch: function() {

			const updateManager = uni.getUpdateManager()
			updateManager.onCheckForUpdate(function(res) {

				// 请求完新版本信息的回调
				if (!res.hasUpdate) {

				}

			})
			// 下载新版本
			updateManager.onUpdateReady(function() {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 重启应用
							updateManager.applyUpdate()
						}
					}
				})
			})
			// 新版本下载失败
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '已经有新版本了哟~',
					content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
				})

			})
		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import 'uview-ui/index.scss';

	page {
		width: 100%;
		height: 100%;
		color: #000;
	}
</style>