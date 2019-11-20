<template>
	<view class="home">
		<swiper class="swiper" style="height: 50vw;" :indicator-dots="true" :autoplay="true" :circular="true">
			<swiper-item class="swiper-item" v-for="(item, index) in banner" :key="index">
				<image style="width: 100vw; height: 50vw; background-color: #eeeeee;" :src="item.img" mode="aspectFill"></image>
				<view class="swiper-remark">{{ item.name + '|' + item.chapter_name }}</view>
			</swiper-item>
		</swiper>
		<view class="gridView" v-for="(item, index) in gridList" :key="index">
			<view class="title">{{ item.title }}</view>
			<view class="grid">
				<view class="item" v-for="(d, k) in item.itmes" :key="k" @click="toDetail(d.newid)">
					<view class="item-content">
						<image :src="d.img"></image>
						<view class="chapter">{{ d.chapter_name }}</view>
					</view>
					<view class="name">{{ d.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			banner: [],
			gridList: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		async getData() {
			const res = await this.$api.comic.comicBanner();
			this.banner = res.banner;
			// for (let i = 0; i < res.lists.length; i++) {
			// 	res.lists[i].itmes = res.lists[i].itmes.slice(0, 6);
			// }
			res.lists.map(item => {
				item.itmes = item.itmes.slice(0, 6);
			});
			this.gridList = res.lists;
		},
		toDetail(newid) {
			uni.navigateTo({
				url: `./ComicDetail?newid=${newid}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	background-color: $uni-bg-color-grey;
	.swiper-item {
		position: relative;
		.swiper-remark {
			position: absolute;
			left: 0px;
			top: 0px;
			color: #eeeeee;
			font-size: $uni-font-size-sm;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 10upx;
			border-bottom-right-radius: 10upx;
		}
	}
	.gridView {
		background-color: white;
		margin-top: 10upx;
		.title {
			font-size: 35upx;
			padding: 15upx;
		}
		.grid {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 10upx;
			.item {
				width: calc((100vw - 40upx) / 3);
				flex-shrink: 0;
				overflow: hidden;
				margin-bottom: 15upx;
				.item-content {
					position: relative;
					image {
						width: 100%;
						height: 45vw;
						border-radius: 10upx;
						display: block;
					}
					.chapter {
						width: 100%;
						height: 48upx;
						left: 0px;
						bottom: 0px;
						text-align: center;
						line-height: 48upx;
						position: absolute;
						background-color: rgba(0, 0, 0, 0.5);
						color: white;
						flex-shrink: 0;
						overflow: hidden;
						font-size: 26upx;
					}
				}
				.name {
					font-size: 26upx;
					padding-top: 10upx;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
}
</style>
