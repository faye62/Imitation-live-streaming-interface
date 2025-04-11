import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由
import Vant from 'vant';
import 'vant/lib/index.css';
createApp(App)
    .use(router) // 使用路由
    .use(Vant)
    .mount('#app');
//# sourceMappingURL=main.js.map