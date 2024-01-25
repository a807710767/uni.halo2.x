<template>
	<view>
		<canvas canvas-id="myCanvas" style="width: 690px;height:1040px; position: fixed;top: -11000px;"></canvas>
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
			drag() {
				const option = {
					codeUrl: 'http://cdnpan.qiwo75.com/halo/2024-01-22T11:14:58.875059546-gwajsiif.png', // 二维码
					cover: 'http://cdnpan.qiwo75.com/halo/2024-01-22T11:14:58.875059546-gwajsiif.png', // 主封面图
					headImg: this.$halo.info.logo, // headImg
					title: '一套代码多个仓库实现一套代码多个仓库实现一套代码多个仓库实现一套代码多个仓库实现一套代码多个仓库实现一套代码多个仓库实现一套代码多个仓库实现一套代码多个仓库实现',
					displayName: '栖卧',
					categories: ['运维', '服务器'],
					tags: ['linux', 'halo'],
					mainColor: this.$halo.info.mainColor,
					subColor: this.$halo.info.subColor
				}
				let qrCode = this.downloadFileImg(option.codeUrl);
				let cover = this.downloadFileImg(option.cover);
				let headImg = this.downloadFileImg(option.headImg);
				Promise.all([qrCode, cover, headImg]).then(result => {
					console.log(option)
					const ctx = uni.createCanvasContext('myCanvas', this);
					let canvasWidthPx = 690 * this.ratio,
						canvasHeightPx = 1040 * this.ratio,
						avatarurl_width = 120, //绘制的头像宽度
						avatarurl_heigth = 120, //绘制的头像高度
						avatarurl_x = 40, //绘制的头像在画布上的位置
						avatarurl_y = 28, //绘制的头像在画布上的位置

						coverurl_width = 610, //绘制的封面宽度
						coverurl_heigth = 420, //绘制的封面高度
						coverurl_x = 40, //绘制的封面在画布上的位置
						coverurl_y = avatarurl_y + avatarurl_heigth + 150, //绘制的封面在画布上的位置

						codeurl_width = 180, //绘制的二维码宽度
						codeurl_heigth = 180, //绘制的二维码高度
						codeurl_x = 40, //绘制的二维码在画布上的位置
						codeurl_y = coverurl_y + coverurl_heigth + 40; //绘制的二维码在画布上的位置

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
					ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y,
						avatarurl_width / 2, 0, Math.PI * 2, false);
					ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
					ctx.drawImage(result[2], avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片
					ctx.restore(); //恢复之前保存的绘图上下文状态 可以继续绘制

					// 作者名称
					ctx.font = 'normal bold 45px sans-serif';
					ctx.setFillStyle('#ffffff'); // 文字颜色
					ctx.fillText(option.displayName, 190, (avatarurl_heigth - 23)); // 绘制文字

					// 文章标题
					if (option.title) {
						this.dealWords({
							ctx: ctx, //画布上下文
							fontSize: 30, //字体大小
							word: option.title, //需要处理的文字
							maxWidth: 610, //一行文字最大宽度
							x: 40, //文字在x轴要显示的位置
							y: 180, //文字在y轴要显示的位置
							maxLine: 2 //文字最多显示的行数
						});
					}

					// 文章封面
					ctx.save()
					this.handleBorderRect({
						ctx: ctx, //画布上下文
						x: coverurl_x,
						y: coverurl_y,
						w: coverurl_width,
						h: coverurl_heigth,
						r: 14
					})
					ctx.clip()
					ctx.drawImage(result[1], coverurl_x, coverurl_y, coverurl_width, coverurl_heigth);
					ctx.restore();

					// 分割线
					this.handleLine({
						ctx: ctx,
						x1: 30,
						y1: 736,
						x2: 660,
						y2: 736
					})

					// 二维码
					ctx.save()
					this.handleBorderRect({
						ctx: ctx, //画布上下文
						x: codeurl_x,
						y: codeurl_y,
						w: codeurl_width,
						h: codeurl_heigth,
						r: 14
					})
					ctx.clip()
					ctx.drawImage(result[0], codeurl_x, codeurl_y, codeurl_width, codeurl_heigth);
					ctx.restore();
					// 二维码左边的字
					ctx.save()
					ctx.font = 'normal bold 35px sans-serif';
					ctx.setFillStyle('#ffffff'); // 文字颜色
					ctx.fillText('长 按 识 别 小 程 序 码', 285, codeurl_y + 80); // 绘制文字
					ctx.fillText('查 看 文 章 详 情 信 息', 285, codeurl_y + 125); // 绘制文字
					ctx.restore();
					ctx.draw(false, () => {
						// canvas画布转成图片并返回图片地址
						uni.canvasToTempFilePath({
								canvasId: 'myCanvas',
								width: 690,
								height: 1040,
								destWidth: 690,
								destHeight: 1040,
								success: res => {
									this.canvasToTempFilePath = res.tempFilePath;
									console.log(this.canvasToTempFilePath)
									this.showShareImg = true;
									uni.showToast({
										title: '绘制成功'
									});
								},
								fail: err => {
									uni.showToast({
										title: '绘制失败'
									});
								},
								complete: () => {
									uni.hideLoading();
									uni.hideToast();
								}
							},
							this
						);
					});
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
										40); //(j+1)*18这是每一行的高度
								} else {
									options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 40);
								}
								endPos += m; //下次截断点
								break;
							}
						}
					} else {
						//如果当前的字符串宽度小于最大宽度就直接输出
						options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 40);
					}
				}
			},
		}
	}
</script>

<style lang="scss">

</style>