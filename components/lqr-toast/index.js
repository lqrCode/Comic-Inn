import Vue from 'vue'
import lqrToast from './index.vue'

const LqrToastBox = Vue.extend(lqrToast)
const LqrToast = (text, option) => {

	const instance = new LqrToastBox({
		data: { ...option,
			text
		},
	})


	instance.$mount();

	const view = document.getElementsByClassName('lqr-toast')
	if (view.length == 0) {
		document.body.appendChild(instance.$el);
	} else {
		document.body.removeChild(view[0]);
		document.body.appendChild(instance.$el);
	}





	Vue.nextTick(() => {
		instance.open()
	})
	return instance;
}

Vue.prototype.$LqrToast = LqrToast
