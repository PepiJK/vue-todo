import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home.vue';
import Item from '../views/Item.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: Home },
    { path: '/new', name: 'New Todo Item', component: Item },
    { path: '/item/:id', name: 'Todo Item', component: Item, props: true },
    { path: '/edit/:id', name: 'Edit Todo Item', component: Item, props: true },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
