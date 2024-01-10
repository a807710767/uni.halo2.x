import fetch from '@/lib/fetch.js'

export default {
	login(data) {
		return fetch({
			url: '/user/loginByCode',
			method: 'get',
			params: {
				code: data
			},
		});
	},
}
