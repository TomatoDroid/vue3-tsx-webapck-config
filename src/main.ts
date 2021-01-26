import { createApp } from 'vue';
import App from './App';

import 'ant-design-vue/dist/antd.css';
import 'tailwindcss/tailwind.css';
import './global.module.less';

import Router from './routes/router';

createApp(App).use(Router).mount('#app');
