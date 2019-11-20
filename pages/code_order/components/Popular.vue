<!-- 推荐栏 -->
<template>
	<view class="Popular">
		<view class="title">商家推荐</view>
		<scroll-view scroll-x="true" class="scroll-X">
			<view class="scrollItem" v-for="i in 5" :key="i">
				<view class="img" @click="openPopup('productDetails')"></view>
				<view class="foodsName">我是食物名称名称名称名称</view>
				<view class="foodsReamrks">月销 538 好评率 96%</view>
				<view class="bottom">
					<view class="money">
						<text class="small">¥</text>
						48
						<!-- <text class="money-qi">起</text> -->
					</view>
					<!-- <view class="btn"><view class="iconfont iconjia"></view></view> -->
					<view class="add-subtraction-btn jianBtn"><view class="iconfont add-subtraction iconjian2"></view></view>
					<view class="right-count">1</view>
					<view class="add-subtraction-btn" @click="openPopup('share')"><view class="iconfont add-subtraction iconjia"></view></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	methods: {
		openPopup(type) {
			this.$emit('openPopup', type);
			document.querySelector('body').setAttribute('style', 'overflow:hidden;');
		}
	}
};
</script>

<style lang="scss" scoped>
.Popular {
	margin-bottom: 40rpx;
	.title {
		margin: 25rpx 0px;
		font-size: 32rpx;
		font-weight: 700;
		padding: 0px 30rpx;
	}

	.scroll-X {
		white-space: nowrap;
		.scrollItem {
			width: 245rpx;
			display: inline-block;
			margin-left: 20rpx;
			.img {
				height: 240rpx;
				border-radius: 5rpx;
				background-color: #6699cc;
			}

			.foodsName {
				margin: 15rpx 0px;
				overflow: hidden;
				font-size: 28rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.foodsReamrks {
				font-size: 20rpx;
				line-height: 20rpx;
				color: #878787;
			}

			.bottom {
				display: flex;
				margin-top: 15rpx;
				justify-content: space-between;
				align-items: center;

				.money {
					color: rgb(255, 83, 57);
					font-size: 36rpx;
					font-weight: 400;
					.small {
						font-size: smaller;
					}
					.money-qi {
						font-size: 22rpx;
					}
				}
				// .right-count {
				// 	color: #333;
				// 	// min-width: 40rpx;
				// 	line-height: 45rpx;
				// 	font-size: 28rpx;
				// 	text-align: center;
				// }
			}
		}
	}
}
</style>
