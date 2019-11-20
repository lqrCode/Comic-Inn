<template>
	<view class="home"><image style="width: 100vw;" src="/static/images/bg.jpg" mode="aspectFill"></image></view>
</template>

<script>
export default {
	onReady: function(e) {
		var context = uni.createCanvasContext('firstCanvas');
	},
	methods: {
		canvasIdErrorCallback: function(e) {
			console.error(e.detail.errMsg);
		}
	}
};
</script>

<style></style>
