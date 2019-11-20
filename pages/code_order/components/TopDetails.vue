<template>
	<view class="TopDetails">
		<view class="img">
			<view class="logo"><view class="label">品牌</view></view>
		</view>
		<view class="title" @click="openPopup('popup')">
			<view class="text">我是小程序</view>
			<view class="iconfont iconarrow-right"></view>
		</view>
		<uni-popup ref="popup" type="center" :custom="true">
			<view class="uni-image">
				<view class="p-view">
					<view class="p-title">AI拌饭</view>
					<view class="p-row">
						<view v-for="(item, i) in pRowList" :key="i">
							<view class="name">{{ item.name }}</view>
							<view class="val">{{ item.val }}</view>
						</view>
					</view>
					<view class="p-bottom">
						<view class="p-bottom-title">公告</view>
						<view class="p-bottom-text">欢迎光临，用餐高峰期请提前点餐，谢谢。</view>
					</view>
				</view>
				<view class="popup-close iconfont iconguanbi" @click="cancel('popup')"><uni-icon type="clear" color="#fff" size="30" /></view>
			</view>
		</uni-popup>
		<view class="other">
			<text>评价4.8</text>
			<text>月售1308单</text>
			<text>蜂鸟快送约38分钟</text>
		</view>
		<view class="center">
			<view class="c-top">
				<view class="top-left">
					<view v-for="(a, i) in aList" :key="i">
						<view class="container">{{ a }}</view>
					</view>
				</view>
				<view class="top-right" @click="openPopup('share')">
					4个优惠
					<view class="iconfont iconxiala"></view>
				</view>
				<uni-popup ref="share" type="bottom" :custom="true">
					<view class="uni-share">
						<view class="iconfont iconguanbi1" @click="cancel('share')"></view>
						<view class="uni-share-title">优惠活动</view>
						<view class="uni-share-content">
							<view v-for="(data, i) in shartList" :key="i" class="share-item">
								<view class="share-content-type" :style="'background-color:' + data.color + ';'">{{ data.name }}</view>
								<view class="share-content-val">{{ data.val }}</view>
							</view>
						</view>
					</view>
				</uni-popup>
			</view>
		</view>

		<view class="bottom">公告：受到法律教科书的房律教科书的房价律教科书的房价价来说</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			aList: ['30减5', '65减12', '100减20', '198减38'],
			pRowList: [
				{
					name: '评分',
					val: '4.5'
				},
				{
					name: '月售',
					val: '1308单'
				},
				{
					name: '蜂鸟快送',
					val: '约38分钟'
				},
				{
					name: '配送费',
					val: '1元'
				},
				{
					name: '距离',
					val: '2.7km'
				}
			],
			shartList: [
				{
					name: '满减',
					val: '满100减15，满150减28,满100减15，满150减,28满100减15，满150减28',
					color: '#f65925'
				},
				{
					name: '首单',
					val: '新用户下单立减12元',
					color: '#24ac17'
				}
			]
		};
	},
	methods: {
		openPopup(type) {
			this.$refs[type].open();
		},
		cancel(type) {
			this.$refs[type].close();
		}
	}
};
</script>

<style lang="scss" scoped>
.TopDetails {
	$smallSize: 22rpx;
	$bigSize: 40rpx;
	.img {
		height: 200rpx;
		background-color: aqua;
		position: relative;
		.logo {
			$logow: 155rpx;
			position: absolute;
			width: $logow;
			height: $logow;
			left: calc(50% - #{$logow/2});
			bottom: -30rpx;
			background-color: deeppink;
			border-radius: 10rpx;
			.label {
				border-top-left-radius: 5rpx;
				border-bottom-right-radius: 5rpx;
				background-image: linear-gradient(90deg, #fff100, #ffe339);
			}
		}
	}
	.title {
		margin-top: 60rpx;
		display: flex;
		justify-content: center;
		line-height: 42rpx;
		.iconfont {
			font-size: $bigSize;
		}
		.text {
			max-width: 65vw;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: 700;
			font-size: $bigSize;
		}
	}
	.other {
		font-size: $smallSize;
		margin-top: 15rpx;
		text-align: center;
		text {
			color: #666;
			margin-right: 15rpx;
		}
	}
	.uni-image {
		position: relative;
		width: 72vw;
		max-height: 70%;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 15rpx;
		.popup-close {
			position: absolute;
			left: calc(50% - 30rpx);
			bottom: -83rpx;
			z-index: 2;
			font-size: $bigSize;
			color: #fff;
		}
		.p-view {
			width: 72vw;
			border-radius: 20rpx;
			.p-title {
				max-width: 64vw;
				font-size: 45rpx;
				font-weight: 700;
				margin: 0 auto 35rpx auto;
				text-align: center;
			}
			.p-row {
				display: flex;
				justify-content: space-around;
				font-size: $smallSize;
				text-align: center;
				.name {
					font-size: 30rpx;
					margin-bottom: 15rpx;
					font-weight: 600;
				}
				.val {
					color: #989898;
					font-weight: 400;
				}
			}
			.p-bottom {
				margin-top: 30rpx;
				.p-bottom-title {
					color: #989898;
					text-align: center;
					font-size: 24rpx;
				}
				.p-bottom-text {
					margin: 30rpx 15rpx;
					text-align: justify;
					font-size: 26rpx;
					max-height: 27vw;
					overflow-y: atuo;
				}
			}
			.popup-close {
				position: absolute;
				left: 50%;
				bottom: -200rpx;
			}
		}
	}
	.center {
		margin: 30rpx auto;
		max-width: 80vw;
		.c-top {
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;
			.top-left {
				display: flex;
				.container {
					color: #fd2e32;
					padding: 0 5rpx;
					border: 2rpx solid #ffc3bc;
					margin-right: 10rpx;
				}
			}
			.top-right {
				font-size: $smallSize;
				display: flex;
				color: #989898;
			}
			.uni-share {
				background: #fff;
				padding: 40rpx 50rpx;
				position: relative;
				.uni-share-title {
					font-size: 34rpx;
					font-weight: 600;
					text-align: center;
				}
				.iconguanbi1 {
					position: absolute;
					font-size: 48rpx;
					right: 25rpx;
					top: 25rpx;
				}
				.uni-share-content {
					height: 50vw;
					max-width: 80vw;
					font-size: $smallSize;
					.share-item {
						margin-top: 30rpx;
						display: flex;
						align-items: center;
						.share-content-type {
							line-height: 36rpx;
							margin-right: 15rpx;
							padding: 0 5rpx;
							color: #fff;
							height: 36rpx;
							white-space: nowrap;
							border-radius: 5rpx;
						}
						.share-content-val {
							font-size: 26rpx;
							line-height: 40rpx;
						}
					}
				}
			}
		}
	}
	.bottom {
		margin: 0 auto;
		max-width: 80vw;
		font-size: $smallSize;
		font-weight: 400;
		color: #989898;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
