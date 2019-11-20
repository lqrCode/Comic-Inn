<template>
	<view class="ItemMenu">
		<view class="left">
			<view class="left-item" v-for="(v, i) in orderMenu" :key="i" @click="leftIndex = i" :class="{ selectLeft: leftIndex == i }">
				<view class="left-icon"></view>
				<text>{{ v.name }}</text>
				<view v-if="leftNums(v)" class="count-item">{{ leftNums(v) }}</view>
			</view>
		</view>
		<!-- 右侧菜单 -->
		<view class="right">
			<text class="right-item-title">{{ orderMenu[leftIndex].name }}</text>
			<view class="right-item">
				<view class="view" v-for="(v, i) in orderMenu[leftIndex].lists" :key="i">
					<!-- 商品图片 -->
					<image class="menuImg zhaopai" mode="aspectFill" :src="v.img"></image>
					<view class="view-right">
						<!-- 商品标题 -->
						<view class="view-right-title">{{ v.name }}</view>
						<!-- 其他信息 -->
						<view class="view-right-remarks">{{ v.remark }}</view>
						<view class="view-right-other">月销 {{ v.monthly_sale }} 好评率 {{ v.score_rate }}</view>
						<view v-if="v.discount_text !== ''" class="view-right-discount">
							<view class="discount-item">{{ v.discount_text }}折</view>
						</view>
						<view class="view-right-bottom">
							<view class="bottom-left bFlex">
								<!-- 当前价格 -->
								<view class="nowPrice">¥{{ v.now_price }}</view>
								<!-- 原价 -->
								<view v-if="v.original_price !== ''" class="originalPrice">¥{{ v.originalPrice }}</view>
							</view>
							<!-- 操作按钮 -->
							<view class="bottom-right bFlex">
								<template v-if="menuCount(v) > 0">
									<view class="add-subtraction-btn jianBtn" @click="changeMenuNum(v, i, 'reduce')"><view class="iconfont add-subtraction iconjian2"></view></view>
									<view class="right-count">{{ menuCount(v) }}</view>
								</template>
								<view class="add-subtraction-btn" @click="changeMenuNum(v, i, 'add')"><view class="iconfont add-subtraction iconjia"></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		openPopup: {
			type: Function
		}
	},
	data() {
		return {
			leftIndex: 0,
			orderMenu: this.$store.state.codeOrder.orderMenu
		};
	},
	methods: {
		changeMenuNum(v, i, type) {
			this.$store.commit('codeOrder/changeMenuNum', {
				li: this.leftIndex,
				ri: i,
				type: type,
				that: this
			});
		},
		// 菜单数量计算
		menuCount(v) {
			// return v.hasOwnProperty('shopList') ? eval(v.shopList.map(v => v.count).join("+")) : 0
			return v.hasOwnProperty('shopList') ? v.shopList.map(v => v.count).reduce((n, o) => n + o) : 0;
		},
		// 左侧数量计算
		leftNums(v) {
			return v.lists.map(v => (v.shopList ? v.shopList.map(e => e.count).reduce((n, o) => n + o) : 0)).reduce((n, o) => n + o);
		}
	}
};
</script>

<style lang="scss" scoped>
.ItemMenu {
	display: flex;

	.left {
		width: 155rpx;
		height: 100%;
		padding-bottom: 150rpx;
		background-color: #e6e6e6;

		.left-item {
			position: relative;
			font-size: 24rpx;
			padding: 35rpx 15rpx;

			text {
				color: #666;
				text-align: justify;
			}

			.left-count {
				$heigth: 28rpx;
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				line-height: $heigth;
				text-align: center;
				height: $heigth;
				font-size: 20rpx;
				font-weight: 700;
				color: #fff;
				border-radius: $heigth;
				padding: 0px 8rpx;
				background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
			}
		}

		.selectLeft {
			background-color: #fff;

			text {
				color: #333;
			}
		}
	}

	.right {
		width: 550rpx;
		padding-top: 15rpx;
		padding-bottom: 150rpx;
		margin-left: 20rpx;

		.right-item-title {
			font-size: 24rpx;
			font-weight: 700;
			color: #666;
		}

		.right-item {
			.view {
				margin-top: 50rpx;
				display: flex;

				.view-right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;
					font-size: 20rpx;
					color: #989898;
					width: 340rpx;

					.view-right-title {
						font-size: 30rpx;
						font-weight: 700;
						color: #000;
					}

					.view-right-remarks {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.view-right-other {
					}

					.view-right-discount {
						display: flex;

						.discount-item {
							color: #eb6551;
							font-size: 18rpx;
							padding: 0px 5rpx;
							border: 0.266667vw solid hsla(8, 79%, 62%, 0.3);
						}
					}

					.view-right-bottom {
						display: flex;
						justify-content: space-between;

						.bFlex {
							display: flex;
						}

						.bottom-left {
							align-items: center;

							.nowPrice {
								color: red;
								font-size: 30rpx;
								font-weight: 400;
							}

							.originalPrice {
								margin-left: 1.6vw;
								color: #989898;
								font-size: 24rpx;
								text-decoration: line-through;
							}
						}

						.bottom-right {
							align-items: center;

							.right-count {
								color: #000;
								min-width: 50rpx;
								line-height: 45rpx;
								font-size: 28rpx;
								text-align: center;
							}
						}
					}
				}

				&:nth-child(1) {
					margin-top: 40rpx;
				}
			}
		}
	}
}
</style>
