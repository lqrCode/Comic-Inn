import Vue from 'vue'

const state = {
	orderMenu: [],
}

const mutations = {
	// 赋值菜单
	orderMenu(state, data) {
		state.orderMenu = data
	},
	// 菜单数量修改
	changeMenuNum(state, {
		li,
		ri,
		type,
		that
	}) {
		let item = state.orderMenu[li].lists[ri]
		if (item.hasOwnProperty('spec')) {
		that.$LqrToast('测试')
			// 多规格
			that.$Spec({
				data: item,
				success: (data) => {
					a(item, type, that, data)
				}
			})
		} else {
		that.$LqrToast(Math.random().toString(36).slice(-8))
			// 单规格处理
			a(item, type, that, {
				"name": item.name,
				"price": item.now_price,
				"count": 1
			})
		}

	}
}

function a(item, type, that, data) {
	if (item.hasOwnProperty('shopList')) {
		if (!data.specId || item.shopList.some((v) => v.specId.toString() == data.specId.toString())) {
			type == "add" ? item.shopList[0].count++ : item.shopList[0].count--
		} else {
			item.shopList.push(data)
		}
	} else {
		that.$set(item, 'shopList', [data])
	}
	console.log(state.orderMenu)
}

export default {
	namespaced: true,
	state,
	mutations
}
