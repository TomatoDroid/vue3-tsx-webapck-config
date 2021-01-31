import { createApp } from 'vue';
import App from './App';

import '@iconify/iconify';
import 'ant-design-vue/dist/antd.css';
import 'tailwindcss/tailwind.css';
import './global.module.less';

import Router from '@/routes/router';
import Store, { storeKey } from '@/store/index';

createApp(App).use(Router).use(Store, storeKey).mount('#app');
