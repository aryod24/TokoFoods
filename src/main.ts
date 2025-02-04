import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createBootstrap } from 'bootstrap-vue-next'
import VueToast from 'vue-toast-notification'

import 'vue-toast-notification/dist/theme-default.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/css/main.css'

const app = createApp(App)

app.use(router)
app.use(createBootstrap())
app.use(VueToast)

app.mount('#app')
