<template>
	<view>
		<canvas canvas-id="myCanvas" style="width: 690px;height:900px; position: fixed;top: -11000px;"></canvas>
	</view>
</template>

<script>
	export default {
		name: "Poster",
		data() {
			return {
				ratio: 1,
				canvasToTempFilePath: '',
				showShareImg: false
			};
		},
		methods: {
			replaceHttps(url){
				return url.indexOf('http:') > -1 ? url.replace(/^http:/, 'https:') : url
			},
			drag(option) {
				return new Promise((resolve, reject) => {
					let qrCode = this.downloadFileImg(option.qrCodeUrl);
					let cover = this.downloadFileImg(this.replaceHttps(option.cover));
					let headImg = this.downloadFileImg(this.replaceHttps(option.headImg));
					Promise.all([qrCode, cover, headImg]).then(result => {
						console.log(option)
						const ctx = uni.createCanvasContext('myCanvas', this);
						let canvasWidthPx = 690 * this.ratio,
							canvasHeightPx = 900 * this.ratio,
							paddingLeft = 40,

							// 头像参数
							avatarUrlWidth = 90,
							avatarUrlHeigth = 90,
							avatarUrlY = 28,
							// 名字参数
							nameSize = 44,
							nameX = paddingLeft + avatarUrlWidth + 20,
							nameY = avatarUrlY + (avatarUrlHeigth / 2) + (nameSize / 2) - 5,

							lineOneY = avatarUrlY + avatarUrlHeigth + 20,

							// 文章封面
							coverUrlWidth = 610,
							coverUrlHeigth = 420,
							coverUrlY = lineOneY + 20,
							// 文章标题
							titleSize = 40,
							titleY = coverUrlY + coverUrlHeigth + 10,

							lineTwoY = titleSize * 2 + titleY + 20,

							codeUrlWidth = 180,
							codeUrlHeigth = 180,
							codeUrlY = lineTwoY + 20;

						// 渐变背景
						const grd = ctx.createLinearGradient(0, 0, canvasWidthPx, canvasWidthPx)
						grd.addColorStop(0, option.mainColor)
						grd.addColorStop(0.8, option.subColor)
						ctx.fillStyle = grd;
						ctx.fillRect(0, 0, canvasWidthPx, canvasHeightPx)


						// 头像
						ctx.save(); // 先保存状态 已便于画完圆再用
						ctx.beginPath(); //开始绘制
						//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
						ctx.arc(avatarUrlWidth / 2 + paddingLeft, avatarUrlHeigth / 2 + avatarUrlY,
							avatarUrlWidth / 2, 0, Math.PI * 2, false);
						ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
						ctx.drawImage(result[2], paddingLeft, avatarUrlY, avatarUrlWidth,
							avatarUrlHeigth); // 推进去图片
						ctx.restore(); //恢复之前保存的绘图上下文状态 可以继续绘制

						// 作者名称
						ctx.font = `normal bold ${nameSize}px sans-serif`;
						ctx.setFillStyle('#ffffff'); // 文字颜色
						ctx.fillText(option.displayName, nameX, nameY); // 绘制文字

						// 分割线
						this.handleLine({
							ctx: ctx,
							x1: 30,
							y1: lineOneY,
							x2: 660,
							y2: lineOneY
						})

						// 文章封面
						ctx.save()
						this.handleBorderRect({
							ctx: ctx, //画布上下文
							x: paddingLeft,
							y: coverUrlY,
							w: coverUrlWidth,
							h: coverUrlHeigth,
							r: 14
						})
						ctx.clip()
						ctx.drawImage(result[1], paddingLeft, coverUrlY, coverUrlWidth, coverUrlHeigth);
						ctx.restore();


						// 文章标题
						this.dealWords({
							ctx: ctx, //画布上下文
							fontSize: titleSize, //字体大小
							word: option.title, //需要处理的文字
							maxWidth: 610, //一行文字最大宽度
							x: paddingLeft, //文字在x轴要显示的位置
							y: titleY, //文字在y轴要显示的位置
							maxLine: 2 //文字最多显示的行数
						});
						// 分割线
						this.handleLine({
							ctx: ctx,
							x1: 30,
							y1: lineTwoY,
							x2: 660,
							y2: lineTwoY
						})

						// 二维码
						ctx.save()
						this.handleBorderRect({
							ctx: ctx, //画布上下文
							x: paddingLeft,
							y: codeUrlY,
							w: codeUrlWidth,
							h: codeUrlHeigth,
							r: 14
						})
						ctx.clip()
						ctx.drawImage(result[0], paddingLeft, codeUrlY, codeUrlWidth, codeUrlHeigth);
						ctx.restore();
						// 二维码左边的字
						ctx.save()
						ctx.font = 'normal bold 35px sans-serif';
						ctx.setFillStyle('#ffffff'); // 文字颜色
						ctx.fillText('长 按 识 别 小 程 序 码', 285, codeUrlY + 80); // 绘制文字
						ctx.fillText('查 看 文 章 详 情 信 息', 285, codeUrlY + 125); // 绘制文字
						ctx.restore();
						ctx.draw(false, () => {
							// canvas画布转成图片并返回图片地址
							uni.canvasToTempFilePath({
									canvasId: 'myCanvas',
									width: canvasWidthPx,
									height: canvasHeightPx,
									destWidth: canvasWidthPx,
									destHeight: canvasHeightPx,
									success: res => {
										this.canvasToTempFilePath = res.tempFilePath;
										console.log(this.canvasToTempFilePath)
										this.showShareImg = true;
										console.log(this.showShareImg)
										resolve(this.canvasToTempFilePath)
									},
									fail: err => {
										reject(eer)
									}
								},
								this
							);
						});
					})
				})

			},
			handleLine({
				ctx,
				x1,
				y1,
				x2,
				y2
			}) {
				ctx.beginPath();
				// 设置线宽
				ctx.lineWidth = 1;
				// 设置间距（参数为无限数组，虚线的样式会随数组循环）
				ctx.setLineDash([10, 10]);
				// 移动画笔至坐标 x20 y20 的位置
				ctx.moveTo(x1, y1);
				// 绘制到坐标 x20 y100 的位置
				ctx.lineTo(x2, y2);
				// 填充颜色
				ctx.strokeStyle = '#ffffff';
				// 开始填充
				ctx.stroke();
				ctx.closePath();
			},
			//获取图片信息
			downloadFileImg(url) {
				return new Promise(resolve => {
					uni.getImageInfo({
						src: url,
						success: res => {
							resolve(res.path);
						},
						fail: err => {
							console.log(err);
							uni.showToast({
								title: '网络错误请重试',
								icon: 'loading'
							});
						}
					});
				});
			},
			/**
			 * 图片圆角设置
			 * @param string x x轴位置
			 * @param string y y轴位置
			 * @param string w 图片宽
			 * @param string y 图片高
			 * @param string r 圆角值
			 */
			handleBorderRect({
				ctx,
				x,
				y,
				w,
				h,
				r
			}) {
				ctx.beginPath();
				// 左上角
				ctx.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);
				ctx.moveTo(x + r, y);
				ctx.lineTo(x + w - r, y);
				ctx.lineTo(x + w, y + r);
				// 右上角
				ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
				ctx.lineTo(x + w, y + h - r);
				ctx.lineTo(x + w - r, y + h);
				// 右下角
				ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
				ctx.lineTo(x + r, y + h);
				ctx.lineTo(x, y + h - r);
				// 左下角
				ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);
				ctx.lineTo(x, y + r);
				ctx.lineTo(x + r, y);

				ctx.fill();
				ctx.closePath();
			},
			//处理文字多出省略号显示
			dealWords(options) {
				options.ctx.setFontSize(options.fontSize); //设置字体大小
				let allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth); //实际总共能分多少行
				let count = allRow >= options.maxLine ? options.maxLine : allRow; //实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数
				let endPos = 0; //当前字符串的截断点
				for (let j = 0; j < count; j++) {
					let nowStr = options.word.slice(endPos); //当前剩余的字符串
					let rowWid = 0; //每一行当前宽度
					if (options.ctx.measureText(nowStr).width > options.maxWidth) {
						//如果当前的字符串宽度大于最大宽度，然后开始截取
						for (let m = 0; m < nowStr.length; m++) {
							rowWid += options.ctx.measureText(nowStr[m]).width; //当前字符串总宽度
							if (rowWid > options.maxWidth) {
								if (j === options.maxLine - 1) {
									//如果是最后一行
									options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) *
										options.fontSize); //(j+1)*18这是每一行的高度
								} else {
									options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * options.fontSize);
								}
								endPos += m; //下次截断点
								break;
							}
						}
					} else {
						//如果当前的字符串宽度小于最大宽度就直接输出
						options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * options.fontSize);
					}
				}
			},
		}
	}
</script>

<style lang="scss">

</style>