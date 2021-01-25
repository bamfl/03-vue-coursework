<template>
  <h1 class="text-white center">Задач пока нет</h1>
	<h3 class="text-white">Всего активных задач: 0</h3>
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
      <button class="btn primary">Посмотреть</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
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

		return {
			allTasks
		}
	},
  components: {
		AppStatus
	}
}
</script>
