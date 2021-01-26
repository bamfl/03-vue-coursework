import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/tasks', component: () => import('@/views/Tasks'), alias: '/'},
	// { path: '/task/:taskId', component: () => import('@/views/Task'), props: true },
	{ path: '/task/:notFound(.*)', component: () => import('@/views/NotFound'), props: true}, // Не понял, почему не работает. Когда '/task/:taskId комментирую, работает.
	{ path: '/new', component: () => import('@/views/New') },
	{ path: '/:notFound(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})

export default router
