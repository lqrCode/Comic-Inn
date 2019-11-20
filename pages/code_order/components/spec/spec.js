import Vue from 'vue'
import spec from './spec.vue'

const SpecBox = Vue.extend(spec)
const Spec = (option) => {

	const instance = new SpecBox({
		data: { ...option },
	})

	instance.$mount();
	document.body.appendChild(instance.$el);
	
	Vue.nextTick(() => {
		instance.open()
	})
	return instance;
}
Vue.prototype.$Spec = Spec




