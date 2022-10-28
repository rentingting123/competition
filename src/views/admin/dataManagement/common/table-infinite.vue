<template>
	<div class="table-infinite">
		<slot></slot>

		<div class="loading-wrap" ref="loading-wrap">
			<div class="el-loading-spinner" v-if="!allLoaded">
				<div class="loading-text" v-show="showLoading">
					<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
					加载中
				</div>

				<div class="loading-text handLoad" v-show="!showLoading" @click="loadMoreData">
					加载更多
				</div>
			</div>

			<!-- <div v-else>全部数据已加载</div> -->
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {

		props: {
			loadData: {
				type: Function
			},

			allLoaded: {
				type: Boolean,
				default: -1
			}
		},

		data() {
			return {
				showLoading: false,
			}
		},

		methods: {
			// 下拉加载更多
			loadMoreData() {
				if (this.showLoading || this.allLoaded) return;

				let winH = document.documentElement.offsetHeight, // 屏幕高度
					scrollTop = document.documentElement.scrollTop || document.body.scrollTop, // 滚动高度
					loadingOffsetTop = this.$refs['loading-wrap'].offsetTop; // loading-wrap距离页面顶部的高度

				if ((scrollTop + winH) > loadingOffsetTop) {
					this.showLoading = true;
					this.loadData(() => {
						setTimeout(() => {
							this.showLoading = false;
							if (document.documentElement.scrollTop){
								document.documentElement.scrollTop = scrollTop;
							} else {
								document.body.scrollTop = scrollTop;
							}

						})
					});
				}
			}
		},

		mounted() {
			if (this.loadData && typeof this.loadData === 'function') {
				window.onscroll = (e) => {
					 this.loadMoreData();
				};
			}
		},

		beforeDestroy() {
			window.onscroll = null;
		}
	}
</script>

<style type="text/css" lang="less">
	.table-infinite {
		background: #fff;
	}

	.loading-wrap {
		width: 100%;
		position: relative;
		text-align: center;
		font-size: 14px;

		.el-loading-spinner {
			position: static;
			margin: 0;
			height: 50px;
			line-height: 50px;

			.circular {
				vertical-align: middle;
				width: 30px;
				height: 30px;
			}
		}

		.handLoad {
			cursor: pointer;
		}
	}

</style>
