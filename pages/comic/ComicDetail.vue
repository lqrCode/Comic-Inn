<template>
	<view class="home">
		<image style="width: 100vw; height: 50vw; background-color: #eeeeee;" :src="detail.img" mode="aspectFill"></image>
		<view class="content">{{ detail.desc }}</view>
		<view class="mulu">
			<view class="mulu-item" @click="toPlayer(index)" v-for="(item, index) in detail.lists" :key="index">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			detail: {}
		};
	},
	onLoad(params) {
		this.getData(params.newid);
	},
	methods: {
		async getData(newid) {
			const res = await this.$api.comic.comicDetail({ newid });
			this.detail = res;
		},
		toPlayer(index) {
			uni.setStorage({
				key: 'comicPlayerLists',
				data: this.detail.lists,
				success: function() {
					uni.navigateTo({
						url: `./ComicPlayer?index=${index}`
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	background-color: $uni-bg-color-grey;
	image {
		display: block;
	}
	.content {
		background-color: $uni-bg-color;
		font-size: $uni-font-size-base;
		padding: $uni-spacing-row-sm;
	}
	.mulu {
		margin-top: $uni-spacing-col-sm;
		padding: $uni-spacing-row-sm;
		background-color: $uni-bg-color;
		font-size: $uni-font-size-base;
		.mulu-item {
			padding: 10upx;
		}
	}
}
</style>
