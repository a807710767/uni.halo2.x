const info = {
	domain: 'https://qiwo75.com',
	title: '栖卧',
	subTitle: '微躯敢高卧，借屋且幽栖',
	desc: '一个分享技术，人生感悟的个人博客\n生活不止眼前的苟且，还有更多未知的苟且',
	logo: 'http://cdnpan.qiwo75.com/halo/2024-01-02T15:04:10.585571197-eqdzltvx.jpg',
	avatar: 'http://cdnpan.qiwo75.com/halo/2024-01-15T21:22:02.449567067-nfumilgm.png',
	mainColor: '#2979FF',
	subColor: '#643dff',
	mainTextColor: '#fff',
	layout: 'col', // row col 文章布局
	openScreenIntro: true,
	openAppPopup: true,
	beian: '琼ICP备19001419号-2',
	userToken: 'pat_eyJraWQiOiJ4ZGllNUNaMUFHb2JBZVBCN0pWdW5GOHVDTDJqVE5JX3JUYm5ySkRpQzJNIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjIwNzUiLCJzdWIiOiJxaXdvNzc4IiwiaWF0IjoxNzIwNTEwMDQ1LCJqdGkiOiJjYTY5ZDhlZi02YjY1LTlkNzgtNTc3Zi0zN2I4NTgzZjVlYzYiLCJwYXRfbmFtZSI6InBhdC1xaXdvNzc4LU12cXNFIn0.nXeEb2v6xrsjwrIGf5eX3KRxcLOyWhLPoZdyquL2K0kr6ompTarmQUpISoyR2ArwcZyd7_fZJ2MxtMhtg2M3GhWumC94wNjfOzN6L8n2QJMSrE2Ft-8HIH10AM1DS0b0wULf5vqM2cIKUEn2HiD5qT7JYQosVjZCEW5goOxJW5CXHZOaGN04F81yZmFibEPxkorDacEASYRLiIMpnTbJUJRC3VPJrase2C1QpucxIHfV2vHFj0nmP4oLmGXa7kMSkFLZhp15Lk1ABy80YTUPwxxzvbC5l4-mLyzaVEwvHW9vatxcEFDpDailjppxhRc54ItW9_gXDAHS4WMbux2Ux5sVsz4m0uFyXmU0q9sjKlCZc7h9IW0-OeHhsfQlUNKnq-Yufx9tjXCF4b0vy6vpe9CU-mq2LXTQ6AG92XjR0Sp3YgXoXDXL7UrIe1tPfur1ldwjaI09sUd2eSiSr5-b36y7kjKaxVq3ZRXMMIGs0IQsZ-JeOPyWCHaMVoRjK9CV_k3Zkn3_3DM3xvQUJ0IIE4tiBTKhazj4bXh8kqUcF3k8GWkQcWo7p7hHwy820Ie6zlbh4aPjad6iUASpkWfSWUEq6wRS0KE-UYX26q8JktV3Pi_g2B7B8WZelqjkSOCeK_mIGQQupd0xhMu3Hf9MhRjzOJ1NuM1KWWf_gyzZ3m0'
}
const otherPlatforms = [{
	name: 'QQ号',
	url: '807710767',
	icon: 'qq-circle-fill'
}, {
	name: '微信号',
	url: 'qiwo778',
	icon: 'weixin-circle-fill'
},{
	name: '小红书',
	url: '栖卧',
	icon: '/static/imgs/redbook.png'
}, {
	name: '微博地址',
	url: 'https://m.weibo.cn/u/2449565780',
	icon: 'weibo-circle-fill'
}, {
	name: '知乎地址',
	url: 'https://www.zhihu.com/people/qi-wo-42-89',
	icon: 'zhihu-circle-fill'
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
export default {
	$halo
}