import Index from './index.vue';
import Login from './login.vue';
import Task from './list/task.vue';
import Register from './register.vue';

export default [
    { path: '/', component: Index, children: [
        { path: 'login', component: Login },    
        { path: 'register', component: Register },
    ] },
    { path: '/task', component: Task },
];
