import fetch from '@/lib/fetch.js'

export default {
	// 文章分页
	posts(params) {
		return fetch({
			url: 'apis/uc.api.content.halo.run/v1alpha1/posts',
			method: 'get',
			params
		});
	},
}