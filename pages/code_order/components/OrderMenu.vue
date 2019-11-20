<!-- 点餐 -->
<template>
	<view class="OrderMenu">
		<!-- 头部图片 -->
		<view class="topImg"></view>
		<!-- 推荐 -->
		<Popular @openPopup="openPopup"></Popular>
		<!-- 菜单栏 -->
		<ItemMenu :openPopup="openPopup"></ItemMenu>
		<!-- 购物车 -->
		<Shopping></Shopping>
		<template>
			<!-- 商品详情弹框 -->
			<uni-popup class="detailStyle" ref="productDetails" type="bottom" :custom="true" :maskClick="false">
				<scroll-view scroll-y="true" view class="productDetails">
					<view class="float-btn" @click="cancel('productDetails')"><view class="iconfont iconguanbi1"></view></view>
					<view class="header-img"></view>
					<view class="bottom">
						<view class="detail-top">
							<span class="detail-label">招牌</span>
							<span class="detail-title">我是商品</span>
						</view>
						<view class="other">月销98份 好评96%</view>
						<view class="detail-money">
							<span class="now-money">¥19</span>
							<span class="last-money">¥25</span>
							<span class="discount">6.3折</span>
							<view class="detail-bottom">
								<view class="add-subtraction-btn jianBtn"><view class="iconfont add-subtraction iconjian2"></view></view>
								<view class="right-count">1</view>
								<view class="add-subtraction-btn"><view class="iconfont add-subtraction iconjia"></view></view>
							</view>
						</view>
						<view class="detail-remarks">升级版香辣鸡腿堡1个+老北京鸡肉卷1个+香辣鸡翅2块+新奥尔良烤翅2块+土豆泥1份+红豆派1块+九珍2杯</view>
					</view>
				</scroll-view>
			</uni-popup>
		</template>
	</view>
</template>

<script>
import Popular from './Popular.vue';
import ItemMenu from './ItemMenu.vue';
import Shopping from './Shopping.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		Popular,
		ItemMenu,
		Shopping,
		uniPopup
	},
	data() {
		return {
			checkList: []
		};
	},
	methods: {
		openPopup(type) {
			this.$refs[type].open();
		},
		cancel(type) {
			this.$refs[type].close();
			document.querySelector('body').removeAttribute('style');
		},
		changItem(listIndex, val) {
			this.checkList[listIndex].childrenId = val;
		}
	}
};
</script>

<style lang="scss" scoped>
.OrderMenu {
	z-index: 1;

	.topImg {
		height: 180rpx;
		margin: 0px 30rpx;
		background-color: #007aff;
		border-radius: 5rpx;
	}

	// 商品选择
	.uni-share {
		position: relative;
		min-height: 80vh;
		padding: 30rpx;
		background-color: #fff;

		.iconguanbi1 {
			position: absolute;
			font-size: 48rpx;
			right: 30rpx;
			top: 30rpx;
		}

		.uni-share-top {
			display: flex;
			margin-bottom: 40rpx;

			.top-right-img {
				height: 195rpx;
				width: 195rpx;
				background-color: #3f536e;
			}

			.top-left {
				display: flex;
				flex-direction: column;
				padding-left: 20rpx;
				font-weight: 700;

				.title {
					font-size: 34rpx;
					margin-bottom: 15rpx;
				}

				.other {
					flex: 1;
					font-size: 22rpx;
					font-weight: 400;
				}

				.money {
					font-size: 48rpx;
					color: rgb(255, 83, 57);
				}
			}
		}

		.scroll-Y {
			padding-bottom: 80rpx;

			.uni-share-list {
				height: 59vh;

				.list-item {
					font-weight: 400;

					.item-title {
						margin-bottom: 30rpx;
						font-size: 28rpx;
					}

					.items {
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;

						view {
							font-size: 26rpx;
							padding: 15rpx 20rpx;
							background-color: #f5f5f5;
							margin-right: 35rpx;
							margin-bottom: 25rpx;
							border-radius: 5rpx;
							color: #333;
						}
					}

					.selectItem {
						background-color: #d4eaff;
						font-weight: 700;
						color: #0587ff !important;
					}
				}
			}
		}

		.uni-share-btn {
			position: absolute;
			right: 30rpx;
			left: 30rpx;
			bottom: 30rpx;
			background-color: #2295ff;
			padding: 20rpx 0;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			font-weight: 700;
			border-radius: 5rpx;
		}
	}

	.detailStyle {
		z-index: 99 !important;
	}

	// 商品详情
	.productDetails {
		height: 100vh;
		max-height: 100vh;
		background-color: #fff;

		.float-btn {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			z-index: 999;
			border-radius: 46rpx;
			padding: 0px 2rpx;
			align-items: center;
			background-color: rgba(0, 0, 0, 0.2);

			.iconguanbi1 {
				color: #fff;
				font-size: 46rpx;
			}
		}

		.header-img {
			height: 755rpx;
			background-color: #6699cc;
		}

		.bottom {
			width: 690rpx;
			margin: auto;
			padding: 30rpx 30rpx 120rpx 30rpx;

			view {
				margin-bottom: 10rpx;
			}

			.detail-top {
				display: flex;
				align-items: center;
				font-weight: 700;

				.detail-label {
					font-size: 20rpx;
					line-height: 28rpx;
					margin-right: 30rpx;
					height: 100%;
					padding: 0px 2rpx;
					color: #fff;
					background-image: linear-gradient(135deg, #ffae1b, #f57751);
				}

				.detail-title {
					font-size: 40rpx;
					width: 74.666667vw;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.other {
				font-size: 22rpx;
				color: #666;
			}

			.detail-money {
				display: flex;
				align-items: flex-end;
				color: rgb(255, 83, 57);

				.now-money {
					font-size: 30rpx;
				}

				.last-money {
					font-size: 24rpx;
					color: #999;
					text-decoration: line-through;
					margin: 0px 15rpx;
				}

				.discount {
					border: 1rpx solid hsla(8, 79%, 62%, 0.3);
					font-size: 20rpx;
					line-height: 22rpx;
					padding: 2px 5rpx;
				}

				.detail-bottom {
					display: flex;
					position: absolute;
					right: 30rpx;

					.right-count {
						min-width: 40rpx;
					}
				}
			}

			.detail-remarks {
				font-size: 22rpx;
				color: #666;
				text-align: justify;
			}
		}
	}
}
</style>
