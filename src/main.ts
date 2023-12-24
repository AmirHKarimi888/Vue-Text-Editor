import { createApp } from 'vue'
import { createPinia } from 'pinia';

import "./assets/style/main.scss";

import App from './App.vue'

createApp(App)
.use(createPinia())
.mount('#app')
