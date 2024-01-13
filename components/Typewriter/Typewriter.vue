<template>
	<text class="typewriter">
		<text class="text">{{ currentText }}</text>
		<image v-if="cursorImg && !typingFinished" class="cursor" :src="cursorImg" mode="heightFix" />
		<text v-if="!cursorImg && !typingFinished" class="cursortext" :style="'color:'+ cursorTextColor">|</text>
	</text>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '',
			},
			cursorImg: {
				type: String,
				default: '', // 光标图片的默认 URL
			},
			cursorTextColor: {
				type: String,
				default: '#000'
			},
			speed: {
				type: Number,
				default: 100, // 打字速度，单位：毫秒
			},
			textStyle: {
				type: Object,
				default: () => ({}), // 文字样式对象
			},
			loop: {
				type: Boolean,
				default: false
			},
			interval: {
				type: Number,
				default: 3000
			}
		},
		data() {
			return {
				currentText: '', // 当前显示的文字
				currentIndex: 0, // 当前文字的索引
				typingFinished: false, // 打字完成的标志
			};
		},
		mounted() {
			this.startTyping();
		},
		methods: {
			restart() {
				this.currentText = ''
				this.currentIndex = 0
				this.typingFinished = false
				this.startTyping()
			},
			startTyping() {
				if (this.text) {
					const textLength = this.text.length;
					const typingInterval = setInterval(() => {
						if (this.currentIndex < textLength) {
							this.currentText += this.text[this.currentIndex];
							this.currentIndex++;
						} else {
							clearInterval(typingInterval);
							this.typingFinished = true;
							this.$emit('finished')
							if (this.loop) {
								setTimeout(() => {
									this.restart()
								}, this.interval)
							}
						}
					}, this.speed);
				}
			},
		},
	};
</script>

<style scoped>
	.cursor {
		height: 1em;
		margin-left: 5px;
		margin-bottom: -0.2em;
	}

	.cursortext {
		margin-left: 5px;
		color: #000;
	}
</style>
