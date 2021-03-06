import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import animate from 'animate.css';
import { Button, Toast, Dialog, Uploader, ImagePreview } from 'vant'; // 按需引入vant组件，减小打包体积
import 'vant/lib/index.css';

Vue.config.productionTip = false;

Vue.use(animate);
Vue.use(Button);
Vue.use(Uploader);
Vue.use(ImagePreview);

Vue.prototype.$Toast = Toast;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$ImagePreview = ImagePreview;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
