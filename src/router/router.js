import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/tasks', component: () => import('@/views/Tasks'), alias: '/', children: [
		{ path: ':taksId?', component: () => import('@/views/Task'), props: true }
	]},
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