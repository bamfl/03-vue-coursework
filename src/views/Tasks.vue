<template>
  <h1 v-if="!allTasks.length" class="text-white center">Задач пока нет</h1>

	<div v-else>
		<h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
	  <div v-for="task in allTasks" :key="task.id">
	    <div class="card">
	      <h2 class="card-title">
					{{ task.title }}
	        <AppStatus :type="task.status" />
	      </h2>
	      <p>
	        <strong>
	          <small>
	            {{ task.date }}
	          </small>
	        </strong>
	      </p>
	      <router-link :to="'/task/' + task.id">
					<button class="btn primary">Посмотреть</button>
				</router-link>
	    </div>
	  </div>
	</div>
</template>

<script>
import axios from 'axios'
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
	setup() {
		onBeforeMount(() => {
			loadTasks()
		})

		const store = useStore()
		let allTasks = ref(store.getters.allTasks)

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

		const activeTasks = computed(() => {
			return allTasks.value.filter(t => t.status === 'active').length
		})

		return {
			allTasks,
			activeTasks
		}
	},
  components: {
		AppStatus
	}
}
</script>
