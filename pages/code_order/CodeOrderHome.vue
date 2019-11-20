<template>
	<view class="CodeOrderHome">
		<scroll-view scroll-y="true" class="scroll-Y">
			<!-- 顶部商铺信息 -->
			<TopDetails></TopDetails>
			<!-- tab切换 -->
			<view class="menu_slot" ref="slot" style="height: 120rpx;" v-show="isPosition"></view>
			<view class="menu" :class="{'position':isPosition}">
				<view class="menuItem fontWeight" :class="{ hasStyle: menuIndex == i }" v-for="(v, i) in menuLists" :key="i" @click="changeIndex(i)">{{ v.name }}</view>
			</view>
			<!-- 底部tab内容 -->
			<view style="min-height: calc(100vh - 115rpx);" v-if="!loading">
				<OrderMenu v-if="menuIndex == 0"></OrderMenu>
				<EvaluationMenu v-else-if="menuIndex == 1"></EvaluationMenu>
				<MerchantMenu v-else></MerchantMenu>
			</view>
		</scroll-view>
		<view v-if="loading" class="loading">加载中。。。</view>
	</view>
</template>

<script>
	import TopDetails from './components/TopDetails.vue';

	import OrderMenu from './components/OrderMenu.vue';
	import EvaluationMenu from './components/EvaluationMenu.vue';
	import MerchantMenu from './components/MerchantMenu.vue';

	let $scrollTop = 0; // 导航条顶部距离
	export default {
		components: {
			TopDetails,
			OrderMenu,
			EvaluationMenu,
			MerchantMenu
		},
		data() {
			return {
				menuIndex: 0,
				loading: true,
				isPosition: true,
				menuLists: [{
						name: '点餐',
						component: '<OrderMenu/>'
					},
					{
						name: '评价',
						component: '<EvaluationMenu/>'
					},
					{
						name: '商家',
						component: '<MerchantMenu/>'
					}
				]
			};
		},
		async onLoad(arams) {
			const res = await this.$api.codeOrder.CodeOrderHome()
			this.$store.commit('codeOrder/orderMenu', res.menu)
			console.log(res)
			this.loading = false;
			// 获取menu距离窗口顶部高度
			let view = uni
				.createSelectorQuery()
				.in(this)
				.select('.menu_slot')
				.boundingClientRect(res => {
					$scrollTop = res.top
					this.isPosition = false;
				})
				.exec();
			// #ifdef H5
			$scrollTop = this.$refs.slot.$el.offsetTop;
			this.isPosition = document.documentElement.scrollTop >= $scrollTop
			// #endif
		},
		onPageScroll(e) {
			this.isPosition = e.scrollTop >= $scrollTop
		},
		async mounted() {},
		methods: {
			// tab切换
			changeIndex(val) {
				this.menuIndex = val;
				console.log(this.menuIndex);
			},
		}
	};
</script>

<style lang="scss" scoped>
	.CodeOrderHome {
		.scroll-Y {
			.position {
				position: fixed;
				top: 0px;
				z-index: 9;
				width: 100%;
				background-color: #fff;
			}

			.menu {
				padding-top: 35rpx;
				margin-bottom: 15rpx;
				display: flex;
				justify-content: space-around;
				font-size: 30rpx;
				border-bottom: 1rpx #ebebeb solid;

				.menuItem {
					padding-bottom: 25rpx;
					color: #666;
				}

				.hasStyle {
					border-bottom: 6rpx #399ffd solid;
					font-weight: 700;
					color: #333;
				}
			}
		}
	}
</style>
