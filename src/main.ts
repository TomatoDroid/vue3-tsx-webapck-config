import { createApp } from 'vue';
import App from './App';
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';
import 'tailwindcss/tailwind.css';
import './global.module.less';

import Router from './router';

createApp(App).use(Router).use(Antd).mount('#app');
