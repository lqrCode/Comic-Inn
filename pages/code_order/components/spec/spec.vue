
<template>
	<view class="spec" id="spec">
		<view class="spec_bg" @click="close()"></view>
		<transition name="slide-fade">
			<view class="uni-share" v-if="show">
				<view class="iconfont iconguanbi1" @click="close()"></view>
				<view class="uni-share-top">
					<image class="menuImg zhaopai" mode="aspectFill" :src="data.img"></image>
					<view class="top-left">
						<p class="title">{{ data.name }}</p>
						<p class="other">已选：{{ this.check.map(v => v.name).join(' / ') }}</p>
						<p class="money">¥{{ totalPrice }}</p>
					</view>
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="uni-share-list">
						<view class="list-item" v-for="(v, i) in data.spec" :key="i">
							<view class="item-title">{{ v.title }}</view>
							<view class="items">
								<view v-for="(o, n) in v.children" @click="changItem(o, i)" :class="{ selectItem: check[i].id == o.id }" :key="n">{{ o.name }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="uni-share-btn" @click="btn()">选好了</view>
			</view>
		</transition>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			data: {},
			check: [],
			success: data => console.log(data)
		};
	},
	created() {
		this.data.spec.map(v => this.check.push(v.children[0]));
	},
	computed: {
		totalPrice() {
			return Number(this.data.now_price) + Number(this.check.map(v => v.price).reduce((n, o) => n + o));
		}
	},
	methods: {
		btn() {
			this.success({
				name: this.data.name,
				count: 1,
				spec: this.check,
				price: this.totalPrice,
				specId: this.check.map(v => v.id)
			});
			this.close()
		},
		changItem(v, i) {
			this.$set(this.check, i, v);
		},
		close() {
			this.show = false;
			document.querySelector('body').removeAttribute('style');
			this.$nextTick(() => {
				setTimeout(() => {
					this.$el.remove();
				}, 300);
			});
		},
		open() {
			document.querySelector('body').setAttribute('style', 'overflow:hidden;');
			this.$nextTick(() => {
				setTimeout(() => {
					this.show = true;
				}, 30);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.spec_bg {
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0px;
	top: 0px;
	background-color: rgba($color: #000000, $alpha: 0.5);
	z-index: 999998;
}

.uni-share {
	z-index: 999999;
	position: fixed;
	height: 80vh;
	width: calc(100vw - 60rpx);
	bottom: 0px;
	left: 0px;
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

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-leave-active {
	transform: translateY(-100%);
}

.slide-fade-enter,
.slide-fade-leave-to {
	transform: translateY(100%);
}
</style>
