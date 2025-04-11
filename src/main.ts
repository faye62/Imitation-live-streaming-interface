import {createApp} from 'vue';
import App from '@/App.vue';
import router from '@/router';
import {createPinia} from 'pinia';
import "@/plugins/unocss"
import "@/styles/var.css";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import _ from 'lodash'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

const pinia = createPinia();

const app = createApp(App)

app.config.globalProperties.$_ = _;
app
    .use(router)
    .use(ElementPlus)
    .use(ArcoVue)
    .use(pinia)
    .mount('#app');


