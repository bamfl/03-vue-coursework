<template>
  <div v-for="task in allTasks" :key="task.id">
		<div class="card" v-if="task.id === taskId">
			<h2>{{ task.title }}</h2>
			<p><strong>Статус</strong>: <AppStatus :type="status ? status : task.status" /></p>
			<p><strong>Дэдлайн</strong>: {{ task.date }}</p>
			<p><strong>Описание</strong>: {{ task.description }}</p>
			<div>
				<button class="btn pending" @click="pending">Взять в работу</button>
				<button class="btn primary" @click="done">Завершить</button>
				<button class="btn danger" @click="cancelled">Отменить</button>
			</div>
		</div>
  </div>
  <h3 v-if="allTasks.length === 0" class="text-white center">
    Задачи с id = <strong>Tут АЙДИ</strong> нет.
  </h3>
</template>

<script>
import axios from 'axios'
import { ref, computed, onBeforeMount } from 'vue' 
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
	props: ['taskId'],
	setup(props) {
		onBeforeMount(() => {
			loadTasks()
		})

		const status = ref('')

		const store = useStore()
		const allTasks = ref(store.getters.allTasks)

		async function loadTasks() {
			const { data } = await axios.get('https://vue-coursework-86815-default-rtdb.firebaseio.com/tasks.json')

			const result = Object.keys(data).map(key => {
				return {
					id: key,
					...data[key]
				}
			})

			allTasks.value = result
		}

		function pending() {
			status.value = 'pending'
		}

		function done() {
			status.value = 'done'
		}

		function cancelled() {
			status.value = 'cancelled'
		}

		// {{ task }} рендерит, а {{ task.id }} уже не выводит, не знаю, как сделать по-другому, value получить тоже не получается
		// const task = computed(() => {
		// 	return allTasks.value.find(t => t.id == props.taskId)
		// })

		return {
			// task,
			allTasks,
			status,
			pending, done, cancelled
		}
	},

  components: {
		AppStatus
	}
}
</script>

<style scoped>

</style>
