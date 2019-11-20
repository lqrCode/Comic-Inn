import http from '../interface.js'

export default {
	CodeOrderHome() {
		return http.request({
			url: '/api/v1/codeOrder/home',
			method: 'POST',
		})
	},
}
