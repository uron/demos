import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import * as Components from 'library';
import { installComponents } from 'vusion-utils';
installComponents(Components, Vue);

import routes from './routes';
import Axios from 'axios';

Vue.prototype.$http = Axios;
const router = new VueRouter({
    routes,
});

new Vue({
    router,
}).$mount('#app');
