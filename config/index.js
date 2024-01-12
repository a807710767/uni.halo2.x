const info = {
	title: '栖卧',
	subTitle: '微躯敢高卧，借屋且幽栖',
	logo: 'http://cdnpan.qiwo75.com/halo/2024-01-02T15:04:10.585571197-eqdzltvx.jpg',
	mianColor: '#55AAFF',
	mianTextColor:'#fff'
	
}
const $halo = {
	info,
	categoriesMap: {},
	tagsMap: {}
}
uni.$halo = $halo
const install = (Vue) => {
	Vue.prototype.$halo = $halo
}
export default {
	install
}