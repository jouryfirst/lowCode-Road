import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/common.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import 'highlight.js/styles/dark.css'

hljs.registerLanguage('javascript', javascript);

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(hljsVuePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
