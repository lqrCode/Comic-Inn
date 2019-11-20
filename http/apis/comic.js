import http from '../interface.js'

export default {
	comicBanner() {
		return http.request({
			url: '/v1/comic/home',
			method: 'GET',
		})
	},
	comicDetail(data) {
		return http.request({
			url: '/v1/comic/detail',
			method: 'GET',
			data: data,
		})
	},
}
