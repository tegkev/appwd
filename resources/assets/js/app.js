
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueRouter from 'vue-router'
Vue.use(VueRouter);
let router = new VueRouter({
    mode:"hash",
    routes:[{
        path:'/test',
        component:require('./components/Example.vue')
    },{
        path:'/login',
        component:require('./components/login.vue')
    }]
});
Vue.component('modal',require('./components/modal.vue'));
Vue.component('formLogin',require('./components/login.vue'));

const app = new Vue({
    el: '#app',router
});
