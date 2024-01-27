import fetch from '@/lib/fetch.js'
// 前台
export default {
	search(params) {
		return fetch({
			url: '/apis/api.halo.run/v1alpha1/indices/post',
			method: 'get',
			params
		});
	},
	pages(params) {
		return fetch({
			url: '/apis/api.content.halo.run/v1alpha1/posts',
			method: 'get',
			params
		});
	},
	details(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/posts/${params.name}`,
			method: 'get',
			params
		});
	},
	navigation(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/posts/${params.name}/navigation`,
			method: 'get',
			params
		});
	},
	mainMenu(params) {
		return fetch({
			url: `/apis/api.halo.run/v1alpha1/menus/-`,
			method: 'get',
			params
		});
	},
	menus(params) {
		return fetch({
			url: `/apis/api.halo.run/v1alpha1/menus/${params.name}`,
			method: 'get',
			params
		});
	},
	stats(params) {
		return fetch({
			url: `/apis/api.halo.run/v1alpha1/stats/-`,
			method: 'get',
			params
		});
	},
	moments(params) {
		return fetch({
			url: `/apis/api.plugin.halo.run/v1alpha1/plugins/PluginMoments/moments`,
			method: 'get',
			params
		});
	},
	links(params) {
		return fetch({
			url: `/apis/api.plugin.halo.run/v1alpha1/plugins/PluginLinks/links`,
			method: 'get',
			params
		});
	},
	categories(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/categories`,
			method: 'get',
			params
		});
	},
	categoryByName(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/categories/${params.name}`,
			method: 'get',
			params
		});
	},
	categoryPosts(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/categories/${params.name}/posts`,
			method: 'get',
			params
		})
	},
	tags(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/tags`,
			method: 'get',
			params
		});
	},
	tagsByName(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/tags/${params.name}`,
			method: 'get',
			params
		});
	},
	tagsPosts(params) {
		return fetch({
			url: `/apis/api.content.halo.run/v1alpha1/tags/${params.name}/posts`,
			method: 'get',
			params
		});
	},
	counter(params) {
		return fetch({
			url: `/apis/api.halo.run/v1alpha1/trackers/counter`,
			method: 'post',
			params
		});
	},
	getQrCode(params) {
		return fetch({
			url: `/wechat/apis/wx/getQrCode`,
			method: 'get',
			responseType: 'arraybuffer',
			params
		});
	},
}
