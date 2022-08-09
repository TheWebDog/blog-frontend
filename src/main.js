import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import 'mavon-editor/dist/css/index.css'

import axios from "axios"


// 全局配置axios的请求根路径
// axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.baseURL = "https://blog-backend-thewebdog.vercel.app/"

// 按需导入 Loading 组件
import { Loading } from 'element-ui'

// 配置请求拦截器
let reqNum = 0
let loadingInstance = null
axios.interceptors.request.use(config => {
  // 判断请求是否是 不需要loading的接口，如果不是，加载 LoadingBar
  let url = config.url;
  if (url.split('/').pop() !== axios.defaults.baseURL) {
    // 开启 loading 效果
    loadingInstance = Loading.service({ fullscreen: true })
    reqNum++
  }
  // 固定写法
  return config
})

// 配置响应拦截器
axios.interceptors.response.use(response => {
  reqNum--
  if (reqNum <= 0) {
    // 关闭 loading 效果
    loadingInstance.close()
  }
  return response
})

// 将axios挂载到Vue上
Vue.prototype.$axios = axios
// 今后在每个.vue组件中要发起请求,直接调用 this.$axios.xxx

import VueScrollReveal from 'vue-scroll-reveal';
Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal',
  duration: 800,
  scale: 1,
  distance: '120px',
  reset: true,
  mobile: true,
  useDelay: 'always',
  origin: 'left',
  delay: 80
});


{/* <script  src='../node_modules/mavon-editor/dist/highlightjs/highlight.min.js'></script> */ }
// import moduleName from 'module';
// import hljs from 'highlight.js' // 代码高亮
// import 'highlight.js/styles/github.css';
// // import 'highlight.js/styles/googlecode.css'
// Vue.directive('highlight', function (el) {
//   var blocks = el.querySelectorAll('code');
//   blocks.forEach((item) => {
//     hljs.highlightBlock(item)
//   })
// })

Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.use(mavonEditor) // markdown  挂在到全局

Vue.config.productionTip = false

router.afterEach(() => {
  window.scrollTo(0, 0);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
