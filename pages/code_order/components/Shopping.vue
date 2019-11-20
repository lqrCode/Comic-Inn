<!-- 购物车 -->
<template>
	<view class="Shopping">
		<view class="shoppingCart1">
			<view class="shoppingCart2" :class="{ hasShopping: hasShopping }"><view class="iconfont icongouwuche1"></view></view>
			<view class="count-item" v-show="hasShopping">1</view>
		</view>
		<view class="center-view">
			<p class="top">
				¥20
				<text>¥20</text>
			</p>
			<p class="bottom">另需配送费2元</p>
		</view>
		<view class="right-view" :class="{ toSettlement: toSettlement }">
			<view class="settlement">
				<text v-if="toSettlement">去结算</text>
				<text v-else-if="!hasShopping">¥20起送</text>
				<text class="small" v-else>还差¥20.9起送</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hasShopping: true, // 是否有商品
			toSettlement: true, // 是否可结算
		};
	}
};
</script>

<style lang="scss" scoped>
.Shopping {
	position: fixed;
	bottom: 0px;
	left: 0;
	right: 0;
	height: 95rpx;
	padding-left: 160rpx;
	z-index: 999;
	background-color: #505052;

	.shoppingCart1 {
		position: absolute;
		bottom: 25rpx;
		left: 25rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #444444;
		border-radius: 50rpx;

		.shoppingCart2 {
			position: absolute;
			left: 10rpx;
			top: 10rpx;
			width: 80rpx;
			height: 80rpx;
			background-color: #363636;
			border-radius: 40rpx;

			.icongouwuche1 {
				position: absolute;
				left: 16rpx;
				top: 16rpx;
				color: #5f5e63;
				font-size: 46rpx;
			}
		}

		.hasShopping {
			background-color: #3191e8;
			.icongouwuche1 {
				color: #fff;
			}
		}
	}
	.center-view {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.top {
			font-size: 36rpx;
			color: #fff;
			text {
				color: #999;
				font-size: 26rpx;
				text-decoration: line-through;
				margin-left: 10rpx;
			}
		}
		.bottom {
			color: #999;
			font-weight: 400;
			font-size: 20rpx;
		}
	}

	.right-view {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 210rpx;
		color: #fff;
		font-size: 30rpx;
		font-weight: 700;
		background-color: #535356;
		text-align: center;
		.settlement {
			line-height: 95rpx;
		}
		.small{
			font-size: 22rpx;
		}
	}
	.toSettlement {
		background-color: #38ca73;
	}
}
</style>
