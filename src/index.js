// import fun from './main.js'
import Vue from 'vue'
import app from './app.vue'
import router from './router/index.js'
// import './index.css'

// fun('Tina')
new Vue({
    router,
    render:h=>h(app)
}).$mount('#app')





