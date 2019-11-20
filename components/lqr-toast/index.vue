<template>
	<view v-if="show" class="lqr-toast">
		<view class="item">{{ text }}</view>
	</view>
</template>

<script>
export default {
	name: 'lqr-toast',
	data() {
		return {
			show: false,
			text: '',
			duration: 5000
		};
	},
	methods: {
		open() {
			const that = this;
			console.log(that.text);
			that.show = true;
			setTimeout(() => {
				that.show = false;
			}, that.duration);
		}
	}
};
</script>

<style lang="scss" scoped>
.lqr-toast {
	position: fixed;
	left: 0px;
	bottom: 120rpx;
	display: flex;
	justify-content: center;
	width: 100%;
	z-index: 9999999;
	.item {
		background-color: rgba($color: #000000, $alpha: 0.7);
		padding: 18rpx 30rpx;
		border-radius: 8rpx;
		color: #fff;
		font-size: 28rpx;
	}
}
</style>
