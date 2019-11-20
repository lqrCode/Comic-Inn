<template>
	<view ref="scroll" style="overflow-y: scroll;height: 100vh;" @touchmove="touchmove" @touchstart="touchstart" @scroll="scroll">
		<!-- <scroll-view class="scroll-Y" @scroll="scroll"> -->
		<view v-for="(item, i) in lists[index].end_num" :key="i">
			<image style="width: 100vw; height: 100%; display: block;" :src="lists[index].src + (i + 1) + lists[index].srcEnd" mode="widthFix"></image>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			lists: [],
			index: 0,
			touchY: 0
		};
	},
	onLoad(params) {
		try {
			this.lists = uni.getStorageSync('comicPlayerLists');
			this.index = params.index;
		} catch (e) {
			// error
		}
	},
	methods: {
		touchstart: function(e) {
			this.touchY = e.changedTouches[0].pageY;
		},
		touchmove: function(e) {
			// console.log(e.changedTouches[0].pageY);
		},
		scroll: function(e) {
			console.log(this.$refs.scroll.$el.scrollTop)
		}
	}
};
</script>

<style scoped lang="scss">
body,
html {
	height: 100%;
	width: 100%;
	background: #1a1a1a;
	overflow-x: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}
</style>
