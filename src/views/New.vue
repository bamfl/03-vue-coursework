<template>
  <form class="card" @submit.prevent="addTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input 
				id="title" 
				type="text" 
				v-model="title"
			/>
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input 
				id="date" 
				type="date" 
				v-model="date"
			/>
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea 
				id="description" 
				v-model="description"
			></textarea>
    </div>

    <button class="btn primary" :disabled="isDisabled" type="submit">Создать</button>
  </form>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup () {
		onBeforeMount(() => {
			loadTasks()
		})

		const router = useRouter()

		const store = useStore()

		let allTasks = ref(store.getters.allTasks)

		const title = ref('')
		const date = ref('')
		const description = ref('')
		const status = ref('')

		const isDisabled = computed(() => {
			return (title.value.length > 3 && date.value.length > 0 && description.value.length > 3) ? false : true
		})


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

		async function addTask () {
			const response = await axios.post('https://vue-coursework-86815-default-rtdb.firebaseio.com/tasks.json', {
				title: title.value,
				date: date.value,
				description: description.value,
				status: 'active'
			})

			const id = response.data.name

			allTasks.value.push({
				id: id,
				title: title.value,
				date: date.value,
				description: description.value,
				status: 'active'
			})

			title.value = ''
			date.value = ''
			description.value = ''

			router.push('/tasks')
		}

		return {
			allTasks, 
			title, date, description, isDisabled, status,
			addTask, loadTasks
		}
	}
}
</script>
