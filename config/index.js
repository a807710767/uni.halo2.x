const info = {
	title: '栖卧',
	subTitle: '微躯敢高卧，借屋且幽栖',
	desc: '一个分享技术，人生感悟的个人博客\n生活不止眼前的苟且，还有更多未知的苟且',
	logo: 'http://cdnpan.qiwo75.com/halo/2024-01-02T15:04:10.585571197-eqdzltvx.jpg',
	avatar: 'http://cdnpan.qiwo75.com/halo/2024-01-15T21:22:02.449567067-nfumilgm.png',
	mainColor: '#2979FF',
	mainTextColor: '#fff',
	layout: 'row'
}
const otherPlatforms = [{
	name: '微博',
	url: 'https://m.weibo.cn/u/2449565780',
	icon: 'weibo-circle-fill' //uview的icon 可以网络图片
}, {
	name: '知乎',
	url: 'https://www.zhihu.com/people/qi-wo-42-89',
	icon: 'zhihu-circle-fill' //uview的icon 可以网络图片
}, {
	name: '掘金',
	url: 'https://www.zhihu.com/people/qi-wo-42-89',
	icon: 'zhihu-circle-fill' //uview的icon 可以网络图片
}]
const disclaimers = [
	'本博客主要是为了记录工作、学习中遇到的问题，可能由于本人技术有限，内容难免有纰漏，一切内容仅供参考。',
	'本博客中转载文章会写明来源，感谢原作者的辛苦写作，如果有异议，及时联系我处理，谢谢！',
	'本人博客所有文章纯属学习之用，不涉及商业利益。如有不合适引用，请私信我删除！',
	'本人不保证文章中的内容完全正确。',
	'对于其中的错误之处，欢迎网友积极指出，本人一定听取意见并进行合理改正。'
]
const $halo = {
	info,
	otherPlatforms,
	disclaimers,
	categoriesMap: {},
	tagsMap: {},
}
uni.$halo = $halo

import api from '@/api/index.js'
const install = async (Vue) => {

	Vue.prototype.$halo = $halo
}
export default {
	install
}